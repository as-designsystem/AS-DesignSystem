import type { RegistryItem } from './schema';

export const composites: RegistryItem[] = [
  {
    name: 'modal',
    type: 'composite',
    displayName: 'Modal',
    description: 'Dialog component with customizable header, content, and footer',
    files: [
      {
        path: 'templates/composites/Modal.tsx',
        target: 'composites/Modal.tsx',
        type: 'component',
      },
      {
        path: 'templates/composites/Modal.css',
        target: 'composites/Modal.css',
        type: 'style',
      },
    ],
    dependencies: ['icon-button'],
    cssImports: [
      '@/design-system/tokens/typography.css',
      '@/design-system/tokens/colors.css',
    ],
  },
  {
    name: 'app-header',
    type: 'composite',
    displayName: 'AppHeader',
    description: 'Application header with logo, app name, actions, and user selector',
    files: [
      {
        path: 'templates/composites/AppHeader.tsx',
        target: 'composites/AppHeader.tsx',
        type: 'component',
      },
      {
        path: 'templates/composites/AppHeader.css',
        target: 'composites/AppHeader.css',
        type: 'style',
      },
    ],
    dependencies: ['button'],
    cssImports: [
      '@/design-system/tokens/typography.css',
      '@/design-system/tokens/colors.css',
    ],
  },
  {
    name: 'product-panel',
    type: 'composite',
    displayName: 'ProductPanel',
    description: 'Product/tool information banner with dark overlay, icon, title, description, and action links',
    files: [
      {
        path: 'templates/composites/ProductPanel.tsx',
        target: 'composites/ProductPanel.tsx',
        type: 'component',
      },
      {
        path: 'templates/composites/ProductPanel.css',
        target: 'composites/ProductPanel.css',
        type: 'style',
      },
    ],
    dependencies: ['tool-icons', 'icon'],
    cssImports: [
      '@/design-system/tokens/typography.css',
      '@/design-system/tokens/colors.css',
    ],
  },
];
