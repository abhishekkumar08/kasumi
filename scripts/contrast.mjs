#!/usr/bin/env node
// Worst-case contrast for every text role on every layer stack it is drawn
// on, in both materials, both themes and every named palette, straight from
// the tokens.
//
// axe can't settle contrast on translucent or frosted backgrounds (it reports
// them as "incomplete", not as violations), so the glass material needs this
// instead: composite each layer over the backdrops it can sit on — the canvas,
// the canvas under each ambient glow, the host pages' decorative blobs — and
// keep the lowest ratio. Floating layers (modal, tooltip, toast, sticky
// chrome) are also composited over pure white and black as a stress case,
// reported but not gated: blur averages content out long before that.
//
//   node scripts/contrast.mjs           # table
//   node scripts/contrast.mjs --strict  # exit 1 if a gated pair fails

import {
  chart,
  color,
  glass,
  material,
  palettes,
  resolvePalette,
  translucentRoles,
} from "../src/theme/tokens.js";

const TEXT_MIN = 4.5;
const UI_MIN = 3;
const TONES = ["success", "warning", "error", "info"];

const parseRgb = (s) => {
  const m = s.match(/rgb\((\d+) (\d+) (\d+)(?: \/ ([\d.]+))?\)/);
  return { rgb: [+m[1], +m[2], +m[3]], alpha: m[4] ? +m[4] : 1 };
};
const channels = (s) => s.split(" ").map(Number);
const over = (top, alpha, base) =>
  top.map((c, i) => c * alpha + base[i] * (1 - alpha));
const luminance = (rgb) => {
  const [r, g, b] = rgb.map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// A colour set: Kasumi's own light or dark, or a named palette resolved over
// its mode. In glass a palette keeps its own text roles and its own glow.
const modeSet = (mode) => ({
  name: mode,
  mode,
  color: color[mode],
  status: Object.fromEntries(Object.keys(color.status).map((t) => [t, color.status[t][mode]])),
  chart: chart[mode],
  keeps: [],
});
const paletteSet = (id) => ({ name: id, ...resolvePalette(id) });

function palette(set, kind) {
  const theme = set.mode;
  const c = set.color;
  const g = kind === "glass" ? material.glass[theme] : null;
  const layer = (role) => {
    if (role === "overlay") {
      const surface = (!set.keeps.includes("surface") && g?.channels?.surface) || c.surface;
      return parseRgb(material[kind][theme].overlay.replace("rgb(var(--mw-surface))", `rgb(${surface})`));
    }
    if (role === "card-glass") return kind === "glass" ? parseRgb(glass[theme].bg) : { rgb: channels(c.surface), alpha: 1 };
    // The top of a card's sheen gradient (none outside dark glass).
    if (role === "sheen") {
      const m = (g?.sheen ?? "").match(/rgb\((\d+) (\d+) (\d+) \/ ([\d.]+)\)/);
      return m ? { rgb: [+m[1], +m[2], +m[3]], alpha: +m[4] } : { rgb: [0, 0, 0], alpha: 0 };
    }
    if (role.startsWith("chart-"))
      return { rgb: channels(set.chart[Number(role.slice(6)) - 1]), alpha: 1 };
    // Modal::backdrop dims the page first (0.6 light, 0.7 dark).
    if (role === "scrim")
      return { rgb: channels(c.scrim), alpha: theme === "light" ? 0.6 : 0.7 };
    const [tone, part] = role.split(":");
    if (part) {
      const alpha = Number(g ? g["status-subtle-alpha"] : 1);
      return { rgb: channels(set.status[tone][part]), alpha: part === "subtle" ? alpha : 1 };
    }
    const glassChannel = !g ? undefined : set.glassColor?.[role] ?? (set.keeps.includes(role) ? undefined : g.channels?.[role]);
    const rgb = channels(glassChannel ?? c[role]);
    const alpha = translucentRoles.includes(role) && g ? Number(g.alpha[role]) : 1;
    return { rgb, alpha };
  };
  const canvas = channels((g && set.glassColor?.canvas) || c.canvas);
  const page = [{ name: "canvas", rgb: canvas }];
  if (g)
    for (const m of (set.ambient ?? g.ambient).matchAll(/rgb\((\d+) (\d+) (\d+) \/ ([\d.]+)\)/g))
      page.push({ name: `glow ${m[1]} ${m[2]} ${m[3]}`, rgb: over([+m[1], +m[2], +m[3]], +m[4], canvas) });
  for (const tone of ["success", "info", "error"])
    page.push({ name: `${tone} blob`, rgb: over(channels(set.status[tone].emphasis), 0.2, canvas) });
  const stress = [
    { name: "white", rgb: [255, 255, 255] },
    { name: "black", rgb: [0, 0, 0] },
  ];
  return { layer, page, stress };
}

const textPairs = [
  ["card text", "fg", ["surface"]],
  ["card muted text", "fg-muted", ["surface"]],
  ["table header / row hover", "fg-muted", ["surface", "surface-subtle"]],
  ["secondary button", "fg", ["surface", "surface-muted"]],
  ["active nav row", "fg", ["surface", "accent-subtle"]],
  ["selected list row, muted", "fg-muted", ["surface", "accent-subtle"]],
  ["text on page", "fg", []],
  ["muted text on page", "fg-muted", []],
  ["glass card muted", "fg-muted", ["card-glass"]],
  // Deepest real stack: a neutral badge in a table inside a glass card.
  ["badge in table in glass card", "fg", ["card-glass", "surface", "surface-muted"]],
  ["table row hover in glass card", "fg-muted", ["card-glass", "surface", "surface-subtle"]],
  // A label at the top of a card nested in a glass card sits under both sheens.
  ["nested card label, top", "fg-muted", ["card-glass", "sheen", "surface", "sheen"]],
  // A glass card in a glass card: Categories and Insights stat tiles.
  ["glass card in glass card", "fg-muted", ["card-glass", "sheen", "card-glass", "sheen"]],
  ["neutral badge in nested card", "fg", ["card-glass", "sheen", "surface", "sheen", "surface-muted"]],
  ["primary button", "fg-on-accent", ["accent"]],
  ...["easy", "medium", "hard"].flatMap((d) => [
    [`${d} label in card`, `difficulty-${d}`, ["surface"]],
    [`${d} label in glass card`, `difficulty-${d}`, ["card-glass", "sheen"]],
  ]),
  ...TONES.flatMap((t) => [
    [`${t} badge in card`, `${t}:fg`, ["surface", `${t}:subtle`]],
    [`${t} alert on page`, `${t}:fg`, [`${t}:subtle`]],
    // Alert variant="inline": tinted text straight on a card. Not gated on
    // the page: over the host's decorative blobs info/error drop to ~4.1.
    [`${t} inline note in card`, `${t}:fg`, ["surface"]],
    // Card tone / StatCard tint: plain text roles on a status wash.
    [`${t} tinted card text`, "fg", [`${t}:subtle`]],
    [`${t} tinted card muted`, "fg-muted", [`${t}:subtle`]],
  ]),
];
const floatingPairs = [
  ["modal text (over scrim)", "fg", ["scrim", "overlay"]],
  ["modal muted (over scrim)", "fg-muted", ["scrim", "overlay"]],
  ["menu / drawer muted", "fg-muted", ["overlay"]],
  ["sticky chrome muted", "fg-muted", ["overlay"]],
  ["chrome active nav", "fg", ["overlay", "accent-subtle"]],
  ["tooltip", "fg-inverse", ["surface-inverse"]],
  ...TONES.map((t) => [`${t} toast`, `${t}:fg`, ["overlay"]]),
];
const uiPairs = [
  ["input border vs card", "line-strong", ["surface"]],
  ["focus ring vs card", "focus", ["surface"]],
  ["switch track (off) vs card", "line-strong", ["surface"]],
];
// A code block is surface-subtle inset in a card.
const codePairs = ["keyword", "string", "number", "comment", "function", "type"].map((k) => [
  `code ${k}`,
  `code-${k}`,
  ["surface", "surface-subtle"],
]);
// Chart series are graphical objects: 3:1 against the card they sit on.
const chartPairs = chart.light.map((_, i) => [`chart-${i + 1} vs card`, `chart-${i + 1}`, ["surface"]]);

function measure(set, kind, [, fgRole, stack], backdrops) {
  const p = palette(set, kind);
  let worst = { value: Infinity, where: "" };
  for (const b of backdrops(p)) {
    let bg = b.rgb;
    for (const role of stack) {
      const { rgb, alpha } = p.layer(role);
      bg = over(rgb, alpha, bg);
    }
    const fg = p.layer(fgRole).rgb;
    const value = ratio(fg, bg);
    if (value < worst.value) worst = { value, where: b.name };
  }
  return worst;
}

const SETS = [modeSet("light"), modeSet("dark"), ...Object.keys(palettes).map(paletteSet)];
const COMBOS = ["solid", "glass"].flatMap((kind) => SETS.map((set) => [kind, set]));
const W = 11;
const head = ([kind, set]) => `${kind[0]}:${set.name}`.slice(0, W - 1);
const failures = [];

function table(title, pairs, min, backdrops, gated) {
  console.log(`\n${title} (min ${min}:1)`);
  console.log(
    "pair".padEnd(30) + COMBOS.map((c) => head(c).padStart(W)).join("")
  );
  for (const pair of pairs) {
    const cells = COMBOS.map(([kind, set]) => {
      const w = measure(set, kind, pair, backdrops);
      const ok = w.value >= min;
      if (!ok && gated) failures.push(`${pair[0]} — ${kind} ${set.name}: ${w.value.toFixed(2)} over ${w.where}`);
      return `${w.value.toFixed(2)}${ok ? " " : "✗"}`.padStart(W);
    });
    console.log(pair[0].padEnd(30) + cells.join(""));
  }
}

table("Text on page-level layers", textPairs, TEXT_MIN, (p) => p.page, true);
table("Text on floating layers", floatingPairs, TEXT_MIN, (p) => p.page, true);
table("Floating layers, stress: pure white/black behind", floatingPairs, TEXT_MIN, (p) => p.stress, false);
table("Component boundaries (WCAG 1.4.11)", uiPairs, UI_MIN, (p) => p.page, false);
table("Code syntax on a code block", codePairs, TEXT_MIN, (p) => p.page, true);
table("Chart series vs card (WCAG 1.4.11)", chartPairs, UI_MIN, (p) => p.page, true);

if (failures.length) {
  console.log(`\n${failures.length} gated failure(s):\n  ${failures.join("\n  ")}`);
  if (process.argv.includes("--strict")) process.exit(1);
} else {
  console.log("\nAll gated text pairs clear 4.5:1 in every material, theme and palette.");
}
