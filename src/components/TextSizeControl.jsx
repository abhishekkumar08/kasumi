import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";

const step =
  "inline-flex h-8 min-w-8 items-center justify-center rounded-control px-2 text-label text-fg-muted transition-colors duration-fast hover:bg-surface-muted hover:text-fg focus-ring disabled:cursor-not-allowed disabled:opacity-50";

/**
 * A − value + stepper for reading size. A stepper, not a slider: the useful
 * change is one small deliberate step. The value resets to `defaultValue`.
 * Controlled: the app applies the size (a root font-size, say).
 *
 * @param {Parameters<typeof import("../index").TextSizeControl>[0]} props
 */
export function TextSizeControl({
  value,
  onChange,
  min = 12,
  max = 22,
  defaultValue = 16,
  label = COMPONENT_COPY.TEXT_SIZE,
  smallerLabel = COMPONENT_COPY.TEXT_SMALLER,
  biggerLabel = COMPONENT_COPY.TEXT_BIGGER,
  resetLabel = COMPONENT_COPY.TEXT_RESET,
  className,
}) {
  return (
    <div role="group" aria-label={label} className={cn("inline-flex items-center rounded-control border border-line bg-surface", className)}>
      <button type="button" className={step} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={smallerLabel} title={smallerLabel}>
        A<span aria-hidden="true" className="text-caption">−</span>
      </button>
      <button type="button" className={cn(step, "tabular-nums text-fg")} onClick={() => onChange(defaultValue)} aria-label={resetLabel(value)} title={resetLabel(value)}>
        {value}
      </button>
      <button type="button" className={step} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={biggerLabel} title={biggerLabel}>
        A<span aria-hidden="true" className="text-caption">+</span>
      </button>
    </div>
  );
}
