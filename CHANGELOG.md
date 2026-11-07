# Changelog

## Unreleased

- `Slider` takes `variant="media"` (compact player bar: thin track, thumb on hover/focus, label as the
  accessible name), `onCommit` (fires on release) and `valueText`. The default field slider is unchanged.
- New: `Slider` (labelled range with a shown value, `format`) and `ColorSwatches` (swatch radio group,
  "transparent" swatch, optional native custom colour).
- `Popover` and `Menu` take `side="top"` (open above the trigger); `Menu` takes controlled `open` / `onOpenChange`.
- `Menu` items take `shortcut` (keys shown at the row end) and `checked` (a `menuitemcheckbox` with a tick).
- Phones: `StatCard` values scale to the card (13px–headline), `DonutGraph` sizes to the room left by
  its legend, `SegmentedControl` options share the width and wrap, `Amount` captions wrap narrower.
- New: `useMediaQuery(query)` — render one layout per screen size instead of hiding the other.
- New: `BarGraph` (columns or ranked rows, series, value labels, whole-row `onSelect`) and
  `DonutGraph` (share labels, clickable slices and legend). `recharts` is now a peer dependency.
- Lighter in Next.js apps: stateful modules are marked `"use client"` (server components can import
  the package), `sideEffects` lists only the font, and `cn()` no longer pulls in every colour token
  (`typography` has its own module).

- `SelectMenu` `label` / `hint` (the same field label as Input and Select); with no `size` it takes
  their form height, so it lines up beside them.
- `Amount` `caption`: a muted line under the figure (the amount in words, say).
- `Popover` (and so `Menu`, `SelectMenu`, `DateRangeSelect`) opens from the other edge of its trigger
  when the preferred side would run off the viewport.
- New: `SelectMenu`, a styled single-choice dropdown (search once the list is long, keyboard,
  `onCreate` for a "Create …" option; with it the search
  box always shows, labelled "Search or add new…"). `Select` draws its own chevron instead of the OS one.
- Overlays nested in glass (a menu inside a glass card or a modal) are opaque: a blurred ancestor
  disables their blur, so rows behind showed through.
- `formatClock` (and `Timer`) show `h:mm:ss` from an hour up. `Badge` passes extra props (title, data-*); `LevelCard` `titleAs`; `Calendar` caps at max-w-md.
- `PageHeader` titles use the `font-display` family (the sans face unless an app sets
  `--mw-font-display`). `PaletteChoice` takes `value` / `onChange` to run off an app's own store.
- `TopNav` `collapseBelow` ("md" | "lg" | "xl") and `fluid`; its folded menu keeps group headings.
- `Menu` items take `group` (labelled sections); link items pass only `href` or `to`, never both.
- `Popover` / `Menu` panels cap to the viewport and scroll.
- `CommandPalette` `search(query)` for the app's own ranking, `footer`, and per-command `tag` / `meta`;
  the empty message waits for a query when `search` is given.
- New for practice apps: `SplitView` (draggable divider; a switch on phones), `Calendar` (day
  statuses), `TextSizeControl`, `QuizOption` / `QuizQuestion`, `FileTree` (inline add/rename),
  `AchievementBadge`, `LevelCard`, `VoteBox`, `Timer` (+ `formatClock`), `TestResultList`,
  `EditorShell`. Stories under Practice.
- Palettes: `ace`, `pastel`, `aurora`, `one-dark-pro` over light/dark, via `ThemeProvider`
  `defaultPalette`, `useTheme().palette/setPalette` and the new `PaletteChoice`; contrast-gated in
  both materials. Storybook has a Palette toolbar.
- Tokens: `difficulty-easy/medium/hard` roles; `font-display` family; font families read
  `--mw-font-sans/display/mono` first.
- New: `Accordion` (single-open sections, real button headers, arrow keys between them).
- Fields take a `warning` (amber, described, not `aria-invalid`) — values OCR couldn't read.
- `Modal` caps to the viewport and scrolls its body, so footer actions stay on screen.
- `PageHeader` `eyebrow`, `size="display"`, `align="center"`; `SectionHeader` `align`;
  `CardDescription` `as`; `TopNav` `label`, shrinkable brand, no empty mobile menu; `BottomBar`
  is a named landmark ("<app> navigation"); `ListRow` puts `data-*` on its `<li>`; `Tabs` and
  `PageHeader` actions shrink inside flex rows instead of widening the page; `Avatar` initials
  split on `-_@.` too.
- New for the Kasumi-only expense app: `DateRangeSelect` (+ `dateRangeBounds`, `resolveDateRange`,
  `formatDateRange`), `LoadingState`, `Amount`, `Fieldset`, `ChoiceGrid`, `DescriptionList`,
  `TextLink`.
- `PageHeader` is inline by default (`variant="sticky"` for the old band) and takes `back`.
- Extended: Card `tone` / StatCard `tint`, Avatar `icon`/`emoji`/`tone`/`color`/`xl`, EmptyState
  `size`/`titleAs`/node icon, CardTitle and SectionHeader `icon`, Disclosure `leading`, Chip
  `onRemove`, IconButton `loading`, Progress `color`, ChartLegendLabel `color`, TableCell
  `description`.
- New: `Chip`, `Breadcrumb`, `BackLink`, `SectionHeader`, `List` / `ListRow`, `CommandPalette`,
  `InlineConfirm`, `CodeBlock`, `Code`, `Kbd`, `Prose`, `Figure`, `TableOfContents`, `LoadMore`,
  `TopNav` — the generic parts of the Lab app's UI, so Kasumi is its only source of components.
- Updated: Button/IconButton `xs` (32px); IconButton `pressed`; Input/Select `fieldSize`; Card
  `selected`; Tabs `variant="underline"`; Progress `steps`; Badge `size="count"`; Alert `inline`
  variant, `neutral` tone and `icon`; Menu items can be links.
- Tokens: `font-mono` (system monospace) and six `code-*` syntax roles, contrast-gated on a code
  block in every material and theme.
- Motion: one `animate-enter` (fade + 4px settle, 200ms, standard easing) on Card, Table, Alert,
  Empty/ErrorState, Modal, Popover, toasts and the mobile drawer. Removed the decorative
  `liquid-morph` and `fade-in-up` animations.
- Dark glass is frostier, after Apple's materials: 10% white surfaces, brighter rims, a top sheen,
  frosted-grey floating layers, vibrant secondary text. Light and solid unchanged.
- Fix: `Card variant="glass"` is a plain solid card in the solid material. It used to keep the
  glass tint, so glass cards nested in glass cards went grey in solid dark.

## 1.0.0 — Kasumi

- Moved out of the MoneyWise monorepo (`packages/ui`, history kept) into its own repo, renamed
  `@mw/ui` → `@kasumi/ui`. Installed by apps from a local folder (`file:`); not published.
- New entry points: `@kasumi/ui/vite` (dedupe React, allow the linked folder), `@kasumi/ui/font`,
  `kasumiContent` from `@kasumi/ui/tailwind-config`.
- The contrast gate moved here (`npm run contrast`); `npm run check` is the pre-commit hook.


## Unreleased

- Lighter in Next.js apps: stateful modules are marked `"use client"` (server components can import
  the package), `sideEffects` lists only the font, and `cn()` no longer pulls in every colour token
  (`typography` has its own module).

- Marked `@mw/ui` as an internal workspace package.
- Removed stale publishing configuration, examples, and documentation for deleted components.
- Kept the application shell, theme, feedback components, maintained primitives, and named `SupportChatbot` export.
- Added real lint, typecheck, and library-build verification.
