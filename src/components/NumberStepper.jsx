import { Minus, Plus } from "lucide-react";
import { useId } from "react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";
import { IconButton } from "./IconButton.jsx";

/**
 * A small whole number picked with − and + buttons: guests, rooms, beds.
 * The value is announced through an output tied to the label; the buttons
 * disable at `min` and `max`.
 *
 * @param {Parameters<typeof import("../index").NumberStepper>[0]} props
 */
export function NumberStepper({ label, description, value = 0, min = 0, max = Infinity, step = 1, onChange, formatValue = String, className }) {
  const id = useId();
  const name = typeof label === "string" ? label : "";
  return (
    <div className={cn("flex items-center justify-between gap-4 py-3", className)}>
      <div className="min-w-0">
        <p id={`${id}-label`} className="text-label text-fg">
          {label}
        </p>
        {description && <p className="text-caption text-fg-muted">{description}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <IconButton
          icon={Minus}
          label={COMPONENT_COPY.DECREASE(name)}
          variant="secondary"
          size="sm"
          disabled={value - step < min}
          onClick={() => onChange?.(Math.max(min, value - step))}
          className="rounded-pill"
        />
        <output aria-labelledby={`${id}-label`} aria-live="polite" className="min-w-6 text-center text-body tabular-nums text-fg">
          {formatValue(value)}
        </output>
        <IconButton
          icon={Plus}
          label={COMPONENT_COPY.INCREASE(name)}
          variant="secondary"
          size="sm"
          disabled={value + step > max}
          onClick={() => onChange?.(Math.min(max, value + step))}
          className="rounded-pill"
        />
      </div>
    </div>
  );
}
