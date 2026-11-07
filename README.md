# Kasumi

`@kasumi/ui` — a glass-first React design system (霞, *kasumi*: mist). Semantic tokens, a Tailwind plugin,
two materials (glass and solid) in light and dark, accessible components, Storybook. Local only: not
published, no remote.

## Use it in an app

```bash
npm install ../kasumi            # a file: link — edits here show up in the app immediately
```

```js
// vite.config.js — one React, and permission to serve the linked folder
import { kasumi } from "@kasumi/ui/vite";
export default defineConfig({ plugins: [react(), kasumi()] });

// tailwind.config.js — the tokens, and the component classes to scan
import { kasumiContent, sharedTailwindConfig } from "@kasumi/ui/tailwind-config";
export default { ...sharedTailwindConfig, content: ["./src/**/*.{js,jsx}", ...kasumiContent] };

// main.jsx — the typeface, then the components
import "@kasumi/ui/font";
import { Button, Card, ThemeProvider } from "@kasumi/ui";
```

Lint guard for apps: spread `designSystemGuard` from `@kasumi/ui/eslint` into the app's flat config.

## Work on it

```bash
npm install
npm run storybook        # http://localhost:6006 — theme + material toolbar, Docs pages
npm run check            # lint, types, worst-case contrast gate, cn() check (also the pre-commit hook)
npm run build-storybook  # static Storybook in storybook-static/
```

| Doc                         | What                                                                                                            |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `TOKENS.md`                 | colour roles, type, radius, elevation, z-index, motion                                                          |
| `SPACING.md`                | the 4/8 spacing scale                                                                                           |
| `THEMING.md`                | `ThemeProvider`, `useTheme`                                                                                     |
| `/design-system` (host app) | live gallery of everything below, both themes                                                                   |
| Storybook                   | `npm run storybook` → http://localhost:6006; theme + material toolbar, Docs pages with props |

## Components

| Group      | Components |
| ---------- | ---------- |
| Actions    | `Button` (`xs` 32px … `lg`), `IconButton` (`pressed` toggle), `Chip` (filter, count, link), `InlineConfirm` |
| Forms      | `FormField`, `Input` / `Select` / `Textarea` (`leading` / `trailing`, `fieldSize` 32/40px), `Checkbox`, `Radio`, `RadioGroup`, `Switch`, `DateRange`, `DateRangeSelect` (presets + custom, `dateRangeBounds`), `FileDropzone`, `Fieldset`, `ChoiceGrid` (emoji / colour pickers) |
| Surfaces   | `Card` (+ parts; `variant="glass"`, `interactive`, `selected`, `tone`), `PageHeader` (inline or sticky, `back`), `SectionHeader`, `List` / `ListRow`, `DescriptionList` |
| Data       | `Table` (+ parts; `TableCell description`), `Stat`, `StatCard` (`tint`), `Amount`, `Progress` (`steps`, `color`), `Badge` (`size="count"`), `Avatar` (icon, emoji, colour, `xl`) |
| Charts     | `useChartTheme()` (series, grid, axis, cursor colours for recharts), `ChartTooltip`, `ChartLegendLabel` |
| Navigation | `Accordion`, `Tabs` (`variant="underline"`), `SegmentedControl`, `Pagination`, `LoadMore`, `Menu` (link items), `Disclosure`, `Breadcrumb`, `BackLink`, `TableOfContents`, `TopNav`, `AppLayout`, `Sidebar`, `BottomBar`, `MobileTopBar`, `AppSwitcher`, `UserMenu` |
| Overlays   | `Modal`, `CommandPalette`, `Popover`, `Tooltip`, `NotificationProvider` / `useNotifications` (toasts, confirm, prompt) |
| Feedback   | `Alert` (banner or `inline`; `neutral` note tone), `LoadingState`, `EmptyState` (`size`, `titleAs`, node icon), `ErrorState`, `Spinner`, `Skeleton`, `Loading*`, `ErrorBoundary`, `SupportChatbot` |
| Reading    | `Prose`, `TextLink`, `CodeBlock` (language, line numbers, copy; `text-code-*` syntax roles), `Code`, `Kbd`, `Figure` |
| Auth       | `AuthShell`, `CredentialsForm`, `AlreadySignedIn`, `ThemeChoice` |
| Helpers    | `cn`, `COMPONENT_COPY`, `SUPPORT_COPY` |

Rules every component follows: tokens only, `className` overridable via `cn()`, keyboard-operable,
visible `focus-ring`, works in light and dark and in both materials, user-visible strings in `src/constants/`.

## Guardrails

In Kasumi:

- **Pre-commit** (`.githooks/pre-commit`): `npm run check` — lint, type-check, the worst-case contrast
  gate (`scripts/contrast.mjs --strict`: every text role over every layer stack it is drawn on, both
  materials and themes, chart palette at 3:1) and the `cn()` check.

In apps that use it (the MoneyWise suite):

- **Lint:** spread `designSystemGuard` from `@kasumi/ui/eslint`; a raw `<button>`, `<input>` (file
  inputs included), `<select>`, `<textarea>`, `<table>`, `<dialog>` or `<details>` fails lint and names
  the component to use. Hidden inputs, spread-only inputs and `designSystem/` galleries are exempt.
- **Adoption:** the suite's `scripts/ds-adoption.mjs --min 90` counts DS vs hand-built primitives.
- **Rendered contrast:** the suite's route matrix with `E2E_PIXEL_CONTRAST=1` measures the painted
  background behind every text node (axe can't see through glass).
