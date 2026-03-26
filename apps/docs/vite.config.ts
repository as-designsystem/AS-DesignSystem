import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { readFileSync } from 'fs';

const cliPkg = JSON.parse(readFileSync(path.resolve(__dirname, '../../packages/cli/package.json'), 'utf-8'));

export default defineConfig({
  define: {
    __DS_VERSION__: JSON.stringify(cliPkg.version),
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    fs: {
      allow: ['..'],
    },
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],
});

