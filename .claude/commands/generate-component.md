---
description: Generate a component from Figma design
allowed-tools:
  [
    Read,
    Write,
    Edit,
    Glob,
    Grep,
    Bash,
    Task,
    TodoWrite,
    AskUserQuestion,
    mcp__figma__get_design_context,
    mcp__figma__get_screenshot,
    mcp__figma__get_metadata,
    mcp__figma__get_variable_defs,
  ]
argument-hint: <figma-url>
---

Generate a design system **component** from the Figma URL: **$ARGUMENTS**

## Your Mission

Create a complete, production-ready component by inspecting the Figma design and following the project's established patterns.

## Workflow

### 1. Inspect Figma
Use MCP tools to extract the complete design:
- `mcp__figma__get_design_context` - Main design specs
- `mcp__figma__get_screenshot` - Visual reference if needed
- `mcp__figma__get_variable_defs` - Design tokens used

Extract: variants, sizes, states, colors, spacing, typography, borders, shadows, icons, transitions.

### 2. Check Dependencies
If the component uses embedded components (Icon, Button, etc.), verify they exist in `/packages/core/src/components/`.

**If missing**: Warn me and ask whether to generate them first, proceed anyway, or cancel.

### 3. Create Component
Follow the patterns documented in `CLAUDE.md` and reference existing components like `Button.tsx`, `Tab.tsx`.

Files to create:
- `/packages/core/src/components/[Name].tsx`
- `/packages/core/src/components/[Name].css`

### 4. Register Component
- Export from `/packages/core/src/index.ts`
- Add CSS to `componentCssFiles` in `/packages/core/tsup.config.ts`
- Add CSS export in `/packages/core/package.json`
- Register in CLI `/packages/cli/src/registry/components.ts`:
  - `name`: kebab-case (e.g., 'text-input')
  - `displayName`: PascalCase (e.g., 'TextInput')
  - `description`: short description
  - `files`: array of `{ path, target, type }` for .tsx and .css
  - `dependencies`: other DS components used (e.g., ['icon'])
  - `externalDependencies`: npm packages if any (e.g., Radix)
  - `cssImports`: token imports needed

### 5. Create Documentation
Follow existing doc pages (e.g., `Button.tsx` in `/apps/docs/src/pages/`):
- `/apps/docs/src/pages/[Name].tsx`
- `/apps/docs/src/pages/[Name].css`
- Add route in `/apps/docs/src/App.tsx`
- Add nav link in `/apps/docs/src/components/Layout.tsx` (alphabetical order)

### 6. Build & Verify
```bash
cd packages/core && pnpm build
cd packages/cli && pnpm sync && pnpm build
cd apps/docs && pnpm dev
```

The CLI sync copies components from `packages/core/src/` to `packages/cli/templates/` for distribution via `asds add <component>`.

## Key Rules

- **Design tokens**: Always use CSS variables with fallbacks (`var(--token, #fallback)`)
- **Disabled state**: Use `cursor: default`, never `cursor: not-allowed`
- **Documentation**: Use design system components (Tab, Button) - no custom styled elements
- **Flexibility**: Adapt to the Figma design - don't force it into a rigid structure

## Feedback

If anything in these instructions is unclear, inconsistent, outdated, or conflicts with the actual codebase patterns, please tell the user so they can update this command.
