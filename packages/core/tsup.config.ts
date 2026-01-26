import { defineConfig } from 'tsup';
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { readdirSync, statSync } from 'fs';

function copyDir(src: string, dest: string) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }
  const entries = readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  loader: {
    '.png': 'copy',
    '.jpg': 'copy',
    '.jpeg': 'copy',
    '.svg': 'copy',
  },
  onSuccess: () => {
    // Copy component CSS files to dist
    const componentCssFiles = ['Icon.css', 'Button.css', 'ButtonGroup.css', 'IconButton.css', 'Tab.css', 'ToolIcons.css', 'Select.css', 'VSelect.css', 'Checkbox.css', 'VCheckbox.css', 'Toggle.css', 'VToggle.css', 'TextInput.css', 'NumberInput.css', 'Tooltip.css', 'PanelStudyName.css', 'PanelButton.css'];
    componentCssFiles.forEach((file) => {
      const srcCss = join(process.cwd(), 'src', 'components', file);
      const distCss = join(process.cwd(), 'dist', file);
      if (existsSync(srcCss)) {
        copyFileSync(srcCss, distCss);
      }
    });

    // Copy composite CSS files to dist
    const compositeCssFiles = ['Modal.css', 'AppHeader.css', 'ProductBanner.css', 'HomePageActionBar.css', 'PanelHeader.css', 'LeftPanel.css'];
    compositeCssFiles.forEach((file) => {
      const srcCss = join(process.cwd(), 'src', 'composites', file);
      const distCss = join(process.cwd(), 'dist', file);
      if (existsSync(srcCss)) {
        copyFileSync(srcCss, distCss);
      }
    });

    // Copy token CSS files to dist
    const tokenCssFiles = ['colors.css', 'typography.css', 'radius.css'];
    tokenCssFiles.forEach((file) => {
      const srcCss = join(process.cwd(), 'src', 'tokens', file);
      const distCss = join(process.cwd(), 'dist', file);
      if (existsSync(srcCss)) {
        copyFileSync(srcCss, distCss);
      }
    });

    // Copy assets directory to dist
    const srcAssets = join(process.cwd(), 'src', 'assets');
    const distAssets = join(process.cwd(), 'dist', 'assets');
    if (existsSync(srcAssets)) {
      copyDir(srcAssets, distAssets);
    }
  },
});

