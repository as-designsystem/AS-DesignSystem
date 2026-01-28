---
description: Generate a composite (complex container component) from Figma design
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

Generate a design system **composite** from the Figma URL: **$ARGUMENTS**

## What is a Composite?

Composites are complex, container-like components that combine multiple atomic components. Examples: Modal, Card, FilterPanel, Sidebar, Drawer.

They typically have:

- Content slots (header, body, footer, etc.)
- State management (open/close, expanded/collapsed)
- Keyboard interactions (Escape to close, focus trapping)
- Accessibility requirements (ARIA attributes, roles)

## Workflow

### 1. Inspect Figma

Use Local Figma MCP tools to understand the full structure:

- `mcp__figma__get_design_context` - Main design specs
- `mcp__figma__get_metadata` - Full node hierarchy
- `mcp__figma__get_screenshot` - Visual reference
- `mcp__figma__get_variable_defs` - Design tokens used

Pay attention to: container structure, content areas/slots, overlay/backdrop, embedded components, states (open/closed).

### 2. Check Dependencies

Composites typically use MANY components. Verify ALL exist in `/packages/core/src/components/`:

- Button (for actions)
- Icon (for close, expand icons)
- Any other visible components

**If missing**: List all missing dependencies and ask whether to generate them first, proceed anyway, or cancel.

### 3. Create Composite

Follow patterns in `CLAUDE.md` and reference existing composites like `Modal.tsx`, `AppHeader.tsx`.

Files to create:

- `/packages/core/src/composites/[Name].tsx`
- `/packages/core/src/composites/[Name].css`

Consider:

- Flexible content slots (children, header, footer props)
- Open/close state management
- Keyboard handling (Escape key)
- Proper ARIA attributes
- Backdrop/overlay if needed
- Animations for open/close

### 4. Register Composite

- Export from `/packages/core/src/index.ts`
- Add CSS to `componentCssFiles` in `/packages/core/tsup.config.ts`
- Add CSS export in `/packages/core/package.json`
- Register in CLI `/packages/cli/src/registry/composites.ts`:
  - `name`: kebab-case (e.g., 'filter-panel')
  - `displayName`: PascalCase (e.g., 'FilterPanel')
  - `description`: short description
  - `files`: array with paths like `templates/composites/[Name].tsx` and `templates/composites/[Name].css`
  - `dependencies`: other DS components used (e.g., ['icon', 'button'])
  - `externalDependencies`: npm packages if any (e.g., Radix)
  - `cssImports`: token imports needed

### 5. Create Documentation

Follow existing doc pages pattern:

- `/apps/docs/src/pages/[Name].tsx`
- `/apps/docs/src/pages/[Name].css`
- Add route in `/apps/docs/src/App.tsx`
- Add nav link in `/apps/docs/src/components/Layout.tsx`

Include interactive examples showing open/close states.

### 6. Build & Verify

```bash
cd packages/core && pnpm build
cd packages/cli && pnpm sync && pnpm build
cd apps/docs && pnpm dev
```

The CLI sync copies components from `packages/core/src/` to `packages/cli/templates/` for distribution via `asds add <composite>`.

## Key Rules

- **Design tokens**: Always use CSS variables with fallbacks
- **Accessibility**: Include proper ARIA roles, labels, and keyboard navigation
- **Disabled state**: Use `cursor: default`, never `cursor: not-allowed`
- **Documentation**: Use design system components (Tab, Button)
- **Flexibility**: Adapt to the Figma design - composites vary widely

## Feedback

If anything in these instructions is unclear, inconsistent, outdated, or conflicts with the actual codebase patterns, please tell the user so they can update this command.
