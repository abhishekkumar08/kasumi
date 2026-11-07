import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import plugin from "tailwindcss/plugin";
import { semanticSpacing } from "./src/theme/spacing.js";
import {
  chart,
  color,
  elevation,
  fontFamily,
  material,
  motion,
  palettes,
  radius,
  resolvePalette,
  translucentRoles,
  typography,
  zIndex,
} from "./src/theme/tokens.js";

const channel = (name) => `rgb(var(--mw-${name}) / <alpha-value>)`;
// The material alpha multiplies into Tailwind's, so `bg-surface/85` is 85%
// of whatever the active material allows (100% solid, 60% light glass).
const translucent = (name, alphaVar = `--mw-${name}-alpha`) =>
  `rgb(var(--mw-${name}) / calc(<alpha-value> * var(${alphaVar})))`;

function materialVars(kind, mode) {
  const m = material[kind][mode];
  const vars = {};
  for (const [k, v] of Object.entries(m.channels ?? {})) vars[`--mw-${k}`] = v;
  for (const [k, v] of Object.entries(m.alpha)) vars[`--mw-${k}-alpha`] = v;
  for (const [k, v] of Object.entries(m.shadow ?? {}))
    vars[`--mw-shadow-${k}`] = v;
  vars["--mw-status-subtle-alpha"] = m["status-subtle-alpha"];
  vars["--mw-ambient"] = m.ambient;
  vars["--mw-overlay-bg"] = m.overlay;
  vars["--mw-surface-filter"] = m["surface-filter"];
  vars["--mw-overlay-filter"] = m["overlay-filter"];
  vars["--mw-sheen"] = m.sheen ?? "none";
  for (const [k, v] of Object.entries(m.glass)) vars[`--mw-glass-${k}`] = v;
  return vars;
}

function colorVars({ mode, roles, status, series }) {
  const vars = {};
  for (const [k, v] of Object.entries(roles)) vars[`--mw-${k}`] = v;
  for (const [tone, parts] of Object.entries(status))
    for (const [k, v] of Object.entries(parts)) vars[`--mw-${tone}-${k}`] = v;
  for (const [k, v] of Object.entries(elevation[mode]))
    vars[`--mw-shadow-${k}`] = v;
  series.forEach((v, i) => (vars[`--mw-chart-${i + 1}`] = v));
  return vars;
}

function themeVars(mode) {
  const status = Object.fromEntries(
    Object.entries(color.status).map(([tone, modes]) => [tone, modes[mode]])
  );
  const vars = colorVars({
    mode,
    roles: color[mode],
    status,
    series: chart[mode],
  });
  // Re-declared under .dark, not just :root: a custom property holding var()
  // resolves where it is declared, so a :root-only --mw-overlay-bg would
  // carry the light surface into a dark-scoped element.
  return { ...vars, ...materialVars("solid", mode) };
}

// A palette: its mode's variables with the palette's colours on top, solid
// first; in glass, the glass material on top of that, keeping the palette's
// own text colours and its own glow.
function paletteBlocks(id) {
  const p = resolvePalette(id);
  const solid = {
    ...colorVars({
      mode: p.mode,
      roles: p.color,
      status: p.status,
      series: p.chart,
    }),
    ...materialVars("solid", p.mode),
    colorScheme: p.mode,
  };
  const glassVars = materialVars("glass", p.mode);
  for (const role of p.keeps) glassVars[`--mw-${role}`] = p.color[role];
  for (const [role, v] of Object.entries(p.glassColor))
    glassVars[`--mw-${role}`] = v;
  if (p.ambient) glassVars["--mw-ambient"] = p.ambient;
  const sel = `[data-palette="${id}"]`;
  return [
    [sel, solid],
    [`.glass${sel}, .glass ${sel}`, glassVars],
  ];
}

const roleColors = Object.fromEntries(
  Object.keys(color.light).map((k) => [
    k,
    translucentRoles.includes(k) ? translucent(k) : channel(k),
  ])
);

const statusRole = (tone) => ({
  subtle: translucent(`${tone}-subtle`, "--mw-status-subtle-alpha"),
  fg: channel(`${tone}-fg`),
  line: channel(`${tone}-line`),
  emphasis: channel(`${tone}-emphasis`),
});

const backdrop = (value) => ({
  backdropFilter: value,
  WebkitBackdropFilter: value,
});

const tokensPlugin = plugin(({ addBase, addComponents, addUtilities }) => {
  addBase({
    // color-scheme tells the browser to draw native controls, scrollbars and
    // pickers for the active theme — without it they stay light in dark mode.
    ":root": { ...themeVars("light"), colorScheme: "light" },
    ".dark": { ...themeVars("dark"), colorScheme: "dark" },
    ".glass": materialVars("glass", "light"),
    ".glass.dark, .glass .dark": materialVars("glass", "dark"),
    // After light, dark and the materials, so a palette wins at equal specificity.
    ...Object.fromEntries(Object.keys(palettes).flatMap(paletteBlocks)),
    // ::backdrop sits outside the document tree, so older engines don't let it
    // inherit the custom properties; the scrim value is written in directly.
    "dialog::backdrop": { backgroundColor: `rgb(${color.light.scrim} / 0.6)` },
    ".dark dialog::backdrop": {
      backgroundColor: `rgb(${color.dark.scrim} / 0.7)`,
    },
    ".glass dialog::backdrop": backdrop(material.glass.light["scrim-filter"]),
    body: {
      backgroundColor: "rgb(var(--mw-canvas))",
      backgroundImage: "var(--mw-ambient)",
      backgroundAttachment: "fixed",
      color: "rgb(var(--mw-fg))",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
    "h1, h2, h3, h4, h5, h6": { letterSpacing: "-0.02em" },
    "@media (prefers-reduced-motion: reduce)": {
      "*, *::before, *::after": {
        animationDuration: "0.01ms !important",
        animationIterationCount: "1 !important",
        // 0s, not the common 0.01ms: CSS's initial transition-property is
        // `all`, so a non-zero duration here gave every element a colour
        // transition — and a node styled before the stylesheet arrived
        // could stay stuck on the browser's default black.
        transitionDuration: "0s !important",
        scrollBehavior: "auto !important",
      },
    },
  });
  // Components layer, so any utility on the same element still wins.
  addComponents({
    ".material-canvas": {
      backgroundColor: "rgb(var(--mw-canvas))",
      backgroundImage: "var(--mw-ambient)",
      backgroundAttachment: "fixed",
    },
    ".material-overlay": {
      backgroundColor: "var(--mw-overlay-bg)",
      backgroundImage: "var(--mw-sheen)",
      ...backdrop("var(--mw-overlay-filter)"),
    },
    // A blurred ancestor becomes the backdrop root, so a menu opened inside
    // glass gets no blur and the rows under it show through its tint.
    // Nested, the overlay is its own colour made opaque instead.
    ":is(.surface-glass, .backdrop-surface, .material-overlay) .material-overlay":
      { backgroundColor: "rgb(from var(--mw-overlay-bg) r g b / 1)" },
  });
  addUtilities({
    ".backdrop-surface": backdrop("var(--mw-surface-filter)"),
    ".sheen": { backgroundImage: "var(--mw-sheen)" },
    ".backdrop-overlay": backdrop("var(--mw-overlay-filter)"),
    ".focus-ring:focus-visible": {
      outline: "2px solid rgb(var(--mw-focus))",
      outlineOffset: "2px",
    },
    ".focus-ring:focus:not(:focus-visible)": { outline: "none" },
    ".surface-glass": {
      backgroundColor: "var(--mw-glass-bg)",
      backgroundImage: "var(--mw-sheen)",
      border: "1px solid var(--mw-glass-border)",
      boxShadow: "var(--mw-glass-shadow)",
      backdropFilter: "blur(18px) saturate(140%)",
      "-webkit-backdrop-filter": "blur(18px) saturate(140%)",
    },
    ".surface-glass-interactive": {
      transition: `background-color ${motion.duration.fast} ${motion.easing.standard}, border-color ${motion.duration.fast} ${motion.easing.standard}, box-shadow ${motion.duration.fast} ${motion.easing.standard}, transform ${motion.duration.fast} ${motion.easing.standard}`,
      // Only where a pointer hovers: on touch the lift would stick after a tap. Nested inside the class
      // because Tailwind v4 (AceLab) rejects an at-rule as a top-level utility key; v3 accepts both.
      "@media (hover: hover) and (pointer: fine)": {
        "&:hover": {
          backgroundColor: "var(--mw-glass-bg-hover)",
          borderColor: "var(--mw-glass-border-hover)",
          boxShadow: "var(--mw-glass-shadow-hover)",
          transform: "translateY(-2px)",
        },
      },
    },
  });
});

// Add to an app's `content` so Tailwind sees the classes Kasumi components
// use. fileURLToPath, not new URL(): URL percent-encodes the glob braces.
export const kasumiContent = [
  join(dirname(fileURLToPath(import.meta.url)), "src/**/*.{js,jsx}"),
];

export const sharedTailwindConfig = {
  darkMode: "class",
  // Theme and material classes are added at runtime; Tailwind drops base rules
  // whose class never appears in scanned content.
  safelist: ["dark", "glass"],
  theme: {
    extend: {
      fontFamily,
      spacing: semanticSpacing,
      fontSize: Object.fromEntries(
        Object.entries(typography).map(
          ([k, [size, lineHeight, fontWeight, letterSpacing]]) => [
            k,
            [size, { lineHeight, fontWeight, letterSpacing }],
          ]
        )
      ),
      borderRadius: radius,
      zIndex,
      transitionDuration: motion.duration,
      transitionTimingFunction: motion.easing,
      colors: {
        ...roleColors,
        success: statusRole("success"),
        warning: statusRole("warning"),
        error: statusRole("error"),
        info: statusRole("info"),
      },
      boxShadow: {
        raised: "var(--mw-shadow-raised)",
        overlay: "var(--mw-shadow-overlay)",
        modal: "var(--mw-shadow-modal)",
        control: "var(--mw-shadow-control)",
      },
      // One motion for the whole system: a surface fades in and settles 4px
      // as it appears. Pages don't animate; components do, once, on mount.
      // prefers-reduced-motion collapses it (base layer above).
      animation: {
        // `backwards`, not `both`: once it ends it must let go of transform,
        // or it would pin interactive cards against their hover lift.
        enter: `enter ${motion.duration.base} ${motion.easing.standard} backwards`,
        // A sheet slides in from the edge it is docked to.
        "sheet-up": `sheet-up 300ms cubic-bezier(0.32, 0.72, 0, 1) backwards`,
        "sheet-left": `sheet-left 300ms cubic-bezier(0.32, 0.72, 0, 1) backwards`,
      },
      keyframes: {
        enter: {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "none" },
        },
        "sheet-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "none" },
        },
        "sheet-left": {
          from: { transform: "translateX(100%)" },
          to: { transform: "none" },
        },
      },
    },
  },
  plugins: [tokensPlugin],
};
