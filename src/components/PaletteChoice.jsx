import { Check } from "lucide-react";
import { palettes } from "../theme/tokens.js";
import { useTheme } from "../theme/useTheme.js";
import { cn } from "../utils/cn.js";

/**
 * Picks one of Kasumi's named palettes (or plain light/dark when `includeModes`).
 * Each option shows the palette's own canvas, surface and accent, so the choice is
 * seen, not read. Copy for the plain modes arrives as props. Pass `value` and
 * `onChange` to drive it from the app's own store instead of ThemeProvider.
 *
 * @param {Parameters<typeof import("../index").PaletteChoice>[0]} props
 */
export function PaletteChoice({ label, ids, includeModes = false, lightLabel, darkLabel, value, onChange, className }) {
  const context = useTheme();
  const controlled = onChange !== undefined;
  const palette = controlled ? value ?? null : context.palette;
  const theme = context.theme;
  const setPalette = controlled ? onChange : context.setPalette;
  const setTheme = context.setTheme;
  const list = (ids ?? Object.keys(palettes)).filter((id) => id in palettes);

  /** @type {Array<{ key: string, name: import("react").ReactNode, blurb?: string, swatch: string[], active: boolean, choose: () => void }>} */
  const options = [
    ...(includeModes
      ? [
          { key: "light", name: lightLabel, swatch: ["248 250 252", "255 255 255", "2 6 23"], active: !palette && theme === "light", choose: () => setTheme("light") },
          { key: "dark", name: darkLabel, swatch: ["2 6 23", "15 23 42", "255 255 255"], active: !palette && theme === "dark", choose: () => setTheme("dark") },
        ]
      : []),
    ...list.map((id) => {
      const p = palettes[id];
      return {
        key: id,
        name: p.label,
        blurb: p.blurb,
        swatch: [p.color.canvas, p.color.surface, p.color.accent],
        active: palette === id,
        choose: () => setPalette(id),
      };
    }),
  ];

  return (
    <div role="radiogroup" aria-label={label} className={cn("grid gap-2 sm:grid-cols-2", className)}>
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          role="radio"
          aria-checked={o.active}
          onClick={o.choose}
          className={cn(
            "flex items-center gap-3 rounded-control border px-3 py-2.5 text-left transition-colors duration-fast focus-ring",
            o.active ? "border-accent bg-accent-subtle" : "border-line bg-surface hover:bg-surface-subtle"
          )}
        >
          <span aria-hidden className="flex shrink-0 overflow-hidden rounded-control border border-line">
            {o.swatch.map((rgb, i) => (
              <span key={i} className="h-8 w-4" style={{ backgroundColor: `rgb(${rgb})` }} />
            ))}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-label text-fg">{o.name}</span>
            {o.blurb && <span className="block truncate text-caption text-fg-muted">{o.blurb}</span>}
          </span>
          {o.active && <Check className="h-4 w-4 shrink-0 text-accent-fg" aria-hidden />}
        </button>
      ))}
    </div>
  );
}
