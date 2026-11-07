"use client";

import { useId } from "react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";

const fills = {
  accent: "bg-accent",
  success: "bg-success-emphasis",
  warning: "bg-warning-emphasis",
  error: "bg-error-emphasis",
  info: "bg-info-emphasis",
};

const heights = { sm: "h-1.5", md: "h-2.5" };

/**
 * A share of a whole: budget used, category of spend, a score. Announced as a
 * progressbar with its value; `label` names it (or `aria-label` /
 * `aria-labelledby` when a visible heading already does), `valueLabel`
 * replaces the default "40%" with something like "₹4,000 of ₹10,000".
 * `steps` turns it into a step bar: one segment per step, `value` is how many
 * are done, announced as "2 of 5 steps".
 *
 * @param {Parameters<typeof import("../index").Progress>[0]} props
 */
export function Progress({
  value,
  max = 100,
  steps,
  label,
  valueLabel,
  tone = "accent",
  color,
  size = "md",
  showValue = true,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}) {
  const id = useId();
  const total = steps ?? max;
  const percent =
    total > 0 ? Math.min(100, Math.max(0, (value / total) * 100)) : 0;
  const text =
    valueLabel ??
    (steps
      ? COMPONENT_COPY.STEPS_DONE(value, steps)
      : `${Math.round(percent)}%`);
  const fill = fills[tone] ?? fills.accent;

  return (
    <div className={cn("min-w-0", className)}>
      {(label || showValue) && (
        <div className="mb-1 flex items-baseline justify-between gap-3 text-caption">
          {label && (
            <span id={`${id}-label`} className="truncate text-fg-muted">
              {label}
            </span>
          )}
          {showValue && (
            <span className="shrink-0 font-semibold tabular-nums text-fg">
              {text}
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-label={label ? undefined : ariaLabel}
        aria-labelledby={label ? `${id}-label` : ariaLabelledBy}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={value}
        aria-valuetext={text}
        className={cn(
          steps
            ? "flex gap-1"
            : "overflow-hidden rounded-pill bg-surface-muted",
          heights[size] ?? heights.md
        )}
      >
        {steps ? (
          Array.from({ length: steps }, (_, i) => (
            <div
              key={i}
              className={cn(
                "h-full flex-1 rounded-pill transition-colors duration-slow ease-standard",
                i < value ? fill : "bg-surface-muted"
              )}
            />
          ))
        ) : (
          // Width is data, so it's the one inline style the suite allows.
          <div
            className={cn(
              "h-full rounded-pill transition-[width] duration-slow ease-standard",
              !color && fill
            )}
            style={{ width: `${percent}%`, backgroundColor: color }}
          />
        )}
      </div>
    </div>
  );
}
