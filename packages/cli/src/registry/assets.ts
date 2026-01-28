import type { RegistryItem } from './schema';

export const assets: RegistryItem[] = [
  {
    name: 'svg-icons',
    type: 'asset',
    displayName: 'SVG Icons',
    description: 'All SVG icons for the Icon component',
    files: [
      {
        path: 'templates/assets/svg/icons',
        target: 'assets/svg/icons',
        type: 'util',
      },
    ],
  },
  {
    name: 'logos',
    type: 'asset',
    displayName: 'Logos',
    description: 'SVG logos (Airbus logo, etc.)',
    files: [
      {
        path: 'templates/assets/svg/logos',
        target: 'assets/svg/logos',
        type: 'util',
      },
    ],
  },
  {
    name: 'tool-icons',
    type: 'asset',
    displayName: 'Tool Icons',
    description: 'PNG tool icons for light and dark modes',
    files: [
      {
        path: 'templates/assets/png/tool-icons',
        target: 'assets/png/tool-icons',
        type: 'util',
      },
    ],
  },
  {
    name: 'backgrounds',
    type: 'asset',
    displayName: 'Backgrounds',
    description: 'Background images for product panels and banners',
    files: [
      {
        path: 'templates/assets/backgrounds',
        target: 'assets/backgrounds',
        type: 'util',
      },
    ],
  },
  {
    name: 'favicons',
    type: 'asset',
    displayName: 'Favicons',
    description: 'Airbus favicon SVG files (light and dark variants)',
    files: [
      {
        path: 'templates/assets/favicons/favicon.svg',
        target: 'assets/favicons/favicon.svg',
        type: 'util',
      },
      {
        path: 'templates/assets/favicons/favicon-dark.svg',
        target: 'assets/favicons/favicon-dark.svg',
        type: 'util',
      },
    ],
  },
  {
    name: 'all-assets',
    type: 'asset',
    displayName: 'All Assets',
    description: 'All design system assets (icons, logos, backgrounds)',
    files: [
      {
        path: 'templates/assets',
        target: 'assets',
        type: 'util',
      },
    ],
  },
];
