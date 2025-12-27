#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CORE_SRC = path.resolve(__dirname, '../../core/src');
const CLI_TEMPLATES = path.resolve(__dirname, '../templates');

console.log('🔄 Syncing templates from core...\n');

try {
  // Ensure templates directory exists
  fs.ensureDirSync(CLI_TEMPLATES);

  // Sync components
  console.log('📦 Syncing components...');
  const componentsSource = path.join(CORE_SRC, 'components');
  const componentsTarget = path.join(CLI_TEMPLATES, 'components');

  if (fs.existsSync(componentsSource)) {
    fs.copySync(componentsSource, componentsTarget, { overwrite: true });
    const componentFiles = fs.readdirSync(componentsTarget).filter(f => !f.startsWith('.'));
    console.log(`   ✅ ${componentFiles.length} files synced`);
  } else {
    console.warn('   ⚠️  Components source not found');
  }

  // Sync composites
  console.log('🧩 Syncing composites...');
  const compositesSource = path.join(CORE_SRC, 'composites');
  const compositesTarget = path.join(CLI_TEMPLATES, 'composites');

  if (fs.existsSync(compositesSource)) {
    fs.ensureDirSync(compositesTarget);
    fs.copySync(compositesSource, compositesTarget, { overwrite: true });
    const compositeFiles = fs.readdirSync(compositesTarget).filter(f => !f.startsWith('.'));
    console.log(`   ✅ ${compositeFiles.length} files synced`);
  } else {
    fs.ensureDirSync(compositesTarget);
    console.log('   ℹ️  No composites yet (folder created)');
  }

  // Sync assets
  console.log('🎨 Syncing assets...');
  const assetsSource = path.join(CORE_SRC, 'assets');
  const assetsTarget = path.join(CLI_TEMPLATES, 'assets');

  if (fs.existsSync(assetsSource)) {
    fs.copySync(assetsSource, assetsTarget, { overwrite: true });

    // Count SVG icons
    const svgIconsPath = path.join(assetsTarget, 'svg', 'icons');
    const svgCount = fs.existsSync(svgIconsPath)
      ? fs.readdirSync(svgIconsPath).length
      : 0;

    // Count PNG icons
    const pngIconsPath = path.join(assetsTarget, 'png', 'tool-icons');
    const pngCount = fs.existsSync(pngIconsPath)
      ? fs.readdirSync(pngIconsPath).length
      : 0;

    console.log(`   ✅ ${svgCount} SVG icons + ${pngCount} PNG icons synced`);
  } else {
    console.warn('   ⚠️  Assets source not found');
  }

  // Sync tokens
  console.log('🎯 Syncing tokens...');
  const tokensSource = path.join(CORE_SRC, 'tokens');
  const tokensTarget = path.join(CLI_TEMPLATES, 'tokens');

  if (fs.existsSync(tokensSource)) {
    fs.copySync(tokensSource, tokensTarget, { overwrite: true });
    const tokenFiles = fs.readdirSync(tokensTarget);
    console.log(`   ✅ ${tokenFiles.length} files synced`);
  } else {
    console.warn('   ⚠️  Tokens source not found');
  }

  // Update registry with SVG icons
  console.log('📝 Updating registry...');
  const registryPath = path.resolve(__dirname, '../src/registry/components.ts');
  const svgIconsPath = path.join(CLI_TEMPLATES, 'assets', 'svg', 'icons');

  if (fs.existsSync(svgIconsPath) && fs.existsSync(registryPath)) {
    const svgFiles = fs.readdirSync(svgIconsPath)
      .filter(f => f.endsWith('.svg'))
      .sort();

    // Generate SVG icon entries
    const svgEntries = svgFiles.map(file =>
      `      { path: 'templates/assets/svg/icons/${file}', target: 'assets/svg/icons/${file}', type: 'component' },`
    ).join('\n');

    // Read current registry
    let registryContent = fs.readFileSync(registryPath, 'utf-8');

    // Replace SVG section (between comment and first non-SVG line)
    const svgSectionRegex = /(\/\/ SVG icon assets \(\d+ icons\)\n)([\s\S]*?)(    \],\n    cssImports: \[\],\n  \},)/;
    const newSection = `// SVG icon assets (${svgFiles.length} icons)\n${svgEntries}\n`;

    registryContent = registryContent.replace(svgSectionRegex, `${newSection}$3`);

    fs.writeFileSync(registryPath, registryContent, 'utf-8');
    console.log(`   ✅ Registry updated with ${svgFiles.length} SVG icons`);
  } else {
    console.warn('   ⚠️  Could not update registry');
  }

  console.log('\n✨ Templates synced successfully!\n');

  // Show summary
  console.log('📊 Summary:');
  console.log(`   Source: ${CORE_SRC}`);
  console.log(`   Target: ${CLI_TEMPLATES}`);

} catch (error) {
  console.error('❌ Error syncing templates:', error.message);
  process.exit(1);
}
