import { Command } from 'commander';
import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import { createRequire } from 'module';
import { logger } from '../utils/logger';
import { loadConfig, getResolvedPaths } from '../utils/config';
import { resolveDependencies, getRegistryItem, getAllRegistryItems } from '../utils/registry';
import type { RegistryItem, RegistryFile } from '../registry/schema';

const require = createRequire(import.meta.url);
const packageJson = require('../../package.json');

/**
 * Check if a newer version of the CLI is available on the registry
 */
async function checkForUpdate(): Promise<string | null> {
  try {
    const latest = execSync(
      'npm view @as-designsystem/cli version --registry=https://npm.pkg.github.com 2>/dev/null',
      { encoding: 'utf-8', timeout: 5000 }
    ).trim();
    if (latest && latest !== packageJson.version) {
      return latest;
    }
  } catch {
    // Silently ignore — network errors shouldn't block the command
  }
  return null;
}

/**
 * Detect package manager used in the project
 */
function detectPackageManager(cwd: string): 'npm' | 'yarn' | 'pnpm' | 'bun' {
  if (fs.existsSync(path.join(cwd, 'bun.lockb'))) return 'bun';
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  return 'npm';
}

/**
 * Install npm packages using the detected package manager
 */
async function installPackages(
  packages: Record<string, string>,
  cwd: string
): Promise<boolean> {
  const pm = detectPackageManager(cwd);
  const packageList = Object.entries(packages)
    .map(([name, version]) => `${name}@${version}`)
    .join(' ');

  const commands: Record<string, string> = {
    npm: `npm install ${packageList}`,
    yarn: `yarn add ${packageList}`,
    pnpm: `pnpm add ${packageList}`,
    bun: `bun add ${packageList}`,
  };

  const command = commands[pm];

  try {
    execSync(command, { cwd, stdio: 'inherit' });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Rewrite imports in file content
 */
function rewriteImports(content: string, config: any, filePath?: string): string {
  let rewritten = content;

  // Rewrite @as-designsystem/core → @/design-system/components
  rewritten = rewritten.replace(
    /@as-designsystem\/core/g,
    config.aliases.components.replace('/components', '')
  );

  // Rewrite @as-designsystem/icons → @/design-system/icons
  rewritten = rewritten.replace(
    /@as-designsystem\/icons/g,
    config.aliases.icons
  );

  // Rewrite @as-designsystem/tokens → @/design-system/tokens
  rewritten = rewritten.replace(
    /@as-designsystem\/tokens/g,
    config.aliases.tokens
  );

  // Rewrite @/design-system/* imports to use configured aliases
  // This is used by templates that reference components/composites
  rewritten = rewritten.replace(
    /@\/design-system\/composites/g,
    config.aliases.composites
  );

  rewritten = rewritten.replace(
    /@\/design-system\/components/g,
    config.aliases.components
  );

  rewritten = rewritten.replace(
    /@\/design-system\/tokens/g,
    config.aliases.tokens
  );

  rewritten = rewritten.replace(
    /@\/design-system\/icons/g,
    config.aliases.icons
  );

  // Rewrite @/design-system/assets to use designSystem alias + /assets
  rewritten = rewritten.replace(
    /@\/design-system\/assets/g,
    config.aliases.designSystem + '/assets'
  );

  return rewritten;
}

/**
 * Recursively copy a directory
 */
async function copyDirectory(sourcePath: string, targetPath: string): Promise<number> {
  await fs.ensureDir(targetPath);

  const entries = await fs.readdir(sourcePath, { withFileTypes: true });
  let count = 0;

  for (const entry of entries) {
    const srcPath = path.join(sourcePath, entry.name);
    const destPath = path.join(targetPath, entry.name);

    if (entry.isDirectory()) {
      count += await copyDirectory(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
      count++;
    }
  }

  return count;
}

/**
 * Copy file from source to target with import rewriting
 */
async function copyFile(
  file: RegistryFile,
  config: any,
  cwd: string,
  customTargetPath?: string
): Promise<number> {
  const sourcePath = path.resolve(__dirname, '..', file.path);
  const basePath = customTargetPath || config.designSystemPath;
  const targetPath = path.join(cwd, basePath, file.target);

  // Check if source is a directory (for assets)
  const stat = await fs.stat(sourcePath);
  if (stat.isDirectory()) {
    return await copyDirectory(sourcePath, targetPath);
  }

  await fs.ensureDir(path.dirname(targetPath));

  const isBinary = /\.(png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/i.test(file.path);

  if (isBinary) {
    await fs.copyFile(sourcePath, targetPath);
  } else {
    const content = await fs.readFile(sourcePath, 'utf-8');
    const rewritten = rewriteImports(content, config, file.target);
    await fs.writeFile(targetPath, rewritten, 'utf-8');
  }

  return 1;
}

/**
 * Detect installed components by checking existing files
 */
async function detectInstalledComponents(
  config: any,
  cwd: string
): Promise<string[]> {
  const allItems = getAllRegistryItems();
  const installed: string[] = [];

  for (const item of allItems) {
    // Skip templates — they are user-modified starting points
    if (item.type === 'template') continue;

    // For assets, check if the target directory/file exists
    if (item.type === 'asset') {
      const assetFile = item.files[0];
      if (assetFile) {
        const targetPath = path.join(cwd, config.designSystemPath, assetFile.target);
        if (await fs.pathExists(targetPath)) {
          installed.push(item.name);
        }
      }
      continue;
    }

    // Check if the main component file exists (TSX for components, CSS for tokens)
    const mainFile = item.files.find(f =>
      (f.type === 'component' && f.target.endsWith('.tsx')) ||
      (item.type === 'token' && f.type === 'style' && f.target.endsWith('.css'))
    );
    if (mainFile) {
      // Templates use their own targetPath, everything else uses designSystemPath
      const basePath = item.type === 'template'
        ? (item.targetPath || config.templates?.targetPath || 'src/pages')
        : config.designSystemPath;
      const targetPath = path.join(cwd, basePath, mainFile.target);
      if (await fs.pathExists(targetPath)) {
        installed.push(item.name);
      }
    }
  }

  return installed;
}

export const update = new Command()
  .name('update')
  .description('Update installed components to their latest versions')
  .argument('[components...]', 'Components to update (updates all installed if none specified)')
  .option('-y, --yes', 'Skip confirmation prompt')
  .action(async (componentNames: string[], options) => {
    const cwd = process.cwd();

    // Check for newer CLI version
    const latestVersion = await checkForUpdate();
    if (latestVersion) {
      logger.warn(`A newer version of the CLI is available: v${packageJson.version} → v${latestVersion}`);
      logger.info(`Components will only be updated if the CLI itself is up to date.`);
      logger.break();

      const { shouldUpgrade } = await prompts({
        type: 'confirm',
        name: 'shouldUpgrade',
        message: `Run update with the latest CLI (v${latestVersion})?`,
        initial: true,
      });

      if (shouldUpgrade) {
        const args = componentNames.length > 0 ? componentNames.join(' ') : '';
        const yesFlag = options.yes ? ' -y' : '';
        const command = `npx @as-designsystem/cli@${latestVersion} update ${args}${yesFlag}`.trim();
        logger.info(`Running: ${command}`);
        logger.break();
        try {
          execSync(command, { cwd, stdio: 'inherit' });
        } catch {
          process.exit(1);
        }
        return;
      }

      logger.info('Continuing with current version...');
      logger.break();
    }

    // Load config
    const config = await loadConfig(cwd);
    if (!config) {
      logger.error('No configuration found. Run "asds init" first.');
      process.exit(1);
    }

    // If no components specified, detect installed ones
    let toUpdate: string[] = componentNames;

    if (toUpdate.length === 0) {
      logger.info('Detecting installed components...');
      toUpdate = await detectInstalledComponents(config, cwd);

      if (toUpdate.length === 0) {
        logger.warn('No installed components found.');
        return;
      }

      logger.info(`Found ${toUpdate.length} installed component(s):`);
      for (const name of toUpdate) {
        const item = getRegistryItem(name);
        logger.info(`  - ${item?.displayName || name}`);
      }
      logger.break();
    }

    // Resolve all dependencies
    const toInstall: RegistryItem[] = [];
    const seen = new Set<string>();

    for (const name of toUpdate) {
      try {
        const resolved = resolveDependencies(name);
        for (const item of resolved) {
          if (!seen.has(item.name)) {
            toInstall.push(item);
            seen.add(item.name);
          }
        }
      } catch (error: any) {
        logger.error(error.message);
        process.exit(1);
      }
    }

    if (toInstall.length === 0) {
      logger.warn('Nothing to update.');
      return;
    }

    // Show what will be updated
    logger.info(`Will update ${toInstall.length} item(s):`);
    for (const item of toInstall) {
      logger.info(`  - ${item.displayName || item.name} (${item.type})`);
    }
    logger.break();

    // Confirm update
    if (!options.yes) {
      const { shouldUpdate } = await prompts({
        type: 'confirm',
        name: 'shouldUpdate',
        message: 'This will overwrite existing files. Continue?',
        initial: true,
      });

      if (!shouldUpdate) {
        logger.info('Update cancelled.');
        return;
      }
    }

    // Update files
    const spinner = logger.spinner('Updating files...');

    try {
      let filesCopied = 0;

      const shouldCopyFile = (file: RegistryFile) => {
        if (config.typescript) return true;
        if (file.path.endsWith('.d.ts')) return true;
        if (file.path.endsWith('.tsx')) return true;
        return !file.path.endsWith('.ts');
      };

      for (const item of toInstall) {
        // Templates use their own targetPath
        const customTargetPath = item.type === 'template'
          ? (item.targetPath || config.templates?.targetPath || 'src/pages')
          : undefined;

        for (const file of item.files) {
          if (!shouldCopyFile(file)) continue;
          const copied = await copyFile(file, config, cwd, customTargetPath);
          filesCopied += copied;
        }
      }

      spinner.succeed(`Updated ${filesCopied} file(s)`);

      // Collect external dependencies from updated items
      const allExternalDeps: Record<string, string> = {};
      for (const item of toInstall) {
        if (item.externalDependencies) {
          Object.assign(allExternalDeps, item.externalDependencies);
        }
      }

      // Install external dependencies if any
      if (Object.keys(allExternalDeps).length > 0) {
        logger.break();
        logger.info('The following npm packages are required:');
        for (const [pkg, version] of Object.entries(allExternalDeps)) {
          logger.info(`  - ${pkg}@${version}`);
        }
        logger.break();

        const { shouldInstall } = await prompts({
          type: 'confirm',
          name: 'shouldInstall',
          message: 'Install these dependencies now?',
          initial: true,
        });

        if (shouldInstall) {
          const depSpinner = logger.spinner('Installing dependencies...');
          const success = await installPackages(allExternalDeps, cwd);
          if (success) {
            depSpinner.succeed('Dependencies installed');
          } else {
            depSpinner.fail('Failed to install dependencies');
            logger.warn('You may need to install them manually:');
            const pm = detectPackageManager(cwd);
            const pkgList = Object.entries(allExternalDeps)
              .map(([name, version]) => `${name}@${version}`)
              .join(' ');
            logger.info(`  ${pm} ${pm === 'yarn' ? 'add' : 'install'} ${pkgList}`);
          }
        } else {
          logger.warn('Skipping dependency installation. Install them manually:');
          const pm = detectPackageManager(cwd);
          const pkgList = Object.entries(allExternalDeps)
            .map(([name, version]) => `${name}@${version}`)
            .join(' ');
          logger.info(`  ${pm} ${pm === 'yarn' ? 'add' : 'install'} ${pkgList}`);
        }
      }

      logger.break();
      logger.success('Update complete!');
    } catch (error: any) {
      spinner.fail('Failed to update files');
      logger.error(error.message);
      process.exit(1);
    }
  });
