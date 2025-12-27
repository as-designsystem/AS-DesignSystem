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
];
