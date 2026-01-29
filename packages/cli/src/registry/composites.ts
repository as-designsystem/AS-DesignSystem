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
      '@/design-system/tokens/radius.css',
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
    name: 'product-banner',
    type: 'composite',
    displayName: 'ProductBanner',
    description: 'Product/tool information banner with dark overlay, icon, title, description, and action links',
    files: [
      {
        path: 'templates/composites/ProductBanner.tsx',
        target: 'composites/ProductBanner.tsx',
        type: 'component',
      },
      {
        path: 'templates/composites/ProductBanner.css',
        target: 'composites/ProductBanner.css',
        type: 'style',
      },
      // Background images
      { path: 'templates/assets/backgrounds/Banner Background.png', target: 'assets/backgrounds/Banner Background.png', type: 'component' },
      { path: 'templates/assets/backgrounds/Demand.png', target: 'assets/backgrounds/Demand.png', type: 'component' },
      { path: 'templates/assets/backgrounds/Economics.png', target: 'assets/backgrounds/Economics.png', type: 'component' },
      { path: 'templates/assets/backgrounds/Maintenance.png', target: 'assets/backgrounds/Maintenance.png', type: 'component' },
      { path: 'templates/assets/backgrounds/Network.png', target: 'assets/backgrounds/Network.png', type: 'component' },
      { path: 'templates/assets/backgrounds/TrajOpt.png', target: 'assets/backgrounds/TrajOpt.png', type: 'component' },
      { path: 'templates/assets/backgrounds/image 2.png', target: 'assets/backgrounds/image 2.png', type: 'component' },
    ],
    dependencies: ['tool-icons', 'icon'],
    cssImports: [
      '@/design-system/tokens/typography.css',
      '@/design-system/tokens/colors.css',
      '@/design-system/tokens/radius.css',
    ],
  },
  {
    name: 'home-page-action-bar',
    type: 'composite',
    displayName: 'HomePageActionBar',
    description: 'Navigation bar with tabs, sort button, search input, and primary action button',
    files: [
      {
        path: 'templates/composites/HomePageActionBar.tsx',
        target: 'composites/HomePageActionBar.tsx',
        type: 'component',
      },
      {
        path: 'templates/composites/HomePageActionBar.css',
        target: 'composites/HomePageActionBar.css',
        type: 'style',
      },
    ],
    dependencies: ['tab', 'button', 'text-input'],
    cssImports: [
      '@/design-system/tokens/typography.css',
      '@/design-system/tokens/colors.css',
    ],
  },
  {
    name: 'left-panel',
    type: 'composite',
    displayName: 'LeftPanel',
    description: 'Full-height side panel with corporate background, header, scrollable content, and optional footer',
    files: [
      {
        path: 'templates/composites/LeftPanel.tsx',
        target: 'composites/LeftPanel.tsx',
        type: 'component',
      },
      {
        path: 'templates/composites/LeftPanel.css',
        target: 'composites/LeftPanel.css',
        type: 'style',
      },
    ],
    dependencies: ['panel-header', 'panel-button'],
    cssImports: [
      '@/design-system/tokens/typography.css',
      '@/design-system/tokens/colors.css',
    ],
  },
  {
    name: 'study-status-bar',
    type: 'composite',
    displayName: 'StudyStatusBar',
    description: 'Horizontal status bar indicating study computation state with colored border, icon, title, and action buttons',
    files: [
      {
        path: 'templates/composites/StudyStatusBar.tsx',
        target: 'composites/StudyStatusBar.tsx',
        type: 'component',
      },
      {
        path: 'templates/composites/StudyStatusBar.css',
        target: 'composites/StudyStatusBar.css',
        type: 'style',
      },
    ],
    dependencies: ['button', 'icon', 'spinner'],
    cssImports: [
      '@/design-system/tokens/typography.css',
      '@/design-system/tokens/colors.css',
    ],
  },
  {
    name: 'accordion',
    type: 'composite',
    displayName: 'Accordion',
    description: 'Collapsible panel with corporate-styled header and expandable content area',
    files: [
      {
        path: 'templates/composites/Accordion.tsx',
        target: 'composites/Accordion.tsx',
        type: 'component',
      },
      {
        path: 'templates/composites/Accordion.css',
        target: 'composites/Accordion.css',
        type: 'style',
      },
    ],
    dependencies: ['icon'],
    cssImports: [
      '@/design-system/tokens/typography.css',
      '@/design-system/tokens/colors.css',
      '@/design-system/tokens/radius.css',
    ],
  },
  {
    name: 'panel-header',
    type: 'composite',
    displayName: 'PanelHeader',
    description: 'Dark corporate panel header with background image, back navigation, study name, and actions',
    files: [
      {
        path: 'templates/composites/PanelHeader.tsx',
        target: 'composites/PanelHeader.tsx',
        type: 'component',
      },
      {
        path: 'templates/composites/PanelHeader.css',
        target: 'composites/PanelHeader.css',
        type: 'style',
      },
    ],
    dependencies: ['button', 'panel-study-name', 'icon-button', 'tooltip'],
    cssImports: [
      '@/design-system/tokens/typography.css',
      '@/design-system/tokens/colors.css',
    ],
  },
  {
    name: 'tool-tile',
    type: 'composite',
    displayName: 'ToolTile',
    description: 'Product/tool card with icon, name, platform badges, and description',
    files: [
      {
        path: 'templates/composites/ToolTile.tsx',
        target: 'composites/ToolTile.tsx',
        type: 'component',
      },
      {
        path: 'templates/composites/ToolTile.css',
        target: 'composites/ToolTile.css',
        type: 'style',
      },
      { path: 'templates/assets/svg/platforms/platform-web.svg', target: 'assets/svg/platforms/platform-web.svg', type: 'component' },
      { path: 'templates/assets/svg/platforms/platform-android.svg', target: 'assets/svg/platforms/platform-android.svg', type: 'component' },
      { path: 'templates/assets/svg/platforms/platform-ios.svg', target: 'assets/svg/platforms/platform-ios.svg', type: 'component' },
      { path: 'templates/assets/svg/platforms/platform-windows.svg', target: 'assets/svg/platforms/platform-windows.svg', type: 'component' },
      { path: 'templates/assets/svg/platforms/platform-skywise.svg', target: 'assets/svg/platforms/platform-skywise.svg', type: 'component' },
    ],
    dependencies: ['tool-icons', 'icon-button'],
    cssImports: [
      '@/design-system/tokens/typography.css',
      '@/design-system/tokens/colors.css',
      '@/design-system/tokens/radius.css',
    ],
  },
  {
    name: 'workspace',
    type: 'composite',
    displayName: 'Workspace',
    description: 'Collapsible workspace card with folder icon, study count, computing state, and user avatars',
    files: [
      {
        path: 'templates/composites/Workspace.tsx',
        target: 'composites/Workspace.tsx',
        type: 'component',
      },
      {
        path: 'templates/composites/Workspace.css',
        target: 'composites/Workspace.css',
        type: 'style',
      },
    ],
    dependencies: ['icon', 'spinner', 'avatar', 'tooltip'],
    cssImports: [
      '@/design-system/tokens/typography.css',
      '@/design-system/tokens/colors.css',
      '@/design-system/tokens/radius.css',
    ],
  },
  {
    name: 'calendar',
    type: 'composite',
    displayName: 'Calendar',
    description: 'Date and month picker with TextInput trigger and calendar dropdown',
    files: [
      {
        path: 'templates/composites/Calendar.tsx',
        target: 'composites/Calendar.tsx',
        type: 'component',
      },
      {
        path: 'templates/composites/Calendar.css',
        target: 'composites/Calendar.css',
        type: 'style',
      },
    ],
    dependencies: ['text-input', 'icon', 'icon-button'],
    externalDependencies: {
      '@radix-ui/react-popover': '^1.1.4',
    },
    cssImports: [
      '@/design-system/tokens/typography.css',
      '@/design-system/tokens/colors.css',
      '@/design-system/tokens/radius.css',
    ],
  },
];
