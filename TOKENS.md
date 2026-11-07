# Tokens

Source of truth: `src/theme/tokens.js` (spacing: `src/theme/spacing.js`). The Tailwind
plugin in `tailwind.config.js` turns them into CSS variables on `:root` (light) and
`.dark` (dark), plus utilities. **Components use only these utilities** — no
`slate-*`, no `dark:`. Theme switching is a variable swap.

Live gallery: `/design-system` in the host app (both themes, every component).

## Colour roles

| Utility                                                   | Use                                               |
| --------------------------------------------------------- | ------------------------------------------------- |
| `bg-canvas`                                               | page background                                   |
| `bg-surface`                                              | cards, panels, inputs                             |
| `bg-surface-subtle`                                       | row hover, inset areas                            |
| `bg-surface-muted`                                        | stronger fill: skeletons, secondary buttons       |
| `bg-surface-inverse` / `text-fg-inverse`                  | tooltips, inverted chips                          |
| `bg-scrim/60`                                             | overlay backdrop                                  |
| `text-fg`                                                 | primary text                                      |
| `text-fg-muted`                                           | secondary text (meets 4.5:1)                      |
| `text-fg-subtle`                                          | placeholders, decorative icons — not body text    |
| `border-line` / `-muted` / `-strong`                      | default border / dividers / inputs                |
| `bg-accent`, `hover:bg-accent-hover`, `text-fg-on-accent` | primary action (near-black, white in dark)        |
| `bg-accent-subtle`                                        | selected / active                                 |
| `focus-ring`                                              | visible focus outline for any interactive element |

**Status** — `success`, `warning`, `error`, `info`, each with:
`bg-{tone}-subtle` (tinted background), `text-{tone}-fg` (text on it),
`border-{tone}-line`, `bg-{tone}-emphasis` (solid fill). The numeric ramps
(`success-500`) still exist for code not yet migrated; don't use them in new code.

**Difficulty** — `text-difficulty-easy` / `-medium` / `-hard`: level labels and icons, 4.5:1 on a
card in every material, theme and palette.

**Palettes** — `[data-palette="ace" | "pastel" | "aurora" | "one-dark-pro"]` swaps these roles for
a named set; see `THEMING.md`.

Add `.dark` to any element to force dark tokens inside it (the auth brand panel does this).

## Chart palette

`--mw-chart-1` … `--mw-chart-8`: emerald, sky, amber, rose, violet, teal, orange, slate. 600–700 shades in
light, 400 in dark; each clears 3:1 against a card in both materials (gated by `scripts/contrast.mjs`).
Recharts writes colours into SVG attributes, where `var()` doesn't resolve, so read them through
`useChartTheme()`, which re-reads on theme and material changes.

## Typography

| Utility         | Size / line | Weight |
| --------------- | ----------- | ------ |
| `text-display`  | 36 / 44     | 600    |
| `text-headline` | 28 / 36     | 600    |
| `text-title-lg` | 22 / 28     | 600    |
| `text-title`    | 18 / 26     | 600    |
| `text-body-lg`  | 16 / 24     | 400    |
| `text-body`     | 14 / 20     | 400    |
| `text-label`    | 14 / 20     | 500    |
| `text-caption`  | 12 / 16     | 400    |

## Shape, depth, layering, motion

| Group     | Utilities                                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------------------------- |
| Radius    | `rounded-control` 8 · `rounded-card` 12 · `rounded-overlay` 16 · `rounded-pill`                                     |
| Elevation | `shadow-raised` · `shadow-overlay` · `shadow-modal` · `shadow-control` (glass top highlight)                        |
| Z-index   | `z-dropdown` 20 · `z-sticky` 30 · `z-overlay` 40 · `z-modal` 50 · `z-toast` 60 · `z-skip` 70                        |
| Motion    | `duration-fast` 120ms · `duration-base` 200ms · `duration-slow` 320ms · `ease-standard` · `ease-emphasized`         |
| Glass     | `surface-glass`, `surface-glass-interactive` — always-glass, whatever the material; prefer `<Card variant="glass">` |

**Entrance motion** lives in components, not pages: Card (and StatCard), Table, Alert, EmptyState,
ErrorState, Modal, Popover/Menu, toasts and the mobile drawer use `animate-enter`, a 200ms fade that
settles 4px, once, when they appear. Apps don't add their own entrance animations; spinners are the
only other motion.

`prefers-reduced-motion` collapses all animation and transition durations globally.

## Materials: glass and solid

Every component renders in one of two materials. `ThemeProvider` holds the
choice next to the theme (`material`, `setMaterial`, default `"glass"`, saved
per app as `<storageKey>-material`) and sets `<html class="glass">`.

| Piece                                                                             | Solid           | Glass                                                                       |
| --------------------------------------------------------------------------------- | --------------- | --------------------------------------------------------------------------- |
| `surface`, `-subtle`, `-muted`, `-inverse`, `accent-subtle`, `line`, `line-muted` | opaque          | translucent (channel + `--mw-<role>-alpha`), so `bg-surface/85` still works |
| `material-canvas`                                                                 | flat `canvas`   | canvas + soft ambient glows to see through to (page backgrounds)            |
| `material-overlay`                                                                | `surface`       | 88% tint + strong blur (modals, menus, drawer, toasts, app chrome)          |
| `backdrop-surface`                                                                | none            | light blur (cards, tables)                                                  |
| `backdrop-overlay`                                                                | none            | strong blur (tooltips, sticky headers)                                      |
| shadows                                                                           | as listed above | add a 1px top highlight                                                     |

Text colours, `accent`, emphasis fills and `line-strong` never turn
translucent: their contrast is a requirement. A coloured, mid-tone backdrop
inside a light page (a board, a hero) should scope dark tokens with `class="dark"`.

Contrast is checked two ways, because axe cannot see through translucent or
frosted layers:

- `npm run contrast` composites every text role over the
  layer stacks it is drawn on, worst case, in both materials and themes
  (Kasumi's pre-commit runs it).
- `E2E_PIXEL_CONTRAST=1` on the route matrix hides text, screenshots each route
  and measures the rendered background behind every visible text node
  (`=report` records without failing; `E2E_MATERIAL=solid` runs the other material).

## Spacing

See `SPACING.md`. Semantic: `p-card`, `px-control-x`, `py-control-y`, `gap-stack`,
`px-gutter`, `py-section`, `px-chip-x`.

## Overriding

Every component merges `className` through `cn()` (tailwind-merge, taught our
token names), so a caller's class wins over the default: `<Card className="p-4">`.
