import type { RegistryItem } from './schema';

export const templates: RegistryItem[] = [
  {
    name: 'home-page',
    type: 'template',
    displayName: 'HomePage',
    description: 'Home page template with AppHeader, ProductPanel, HomePageActionBar, and content list area',
    files: [
      {
        path: 'templates/pages/HomePage.tsx',
        target: 'HomePage.tsx',
        type: 'component',
      },
      {
        path: 'templates/pages/HomePage.css',
        target: 'HomePage.css',
        type: 'style',
      },
    ],
    dependencies: ['app-header', 'product-panel', 'home-page-action-bar', 'button', 'text-input', 'backgrounds'],
    targetPath: 'src/pages',
  },
];
