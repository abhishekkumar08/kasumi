import { cn } from "../utils/cn.js";

const tones = {
  // Primary text on a fill: muted-on-muted fails once glass stacks fills.
  neutral: "border-line bg-surface-muted text-fg",
  accent: "border-transparent bg-accent text-fg-on-accent",
  outline: "border-line-strong bg-transparent text-fg-muted",
  success: "border-success-line bg-success-subtle text-success-fg",
  warning: "border-warning-line bg-warning-subtle text-warning-fg",
  error: "border-error-line bg-error-subtle text-error-fg",
  info: "border-info-line bg-info-subtle text-info-fg",
};

// Categorical colours from the theme's chart palette (--mw-chart-1…8, stored
// as RGB channels) on the border and wash; the text stays text-fg because
// chart colours fall under 4.5:1 as small text in some themes. For
// labels that tell kinds apart rather than signal a status. Written out so
// Tailwind sees every class.
const series = {
  1: "border-[rgb(var(--mw-chart-1))] bg-[rgb(var(--mw-chart-1)/0.14)] text-fg",
  2: "border-[rgb(var(--mw-chart-2))] bg-[rgb(var(--mw-chart-2)/0.14)] text-fg",
  3: "border-[rgb(var(--mw-chart-3))] bg-[rgb(var(--mw-chart-3)/0.14)] text-fg",
  4: "border-[rgb(var(--mw-chart-4))] bg-[rgb(var(--mw-chart-4)/0.14)] text-fg",
  5: "border-[rgb(var(--mw-chart-5))] bg-[rgb(var(--mw-chart-5)/0.14)] text-fg",
  6: "border-[rgb(var(--mw-chart-6))] bg-[rgb(var(--mw-chart-6)/0.14)] text-fg",
  7: "border-[rgb(var(--mw-chart-7))] bg-[rgb(var(--mw-chart-7)/0.14)] text-fg",
  8: "border-[rgb(var(--mw-chart-8))] bg-[rgb(var(--mw-chart-8)/0.14)] text-fg",
};

// Names callers used before tones existed.
const legacy = { default: "success", secondary: "neutral", danger: "error" };

const sizes = {
  sm: "px-chip-x py-0.5 text-caption",
  md: "px-chip-x py-chip-y text-caption",
  lg: "px-3 py-1 text-label",
  // A number on a nav item or tab: round at one digit, a pill past that.
  count: "h-5 min-w-5 justify-center px-1.5 text-caption tabular-nums",
};
sizes.default = sizes.md;

/**
 * A short status label. `whitespace-nowrap` because a pill that wraps stops
 * being a pill — in a narrow table column the text spilled outside the shape.
 *
 * @param {Parameters<typeof import("../index").Badge>[0]} props
 */
export function Badge({
  children,
  tone,
  variant,
  series: seriesIndex,
  size = "md",
  className,
  ...props
}) {
  const key = tone ?? legacy[variant] ?? variant ?? "neutral";
  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-pill border font-medium",
        series[seriesIndex] ?? tones[key] ?? tones.neutral,
        sizes[size] ?? sizes.md,
        className
      )}
    >
      {children}
    </span>
  );
}
