import type { RegistryItem } from './schema';

export const templates: RegistryItem[] = [
  {
    name: 'home-page',
    type: 'template',
    displayName: 'HomePage',
    description: 'Home page template with AppHeader, ProductBanner, HomePageActionBar, and content list area',
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
    dependencies: ['app-header', 'product-banner', 'home-page-action-bar', 'button', 'icon-button', 'text-input'],
    targetPath: 'src/pages',
  },
  {
    name: 'landing-page',
    type: 'template',
    displayName: 'LandingPage',
    description: 'Landing page template with hero section, tool catalog with chip filters, contact form, and footer',
    files: [
      {
        path: 'templates/pages/LandingPage.tsx',
        target: 'LandingPage.tsx',
        type: 'component',
      },
      {
        path: 'templates/pages/LandingPage.css',
        target: 'LandingPage.css',
        type: 'style',
      },
    ],
    dependencies: ['app-header', 'tool-tile', 'chip', 'button', 'icon-button', 'tool-icons'],
    targetPath: 'src/pages',
  },
];
