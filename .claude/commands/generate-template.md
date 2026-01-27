---
description: Generate a page template from Figma design
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

Generate a design system **page template** from the Figma URL: **$ARGUMENTS**

## What is a Template?

Templates are complete page layouts that users can install and customize. Unlike components/composites which live in the design system folder, templates are installed directly into the user's pages folder (e.g., `src/pages/`).

Examples: HomePage, DashboardPage, SettingsPage, LoginPage.

Templates typically:

- Combine multiple composites (AppHeader, Sidebar, Modal, etc.)
- Include page-level layout and structure
- Provide a starting point that users customize for their needs
- Are NOT part of `@as-design-system/core` - they're CLI-only

## Workflow

### 1. Inspect Figma

Use Local MCP tools to understand the full page structure:

- `mcp__figma__get_design_context` - Main design specs
- `mcp__figma__get_metadata` - Full node hierarchy (useful for complex pages)
- `mcp__figma__get_screenshot` - Visual reference
- `mcp__figma__get_variable_defs` - Design tokens used

Pay attention to: page sections, composites used, layout structure, responsive behavior, content areas.

### 2. Check Dependencies

Templates rely heavily on existing components and composites. Verify ALL exist:

**Components** in `/packages/core/src/components/`:

- Button, Icon, TextInput, etc.

**Composites** in `/packages/core/src/composites/`:

- AppHeader, Modal, ProductBanner, etc.

**If missing**: List all missing dependencies and ask whether to generate them first, proceed anyway, or cancel.

### 3. Create Template

Templates go directly in the CLI templates folder (NOT in core):

Files to create:

- `/packages/cli/templates/pages/[Name].tsx`
- `/packages/cli/templates/pages/[Name].css`

**Important considerations:**

- Import components using `@/design-system/` alias (this is what users will have)
- Include all necessary CSS imports at the top
- Add helpful comments explaining customization points
- Use realistic placeholder content
- Handle dark mode if applicable

**Example import pattern:**

```tsx
import { AppHeader, Button, TextInput } from '@/design-system/components';
import { Modal } from '@/design-system/composites';
import '@/design-system/components/Button.css';
// ... other imports
import './[Name].css';
```

### 4. Register Template

Register in `/packages/cli/src/registry/templates.ts`:

```typescript
{
  name: 'my-page',              // kebab-case, used in CLI: asds add my-page
  type: 'template',
  displayName: 'MyPage',        // PascalCase
  description: 'Description of what this template provides',
  files: [
    {
      path: 'templates/pages/MyPage.tsx',
      target: 'MyPage.tsx',      // Just filename, targetPath handles the folder
      type: 'component',
    },
    {
      path: 'templates/pages/MyPage.css',
      target: 'MyPage.css',
      type: 'style',
    },
  ],
  dependencies: ['app-header', 'button', 'text-input'],  // All DS dependencies
  targetPath: 'src/pages',      // Default install location (user can override)
}
```

**Note:** `dependencies` should list ALL components and composites used. The CLI will auto-install them when the user runs `asds add my-page`.

### 5. Create Documentation Preview

Templates need a preview in the docs app. This is different from component docs - it shows the template in action.

Files to create:

- `/apps/docs/src/pages/[Name]Template.tsx` - Preview wrapper
- `/apps/docs/src/pages/[Name]Template.css` - Preview-specific styles (if needed)

Add route in `/apps/docs/src/App.tsx`:

```tsx
<Route path="/templates/my-page" element={<MyPageTemplate />} />
```

Add nav link in `/apps/docs/src/components/Layout.tsx` under "Templates" section.

### 6. Build & Verify

```bash
cd packages/cli && pnpm build
cd apps/docs && pnpm dev
```

Test the template:

1. Check the preview in docs app
2. Test installation: `asds add my-page` in a test project
3. Verify all dependencies are installed
4. Verify the template path prompt works (if not already configured)

## Key Rules

- **Templates are CLI-only**: They don't go in `packages/core`
- **Design tokens**: Use CSS variables with fallbacks
- **Imports**: Use `@/design-system/` alias - that's what users will have
- **Dependencies**: List ALL components/composites used - CLI auto-installs them
- **Customization**: Add comments to help users understand what to modify
- **Realistic content**: Use placeholder content that makes sense

## Template vs Component/Composite

| Aspect             | Component/Composite      | Template                        |
| ------------------ | ------------------------ | ------------------------------- |
| Location           | `packages/core/src/`     | `packages/cli/templates/pages/` |
| Exported from core | Yes                      | No                              |
| User imports from  | `@as-design-system/core` | Local file                      |
| Purpose            | Reusable UI element      | Starting point for a page       |
| User modifies      | Rarely                   | Always                          |

## Feedback

If anything in these instructions is unclear, inconsistent, outdated, or conflicts with the actual codebase patterns, please tell the user so they can update this command.
