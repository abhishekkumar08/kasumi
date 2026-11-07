# Kasumi theming

`@kasumi/ui` provides a light/dark theme context for workspace applications.

## Provider

Wrap the application once at its root:

```jsx
import { ThemeProvider } from "@kasumi/ui";

export function Root() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="moneywise-theme">
      <App />
    </ThemeProvider>
  );
}
```

`defaultTheme` accepts `"light"` or `"dark"`. The selected value is stored in `localStorage`, and the provider applies both `light`/`dark` and `kasumi-theme-light`/`kasumi-theme-dark` classes for compatibility with existing application styles.

## Hook

```jsx
import { useTheme } from "@kasumi/ui";

export function ThemeAction() {
  const { theme, isDark, setTheme, toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>{isDark ? "Light" : "Dark"}</button>;
}
```

The hook returns `theme`, `isDark`, `setTheme`, `toggleTheme`, `material`, `setMaterial`, `palette` and `setPalette`.

## Palettes

A palette is a named colour set over one mode: `ace`, `pastel`, `aurora`, `one-dark-pro`
(`palettes` in `@kasumi/ui/theme`). Picking one sets `data-palette` on `<html>` and fixes the
theme to the palette's mode; `setTheme("light" | "dark")` leaves the palette.

```jsx
<ThemeProvider defaultPalette="ace" storageKey="acelab-theme">
  <App />
</ThemeProvider>

<PaletteChoice label="Theme" includeModes lightLabel="Light" darkLabel="Dark" />
```

The choice is stored under `${storageKey}-palette`. Each palette overrides only the roles it
lists; everything else comes from its mode. In glass, a palette keeps its own text roles
(`glassKeeps`) and glow (`ambient`), and `glassColor` can override roles in glass only.
`scripts/contrast.mjs` gates every palette in both materials, like the base themes.

Fonts are CSS variables with Inter as the fallback: set `--mw-font-sans`, `--mw-font-display`
and `--mw-font-mono` on `:root` to swap them.
