/** Class recipes shared by more than one component. */
import { cn } from "../utils/cn.js";

// `primary` is a near-black (white in dark) fill on purpose: it is the
// strongest "financial product" signal, and leaves emerald to mean money in.
const variants = {
  primary: "bg-accent text-fg-on-accent shadow-control hover:bg-accent-hover",
  secondary: "bg-surface-muted text-fg shadow-control hover:bg-line",
  outline:
    "border border-line-strong bg-surface text-fg shadow-control hover:bg-surface-subtle",
  ghost: "text-fg-muted hover:bg-surface-muted hover:text-fg",
  destructive:
    "bg-error-emphasis text-white shadow-control hover:bg-error-emphasis/90",
  success:
    "bg-success-emphasis text-white shadow-control hover:bg-success-emphasis/90",
  link: "text-fg-muted underline-offset-4 hover:text-fg hover:underline",
};
variants.default = variants.primary;

// Heights, not vertical padding: a button that wraps stops reading as one.
// `md` is 40px and `icon` is 40×40 — the minimum comfortable tap target.
// `xs` (32px) is below it: desktop-dense UI only, never a phone's main action.
const sizes = {
  // 32px: dense toolbars and table rows, where 36px crowds the row.
  xs: "h-8 px-2.5 text-label",
  sm: "h-9 px-3 text-label",
  md: "h-10 px-4 text-label",
  lg: "h-12 px-6 text-body-lg",
  icon: "h-10 w-10",
};
sizes.default = sizes.md;

/** @param {{ variant?: string, size?: string, className?: string }} [options] */
export const buttonClasses = ({
  variant = "primary",
  size = "md",
  className,
} = {}) =>
  cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control font-semibold",
    "transition-colors duration-fast ease-standard focus-ring",
    "disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant] ?? variants.primary,
    sizes[size] ?? sizes.md,
    className
  );

export const fieldClasses = (invalid, warning = false) =>
  cn(
    "w-full rounded-control border bg-surface px-control-x py-control-y text-body text-fg shadow-control",
    "placeholder:text-fg-subtle transition-colors duration-fast ease-standard",
    "focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
    invalid
      ? "border-error-emphasis focus:ring-error-emphasis/30"
      : warning
        ? "border-warning-emphasis focus:ring-warning-emphasis/30"
        : "border-line-strong focus:border-focus focus:ring-focus/30"
  );

/** One look for a segmented track and its segments: Tabs, SegmentedControl. */
export const segmentTrackClasses =
  "flex max-w-full gap-1 overflow-x-auto rounded-control border border-line bg-surface-muted p-1 shadow-control sm:inline-flex";

export const segmentClasses = (selected) =>
  cn(
    // Phones: the options share the track's full width and a long label
    // wraps, rather than the last option scrolling out of sight.
    "inline-flex flex-1 items-center justify-center gap-2 text-center sm:flex-none sm:whitespace-nowrap rounded-[calc(theme(borderRadius.control)-0.25rem)] px-3 py-1.5 text-label transition-colors duration-fast focus-ring disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:h-4 [&_svg]:w-4",
    selected
      ? "bg-surface text-fg shadow-raised"
      : "text-fg-muted hover:text-fg"
  );
