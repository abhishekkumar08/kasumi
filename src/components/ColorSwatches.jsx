import { Check } from "lucide-react";
import { useId, useRef } from "react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";

const TRANSPARENT = "transparent";

/**
 * Pick one colour from a row of swatches; `allowCustom` adds the native
 * colour picker as the last swatch. `colors`: [{ value, label }], where
 * `value` is a CSS colour or "transparent" (drawn as a slashed swatch).
 * WAI-ARIA radio group: one tab stop, arrow keys move and select.
 *
 * @param {Parameters<typeof import("../index").ColorSwatches>[0]} props
 */
export function ColorSwatches({ label, colors, value, onChange, allowCustom = false, className }) {
  const id = useId();
  const refs = useRef({});
  const known = colors.some((c) => c.value === value);
  const tabbable = known ? value : colors[0]?.value;

  const onKeyDown = (event) => {
    const index = colors.findIndex((c) => c.value === tabbable);
    const moves = { ArrowRight: index + 1, ArrowDown: index + 1, ArrowLeft: index - 1, ArrowUp: index - 1, Home: 0, End: colors.length - 1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = colors[(moves[event.key] + colors.length) % colors.length];
    onChange?.(next.value);
    refs.current[next.value]?.focus();
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span id={`${id}-label`} className="text-caption font-medium text-fg-muted">
        {label}
      </span>
      <div role="radiogroup" aria-labelledby={`${id}-label`} onKeyDown={onKeyDown} className="flex flex-wrap items-center gap-1.5">
        {colors.map((c) => {
          const selected = c.value === value;
          return (
            <button
              key={c.value}
              ref={(node) => {
                refs.current[c.value] = node;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={c.label}
              title={c.label}
              tabIndex={c.value === tabbable ? 0 : -1}
              onClick={() => onChange?.(c.value)}
              className={cn(
                "relative grid h-7 w-7 place-items-center rounded-control border border-line-strong focus-ring",
                selected && "ring-2 ring-focus ring-offset-1 ring-offset-surface"
              )}
              style={
                c.value === TRANSPARENT
                  ? { backgroundImage: "linear-gradient(135deg, transparent 45%, rgb(var(--mw-error-emphasis)) 45%, rgb(var(--mw-error-emphasis)) 55%, transparent 55%)" }
                  : { backgroundColor: c.value }
              }
            >
              {selected && c.value !== TRANSPARENT && <Check aria-hidden="true" className="h-3.5 w-3.5 text-white mix-blend-difference" />}
            </button>
          );
        })}
        {allowCustom && (
          <label
            className={cn(
              "relative h-7 w-7 cursor-pointer overflow-hidden rounded-control border border-line-strong focus-within:ring-2 focus-within:ring-focus",
              !known && value && value !== TRANSPARENT && "ring-2 ring-focus ring-offset-1 ring-offset-surface"
            )}
            style={{ background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)" }}
            title={COMPONENT_COPY.CUSTOM_COLOR}
          >
            <span className="sr-only">{COMPONENT_COPY.CUSTOM_COLOR}</span>
            <input
              type="color"
              value={/^#[0-9a-f]{6}$/i.test(value ?? "") ? value : "#000000"}
              onChange={(event) => onChange?.(event.target.value)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </label>
        )}
      </div>
    </div>
  );
}
