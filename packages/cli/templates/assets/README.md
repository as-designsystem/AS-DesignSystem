# Auto-generated assets

> ⚠️ **DO NOT EDIT FILES IN THIS DIRECTORY**

All assets here (SVG icons, PNG icons, backgrounds, favicons) are **automatically copied** from `packages/core/src/assets/` by the `sync-templates.js` script every time the CLI is built.

Any modification made directly inside `packages/cli/templates/assets/` will be **overwritten** the next time someone runs `pnpm build` (or `pnpm sync`) in `packages/cli`.

## Source of truth

Edit assets in:

```
packages/core/src/assets/
├── svg/icons/        ← SVG icons (Material Icons classic Filled variant)
├── png/tool-icons/   ← PNG tool icons
└── backgrounds/      ← Background images
```

## Workflow for adding/modifying an icon

1. Add or edit the SVG file in `packages/core/src/assets/svg/icons/`
2. Run `pnpm generate-icons` in `packages/core` to update `Icon.tsx` imports/iconMap/availableIcons
3. Run `pnpm build` in `packages/core` to rebuild the design system
4. Run `pnpm build` in `packages/cli` to sync templates and publish

## Icon style guideline

Use the **Material Icons classic (Filled) variant** when available — viewBox `0 0 24 24` with direct path coordinates (no `transform="scale(0.025)"`).

For icons that don't exist in the Material Icons classic library (e.g. `airline_ticket`, `tile_*`), keep the existing SVG as-is.
