import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";

const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-2",
  xl: "h-12 w-12 border-4",
};

/** Indeterminate progress. Inherits text colour, so it works on any fill. */
/** @param {Parameters<typeof import("../index").Spinner>[0]} props */
export function Spinner({
  size = "md",
  label = COMPONENT_COPY.LOADING,
  className,
}) {
  return (
    <span role="status" className={cn("inline-flex text-fg-muted", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "inline-block animate-spin rounded-pill border-current border-t-transparent",
          sizes[size] ?? sizes.md
        )}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}

/** Placeholder block shown while content loads. Shape it with `className`. */
/** @param {Parameters<typeof import("../index").Skeleton>[0]} props */
export function Skeleton({ className }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-4 animate-pulse rounded-control bg-surface-muted",
        className
      )}
    />
  );
}
