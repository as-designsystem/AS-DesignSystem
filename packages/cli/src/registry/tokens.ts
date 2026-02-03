import type { RegistryItem } from './schema';

export const tokens: RegistryItem[] = [
  {
    name: 'colors',
    type: 'token',
    displayName: 'Colors',
    description: 'Color tokens including primitives and semantic colors',
    files: [
      {
        path: 'templates/tokens/colors.ts',
        target: 'tokens/colors.ts',
        type: 'component',
      },
      {
        path: 'templates/tokens/colors.css',
        target: 'tokens/colors.css',
        type: 'style',
      },
    ],
    cssImports: ['@/design-system/tokens/colors.css'],
  },
  {
    name: 'typography',
    type: 'token',
    displayName: 'Typography',
    description: 'Typography tokens including fonts, sizes, and text styles',
    files: [
      {
        path: 'templates/tokens/typography.ts',
        target: 'tokens/typography.ts',
        type: 'component',
      },
      {
        path: 'templates/tokens/typography.css',
        target: 'tokens/typography.css',
        type: 'style',
      },
    ],
    cssImports: ['@/design-system/tokens/typography.css'],
  },
  {
    name: 'radius',
    type: 'token',
    displayName: 'Radius',
    description: 'Border radius tokens',
    files: [
      {
        path: 'templates/tokens/radius.ts',
        target: 'tokens/radius.ts',
        type: 'component',
      },
      {
        path: 'templates/tokens/radius.css',
        target: 'tokens/radius.css',
        type: 'style',
      },
    ],
    cssImports: ['@/design-system/tokens/radius.css'],
  },
  {
    name: 'sizes',
    type: 'token',
    displayName: 'Sizes',
    description: 'Component height scale tokens (2XS through XL)',
    files: [
      {
        path: 'templates/tokens/sizes.ts',
        target: 'tokens/sizes.ts',
        type: 'component',
      },
      {
        path: 'templates/tokens/sizes.css',
        target: 'tokens/sizes.css',
        type: 'style',
      },
    ],
    cssImports: ['@/design-system/tokens/sizes.css'],
  },
];
