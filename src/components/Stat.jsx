import { cn } from "../utils/cn.js";
import { cloneElement, isValidElement } from "react";
import { Amount } from "./Amount.jsx";

const tones = {
  success: "text-success-fg",
  error: "text-error-fg",
  warning: "text-warning-fg",
  neutral: "text-fg-muted",
};

// A headline amount reads in words too; an Amount can still opt out.
const withWords = (value) =>
  isValidElement(value) && value.type === Amount && value.props.words == null
    ? cloneElement(value, { words: true })
    : value;

/**
 * A headline number with its label and change. `delta` is display text
 * ("+12%"); `tone` says whether that change is good, bad or neither — the
 * component can't know that "+12% spending" is bad.
 *
 * The value scales with the nearest size container (StatCard is one), from
 * 13px up to 20px on a phone and the headline size above it, so "₹18,93,857.00" fits a half-width phone
 * card instead of running out of it; with no container it stays full size.
 * An `Amount` value is spelled out in words under the figure ("Two lakh
 * forty-one thousand ninety-seven rupees") unless it says `words={false}`.
 *
 * @param {Parameters<typeof import("../index").Stat>[0]} props
 */
export function Stat({
  label,
  value,
  delta,
  tone = "neutral",
  hint,
  icon: Icon,
  className,
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="flex items-center gap-2 text-caption text-fg-muted sm:text-label">
        {Icon && <Icon aria-hidden="true" className="h-4 w-4" />}
        <span className="truncate">{label}</span>
      </div>
      <div className="mt-1 text-headline leading-tight tabular-nums text-fg [font-size:clamp(0.8125rem,13cqi,1.25rem)] sm:[font-size:clamp(0.8125rem,11cqi,1.75rem)]">
        {withWords(value)}
      </div>
      {(delta || hint) && (
        <div className="mt-1 flex flex-wrap items-center gap-2 text-caption">
          {delta && (
            <span
              className={cn(
                "font-semibold tabular-nums",
                tones[tone] ?? tones.neutral
              )}
            >
              {delta}
            </span>
          )}
          {hint && <span className="text-fg-muted">{hint}</span>}
        </div>
      )}
    </div>
  );
}
