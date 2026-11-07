/**
 * Design tokens — the single source of truth for every visual decision.
 *
 * Two layers, the way Primer, Polaris and Carbon are built:
 *   1. `color.light` / `color.dark` hold semantic roles ("surface", "fg-muted"),
 *      never raw palette names. Components use only these.
 *   2. The Tailwind plugin in `tailwind.config.js` emits them as CSS variables on
 *      `:root` and `.dark`, so switching theme swaps values — no component ever
 *      writes `dark:`.
 *
 * Colours are stored as space-separated RGB channels so Tailwind's opacity
 * modifier still works (`bg-scrim/60`). Values that need their own alpha
 * (glass, shadows) are stored whole.
 */

const roles = {
  canvas: "page background",
  surface: "cards, panels, inputs",
  "surface-subtle": "row hover, inset areas",
  "surface-muted": "stronger fill: skeletons, secondary buttons",
  "surface-inverse": "tooltips, inverted chips",
  scrim: "modal backdrop (use with opacity)",
  fg: "primary text",
  "fg-muted": "secondary text — 4.5:1 or better on every surface",
  "fg-subtle": "placeholders, decorative icons — not for body text",
  "fg-inverse": "text on surface-inverse",
  "fg-on-accent": "text on accent",
  line: "default border",
  "line-muted": "dividers inside a surface",
  "line-strong": "input borders, emphasis",
  accent: "primary action fill",
  "accent-hover": "primary action hover",
  "accent-subtle": "selected / active background",
  "accent-fg": "accent-coloured text and icons",
  focus: "focus ring",
  "code-keyword": "code syntax: keywords",
  "code-string": "code syntax: strings",
  "code-number": "code syntax: numbers, constants",
  "code-comment": "code syntax: comments",
  "code-function": "code syntax: function names",
  "code-type": "code syntax: types, tags",
  "difficulty-easy": "easy level: text and icons",
  "difficulty-medium": "medium level: text and icons",
  "difficulty-hard": "hard level: text and icons",
};

const status = (light, dark) => ({ light, dark });

// subtle = tinted background, fg = text on it, line = border, emphasis = solid
// fill. Emphasis carries white text in both themes, so every tone clears 4.5:1
// against white (emerald/sky/amber-700, rose-600).
const statusColors = {
  success: status(
    {
      subtle: "236 253 245",
      fg: "6 95 70",
      line: "167 243 208",
      emphasis: "4 120 87",
    },
    {
      subtle: "10 31 39",
      fg: "110 231 183",
      line: "11 51 51",
      emphasis: "4 120 87",
    }
  ),
  warning: status(
    {
      subtle: "255 251 235",
      fg: "146 64 14",
      line: "253 230 138",
      emphasis: "180 83 9",
    },
    {
      subtle: "37 24 26",
      fg: "252 211 77",
      line: "68 38 29",
      emphasis: "180 83 9",
    }
  ),
  error: status(
    {
      subtle: "255 241 242",
      fg: "190 18 60",
      line: "254 205 211",
      emphasis: "225 29 72",
    },
    {
      subtle: "39 16 35",
      fg: "253 164 175",
      line: "76 21 49",
      emphasis: "225 29 72",
    }
  ),
  info: status(
    {
      subtle: "240 249 255",
      fg: "3 105 161",
      line: "186 230 253",
      emphasis: "3 105 161",
    },
    {
      subtle: "12 33 54",
      fg: "125 211 252",
      line: "14 49 76",
      emphasis: "3 105 161",
    }
  ),
};

export const color = {
  roles,
  light: {
    canvas: "248 250 252",
    surface: "255 255 255",
    "surface-subtle": "248 250 252",
    "surface-muted": "241 245 249",
    "surface-inverse": "2 6 23",
    scrim: "2 6 23",
    fg: "2 6 23",
    // slate-600: ~7:1 on white, so muted text still clears 4.5:1 on tinted
    // and glass surfaces (slate-500 only cleared it on pure white).
    "fg-muted": "71 85 105",
    "fg-subtle": "148 163 184",
    "fg-inverse": "255 255 255",
    "fg-on-accent": "255 255 255",
    line: "226 232 240",
    "line-muted": "241 245 249",
    "line-strong": "203 213 225",
    accent: "2 6 23",
    "accent-hover": "30 41 59",
    "accent-subtle": "241 245 249",
    "accent-fg": "2 6 23",
    focus: "2 132 199",
    // Code syntax: 700-800 shades, each 4.5:1 on a code block in a glass card.
    "code-keyword": "126 34 206",
    "code-string": "6 95 70",
    "code-number": "146 64 14",
    "code-comment": "71 85 105",
    "code-function": "3 105 161",
    "code-type": "190 18 60",
    // 700 shades: 4.5:1 as text on a card in either material.
    "difficulty-easy": "4 120 87",
    "difficulty-medium": "146 64 14",
    "difficulty-hard": "190 18 60",
  },
  dark: {
    canvas: "2 6 23",
    surface: "15 23 42",
    "surface-subtle": "23 32 51",
    "surface-muted": "30 41 59",
    "surface-inverse": "248 250 252",
    scrim: "0 0 0",
    fg: "255 255 255",
    "fg-muted": "148 163 184",
    "fg-subtle": "100 116 139",
    "fg-inverse": "2 6 23",
    "fg-on-accent": "2 6 23",
    line: "30 41 59",
    "line-muted": "23 32 51",
    "line-strong": "51 65 85",
    accent: "255 255 255",
    "accent-hover": "226 232 240",
    "accent-subtle": "30 41 59",
    "accent-fg": "255 255 255",
    focus: "56 189 248",
    "code-keyword": "196 181 253",
    "code-string": "110 231 183",
    "code-number": "252 211 77",
    "code-comment": "176 188 206",
    "code-function": "125 211 252",
    "code-type": "253 164 175",
    "difficulty-easy": "52 211 153",
    "difficulty-medium": "251 191 36",
    "difficulty-hard": "253 164 175",
  },
  status: statusColors,
};

// Inter for headings too: a geometric brand face reads as marketing, a
// document face reads as a financial product. Apps load the files with
// `import "@fontsource-variable/inter"`, which registers "Inter Variable".
// Each family reads a custom property first, so an app can bring its own typeface
// (set --mw-font-sans on :root) without forking the tokens. Unset, it is Inter.
// `display` is for page titles and heroes; it falls back to the sans face.
export const fontFamily = {
  sans: ['var(--mw-font-sans, "Inter Variable")', "ui-sans-serif", "system-ui", "sans-serif"],
  display: ['var(--mw-font-display, var(--mw-font-sans, "Inter Variable"))', "ui-sans-serif", "system-ui", "sans-serif"],
  // The platform's own monospace: code needs no font download.
  mono: ["var(--mw-font-mono, ui-monospace)", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
};

// [font-size, line-height, weight, tracking]
export { typography } from "./typography.js";

// Chart series, in order. Each clears 3:1 against its theme's surface (WCAG
// 1.4.11 for graphical objects): 600 shades on white, 400 shades on slate.
export const chart = {
  light: [
    "5 150 105",
    "2 132 199",
    // amber-700, not 600: 600 fell to 2.8:1 on glass over a warm backdrop.
    "180 83 9",
    "225 29 72",
    "124 58 237",
    "13 148 136",
    "234 88 12",
    "100 116 139",
  ],
  dark: [
    "52 211 153",
    "56 189 248",
    "251 191 36",
    "251 113 133",
    "167 139 250",
    "45 212 191",
    "251 146 60",
    "148 163 184",
  ],
};

export const radius = {
  control: "0.5rem",
  card: "0.75rem",
  overlay: "1rem",
  pill: "9999px",
};

export const elevation = {
  light: {
    raised: "0 1px 2px rgb(15 23 42 / 0.06), 0 1px 3px rgb(15 23 42 / 0.08)",
    overlay: "0 8px 24px rgb(15 23 42 / 0.12)",
    modal: "0 24px 48px rgb(15 23 42 / 0.18)",
    control: "none",
  },
  dark: {
    raised: "0 1px 2px rgb(0 0 0 / 0.4)",
    overlay: "0 8px 24px rgb(0 0 0 / 0.5)",
    modal: "0 24px 48px rgb(0 0 0 / 0.6)",
    control: "none",
  },
};

export const zIndex = {
  dropdown: "20",
  sticky: "30",
  overlay: "40",
  modal: "50",
  toast: "60",
  skip: "70",
};

export const motion = {
  duration: { fast: "120ms", base: "200ms", slow: "320ms" },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    emphasized: "cubic-bezier(0.3, 0, 0, 1)",
  },
};

// The suite's glass look, kept as an opt-in surface (`<Card variant="glass">`).
export const glass = {
  light: {
    bg: "rgb(255 255 255 / 0.78)",
    "bg-hover": "rgb(255 255 255 / 0.88)",
    border: "rgb(148 163 184 / 0.2)",
    "border-hover": "rgb(125 211 252 / 0.38)",
    shadow: "0 12px 30px rgb(15 23 42 / 0.08)",
    "shadow-hover": "0 16px 36px rgb(15 23 42 / 0.1)",
  },
  dark: {
    bg: "rgb(255 255 255 / 0.1)",
    "bg-hover": "rgb(255 255 255 / 0.14)",
    border: "rgb(255 255 255 / 0.18)",
    "border-hover": "rgb(255 255 255 / 0.26)",
    shadow:
      "inset 0 1px 0 rgb(255 255 255 / 0.16), 0 8px 32px rgb(0 0 0 / 0.4)",
    "shadow-hover":
      "inset 0 1px 0 rgb(255 255 255 / 0.2), 0 12px 40px rgb(0 0 0 / 0.5)",
  },
};

// Roles that turn translucent in the glass material. Each is emitted as a
// channel plus `--mw-<role>-alpha`, so `bg-surface/85` still multiplies in.
// Text, accent, emphasis fills and `line-strong` (input borders) never do:
// their contrast is a requirement, not a look.
export const translucentRoles = [
  "surface",
  "surface-subtle",
  "surface-muted",
  "surface-inverse",
  "accent-subtle",
  "line",
  "line-muted",
];

// Two materials for every component. `solid` is opaque. `glass` makes the
// roles above translucent over a tinted canvas (`material-canvas`), gives
// shadows a top highlight, and frosts what floats over moving content
// (`backdrop-surface`, `backdrop-overlay`). <html class="glass"> picks glass.
const solidMaterial = {
  alpha: Object.fromEntries(translucentRoles.map((r) => [r, "1"])),
  "status-subtle-alpha": "1",
  ambient: "none",
  overlay: "rgb(var(--mw-surface))",
  "surface-filter": "none",
  "overlay-filter": "none",
  // A glass card in the solid material is a solid card: without this the
  // glass tint leaked into solid, and nested glass cards stacked into grey.
  glass: {
    bg: "rgb(var(--mw-surface))",
    "bg-hover": "rgb(var(--mw-surface-subtle))",
    border: "rgb(var(--mw-line))",
    "border-hover": "rgb(var(--mw-line-strong))",
    shadow: "var(--mw-shadow-raised)",
    "shadow-hover": "var(--mw-shadow-overlay)",
  },
};

const glassFilters = {
  "surface-filter": "blur(16px) saturate(160%)",
  "overlay-filter": "blur(24px) saturate(180%)",
  "scrim-filter": "blur(4px)",
};

export const material = {
  solid: { light: solidMaterial, dark: solidMaterial },
  glass: {
    light: {
      // Tinted fills read on white glass only as a dark wash, not as a
      // lighter white, so these roles switch hue as well as alpha.
      channels: {
        "surface-subtle": "15 23 42",
        "surface-muted": "15 23 42",
        "accent-subtle": "15 23 42",
        line: "15 23 42",
        "line-muted": "15 23 42",
      },
      alpha: {
        surface: "0.6",
        "surface-subtle": "0.04",
        "surface-muted": "0.07",
        "surface-inverse": "0.86",
        "accent-subtle": "0.08",
        line: "0.12",
        "line-muted": "0.07",
      },
      "status-subtle-alpha": "0.72",
      ambient:
        "radial-gradient(48rem 36rem at 0% 0%, rgb(16 185 129 / 0.14), transparent 70%), radial-gradient(44rem 36rem at 100% 0%, rgb(14 165 233 / 0.14), transparent 70%), radial-gradient(48rem 40rem at 60% 100%, rgb(245 158 11 / 0.08), transparent 70%)",
      // 88%: the lowest that keeps muted and status text at 4.5:1 even with
      // pure black behind (scripts/glass-contrast.mjs, stress table).
      overlay: "rgb(255 255 255 / 0.88)",
      ...glassFilters,
      glass: glass.light,
      shadow: {
        raised:
          "inset 0 1px 0 rgb(255 255 255 / 0.7), 0 1px 2px rgb(15 23 42 / 0.05), 0 8px 24px rgb(15 23 42 / 0.06)",
        overlay:
          "inset 0 1px 0 rgb(255 255 255 / 0.7), 0 12px 32px rgb(15 23 42 / 0.12)",
        modal:
          "inset 0 1px 0 rgb(255 255 255 / 0.7), 0 24px 56px rgb(15 23 42 / 0.2)",
        control:
          "inset 0 1px 0 rgb(255 255 255 / 0.6), 0 1px 2px rgb(15 23 42 / 0.05)",
      },
    },
    dark: {
      channels: {
        surface: "255 255 255",
        "surface-subtle": "255 255 255",
        "surface-muted": "255 255 255",
        "accent-subtle": "255 255 255",
        line: "255 255 255",
        "line-muted": "255 255 255",
        // Apple's "vibrant" labels: text on a frosted material is brighter
        // than on a solid one, which is what lets the glass itself be lighter.
        "fg-muted": "203 213 225",
        "fg-subtle": "148 163 184",
      },
      // A visible white frost, like Apple's dark regular material. White
      // layers add up (a badge in a table in a card stacks three), so these
      // are paired with the vibrant fg-muted above; contrast.mjs gates both.
      alpha: {
        surface: "0.1",
        "surface-subtle": "0.06",
        "surface-muted": "0.12",
        "surface-inverse": "0.88",
        "accent-subtle": "0.16",
        line: "0.18",
        "line-muted": "0.1",
      },
      "status-subtle-alpha": "0.8",
      // Kept at 0.12 or under: at 0.16 a decorative blob stacked on the
      // emerald glow took muted text on /apps to 4.5:1 exactly.
      ambient:
        "radial-gradient(48rem 36rem at 0% 0%, rgb(16 185 129 / 0.12), transparent 70%), radial-gradient(44rem 36rem at 100% 0%, rgb(14 165 233 / 0.1), transparent 70%), radial-gradient(48rem 40rem at 60% 100%, rgb(99 102 241 / 0.08), transparent 70%)",
      // Frosted grey rather than navy: Apple's thick material for text-heavy
      // floating surfaces (sidebars, menus, alerts). The lightest grey that
      // keeps toast and muted text at 4.5:1 with pure white behind it.
      overlay: "rgb(44 50 64 / 0.9)",
      // Cards frost by tint and sheen only. The luminosity lift (Apple's
      // regular material) is for floating layers: on cards it compounded
      // through nested surfaces (a table in a card) into a grey slab.
      "surface-filter": "blur(20px) saturate(180%)",
      "overlay-filter": "blur(28px) saturate(180%) brightness(1.12)",
      "scrim-filter": glassFilters["scrim-filter"],
      glass: glass.dark,
      // Light from above: a soft white wash at the top of cards and panels.
      // 5%: a label at the top of a card nested in a glass card sits under two.
      sheen:
        "linear-gradient(180deg, rgb(255 255 255 / 0.05), rgb(255 255 255 / 0) 55%)",
      // A brighter specular rim on every raised edge.
      shadow: {
        raised:
          "inset 0 1px 0 rgb(255 255 255 / 0.16), 0 1px 2px rgb(0 0 0 / 0.4)",
        overlay:
          "inset 0 1px 0 rgb(255 255 255 / 0.18), 0 8px 24px rgb(0 0 0 / 0.5)",
        modal:
          "inset 0 1px 0 rgb(255 255 255 / 0.18), 0 24px 48px rgb(0 0 0 / 0.6)",
        control: "inset 0 1px 0 rgb(255 255 255 / 0.14)",
      },
    },
  },
};

/**
 * Named palettes: a whole colour scheme for one mode, chosen with
 * `<ThemeProvider palette="ace">` (or `setPalette`). A palette fixes light or
 * dark, and overrides any colour role, status tone or chart series of that
 * mode; anything it leaves out comes from the mode's own values. The materials
 * still apply on top (glass makes surfaces translucent), except that a
 * palette's own text colours are kept in glass too.
 *
 * Every palette goes through the same contrast gate as light and dark
 * (`scripts/contrast.mjs`), in both materials.
 */
export const palettes = {
  ace: {
    label: "Ace",
    blurb: "Ink, bone and acid lime",
    mode: "dark",
    color: {
      canvas: "10 10 12",
      surface: "20 20 24",
      "surface-subtle": "28 28 33",
      "surface-muted": "38 38 44",
      "surface-inverse": "243 239 228",
      scrim: "0 0 0",
      fg: "243 239 228",
      "fg-muted": "212 208 198",
      "fg-subtle": "120 117 110",
      "fg-inverse": "10 10 12",
      "fg-on-accent": "10 10 12",
      line: "40 40 44",
      "line-muted": "30 30 34",
      "line-strong": "84 82 78",
      accent: "216 255 54",
      "accent-hover": "194 232 43",
      "accent-subtle": "40 46 20",
      "accent-fg": "216 255 54",
      focus: "216 255 54",
      "code-keyword": "216 255 54",
      "code-string": "120 224 146",
      "code-number": "255 190 92",
      "code-comment": "190 186 176",
      "code-function": "150 205 255",
      "code-type": "255 160 150",
      "difficulty-easy": "216 255 54",
      "difficulty-medium": "255 190 92",
      "difficulty-hard": "255 150 140",
    },
    status: {
      success: { subtle: "18 38 26", fg: "120 224 146", line: "34 80 48", emphasis: "4 120 87" },
      warning: { subtle: "42 31 14", fg: "255 190 92", line: "88 62 22", emphasis: "180 83 9" },
      error: { subtle: "44 16 14", fg: "255 128 118", line: "96 32 28", emphasis: "225 29 72" },
      info: { subtle: "16 30 46", fg: "150 205 255", line: "34 64 96", emphasis: "3 105 161" },
    },
    chart: ["216 255 54", "255 190 92", "255 110 100", "150 205 255", "196 160 255", "90 220 200", "255 160 90", "170 166 156"],
    ambient:
      "radial-gradient(48rem 36rem at 0% 0%, rgb(216 255 54 / 0.05), transparent 70%), radial-gradient(44rem 36rem at 100% 0%, rgb(255 59 47 / 0.05), transparent 70%)",
  },
  pastel: {
    label: "Pastel",
    blurb: "Soft lavender and mint, light",
    mode: "light",
    color: {
      canvas: "246 244 251",
      surface: "255 255 255",
      "surface-subtle": "245 242 250",
      "surface-muted": "236 231 245",
      "surface-inverse": "43 39 64",
      scrim: "43 39 64",
      fg: "43 39 64",
      "fg-muted": "90 85 115",
      "fg-subtle": "150 145 170",
      "fg-inverse": "255 255 255",
      "fg-on-accent": "255 255 255",
      line: "230 228 236",
      "line-muted": "241 239 245",
      "line-strong": "196 192 210",
      accent: "102 70 222",
      "accent-hover": "88 58 200",
      "accent-subtle": "240 236 253",
      "accent-fg": "96 64 214",
      focus: "124 92 240",
      "difficulty-easy": "13 115 106",
      "difficulty-medium": "146 90 14",
      "difficulty-hard": "190 36 44",
    },
    ambient:
      "radial-gradient(48rem 36rem at 0% 0%, rgb(124 92 240 / 0.10), transparent 70%), radial-gradient(44rem 36rem at 100% 0%, rgb(18 165 148 / 0.10), transparent 70%)",
  },
  aurora: {
    label: "Aurora",
    blurb: "Deep navy and blue glass",
    mode: "dark",
    color: {
      canvas: "11 15 23",
      surface: "18 26 41",
      "surface-subtle": "24 33 51",
      "surface-muted": "32 43 64",
      "surface-inverse": "238 242 248",
      scrim: "0 0 0",
      fg: "244 247 252",
      "fg-muted": "210 218 230",
      "fg-subtle": "110 121 140",
      "fg-inverse": "11 15 23",
      "fg-on-accent": "11 15 23",
      line: "35 41 52",
      "line-muted": "26 31 41",
      "line-strong": "66 74 88",
      accent: "89 160 255",
      "accent-hover": "76 148 245",
      "accent-subtle": "22 40 68",
      "accent-fg": "120 180 255",
      focus: "89 160 255",
      "difficulty-easy": "0 200 176",
      "difficulty-medium": "255 190 40",
      "difficulty-hard": "255 156 156",
    },
    status: {
      success: { subtle: "12 36 26", fg: "92 214 134", line: "22 72 44", emphasis: "4 120 87" },
      warning: { subtle: "40 31 10", fg: "255 190 40", line: "84 64 14", emphasis: "180 83 9" },
      error: { subtle: "44 16 18", fg: "250 120 120", line: "96 30 34", emphasis: "225 29 72" },
      info: { subtle: "16 30 52", fg: "120 180 255", line: "30 60 104", emphasis: "3 105 161" },
    },
    ambient:
      "radial-gradient(48rem 36rem at 0% 0%, rgb(89 160 255 / 0.06), transparent 70%), radial-gradient(44rem 36rem at 100% 0%, rgb(0 184 163 / 0.10), transparent 70%)",
  },
  "one-dark-pro": {
    label: "One Dark Pro",
    blurb: "The VS Code classic",
    mode: "dark",
    // Its canvas is lighter than the other dark palettes, so stacked white
    // frost washes its soft greys out: glass deepens the page and brightens
    // the text instead.
    glassKeeps: [],
    glassColor: {
      canvas: "18 20 24",
      fg: "246 247 250",
      "fg-muted": "222 226 233",
      "fg-subtle": "170 176 188",
      "difficulty-hard": "250 190 195",
    },
    color: {
      canvas: "33 37 43",
      surface: "40 44 52",
      "surface-subtle": "46 51 60",
      "surface-muted": "54 60 70",
      "surface-inverse": "200 205 214",
      scrim: "0 0 0",
      fg: "222 226 233",
      "fg-muted": "196 201 211",
      "fg-subtle": "116 122 134",
      "fg-inverse": "40 44 52",
      "fg-on-accent": "33 37 43",
      line: "60 65 75",
      "line-muted": "52 57 66",
      "line-strong": "92 98 110",
      accent: "97 175 239",
      "accent-hover": "86 160 222",
      "accent-subtle": "54 66 84",
      "accent-fg": "120 190 245",
      focus: "97 175 239",
      "code-keyword": "228 182 244",
      "code-string": "190 225 165",
      "code-number": "236 196 150",
      "code-comment": "196 201 211",
      "code-function": "160 208 250",
      "code-type": "242 216 166",
      "difficulty-easy": "150 220 228",
      "difficulty-medium": "236 204 140",
      "difficulty-hard": "245 170 176",
    },
    status: {
      success: { subtle: "48 60 46", fg: "176 214 148", line: "70 92 64", emphasis: "4 120 87" },
      warning: { subtle: "62 56 42", fg: "236 204 140", line: "96 86 60", emphasis: "180 83 9" },
      error: { subtle: "64 44 50", fg: "248 178 184", line: "100 62 70", emphasis: "225 29 72" },
      info: { subtle: "44 58 76", fg: "140 200 248", line: "62 86 112", emphasis: "3 105 161" },
    },
    ambient:
      "radial-gradient(48rem 36rem at 0% 0%, rgb(97 175 239 / 0.05), transparent 70%), radial-gradient(44rem 36rem at 100% 0%, rgb(198 120 221 / 0.04), transparent 70%)",
    chart: ["152 195 121", "97 175 239", "229 192 123", "236 140 148", "214 156 232", "86 182 194", "209 154 102", "171 178 191"],
  },
};

/** The roles a palette keeps in the glass material, where glass would otherwise substitute its own text colours. */
export const paletteGlassKeeps = ["fg", "fg-muted", "fg-subtle"];

/** One palette's colours, completed from its mode: what the CSS and the contrast gate both use. */
export function resolvePalette(id) {
  const p = palettes[id];
  const mode = p.mode;
  return {
    mode,
    color: { ...color[mode], ...p.color },
    status: Object.fromEntries(
      Object.keys(color.status).map((tone) => [tone, { ...color.status[tone][mode], ...(p.status?.[tone] ?? {}) }])
    ),
    chart: p.chart ?? chart[mode],
    ambient: p.ambient,
    keeps: p.glassKeeps ?? paletteGlassKeeps,
    glassColor: p.glassColor ?? {},
  };
}

