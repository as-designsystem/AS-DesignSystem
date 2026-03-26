# AS Design System

A React Design System with components, composites, tokens, and icons generated from Figma.

## Project Structure

```
as-design-system/
├── packages/
│   ├── core/              # React components, composites, tokens, icons
│   └── cli/               # CLI for component installation
├── apps/
│   └── docs/              # Documentation app
└── Monorepo configuration
```

## Packages

### `@as-designsystem/core`

Main package containing:

- **Components**: Button, ButtonGroup, Checkbox, VCheckbox, Icon, IconButton, Select, VSelect, Tab, TextInput, Toggle, VToggle, Tooltip, ToolIcon
- **Composites**: AppHeader, HomePageActionBar, Modal, ProductBanner
- **Design tokens**: Colors, typography
- **51 SVG icons**: AS icons + Material Icons

### `@as-designsystem/cli`

CLI to quickly install components in your project.

```bash
# Initialize design system in your project
asds init

# List all available items
asds list

# Add components
asds add button icon text-input

# Add composites
asds add modal app-header

# Add page templates
asds add home-page

# Add assets
asds add svg-icons
asds add all-assets
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### Development

```bash
# Run documentation app in dev mode
cd apps/docs
pnpm dev

# Build core package
cd packages/core
pnpm build

# Build CLI (syncs templates automatically)
cd packages/cli
pnpm build

# TypeScript check
pnpm type-check
```

## Documentation

The documentation app is available via `pnpm dev` and allows you to:

- View all components with interactive examples
- Explore tokens (colors, typography)
- Browse the 51 available icons
- See usage examples with code

## Adding New Icons

```bash
# 1. Add your SVG files in:
packages/core/src/assets/svg/icons/

# 2. Generate imports automatically:
cd packages/core
pnpm generate-icons

# 3. Rebuild the package:
pnpm build
```

Icons will automatically appear in the documentation!

## Installation (utilisateurs)

### 1. Configurer l'accès (une seule fois)

```bash
npm config set @as-designsystem:registry https://npm.pkg.github.com && npm config set //npm.pkg.github.com/:_authToken VOTRE_TOKEN
```

> Le token est fourni par l'administrateur du design system.

### 2. Utiliser le CLI

```bash
cd your-react-project
npx @as-designsystem/cli init
asds add button icon text-input modal
asds list
```

## Using the CLI (développement local)

### In a New Project

```bash
# Build the design system
cd AS-DesignSystem
pnpm install
pnpm build

# Link the CLI globally
cd packages/cli
pnpm link --global

# Now use it in your project
cd /path/to/your-project
asds init
asds add button icon text-input modal
```

### What Gets Installed

- **Components**: Source files (.tsx + .css) copied to your design system folder
- **Tokens**: CSS variables for colors and typography
- **Assets**: SVG icons, logos, backgrounds
- **Templates**: Complete page layouts as starting points

## Technologies

- **TypeScript**: Static typing
- **React 18**: UI framework
- **Vite**: Build tool & dev server
- **CSS Variables**: Styling with design tokens
- **pnpm workspaces**: Monorepo
- **tsup**: Fast TypeScript builds
- **Figma MCP**: Component extraction from Figma

## More Information

For technical details and development conventions, see [CLAUDE.md](./CLAUDE.md).
