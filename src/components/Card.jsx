import { forwardRef } from "react";
import { cn } from "../utils/cn.js";

const surfaces = {
  default: "border border-line bg-surface shadow-raised backdrop-surface sheen",
  glass: "surface-glass",
};

const interactiveSurfaces = {
  default:
    "cursor-pointer transition-shadow duration-base ease-standard hover:shadow-overlay",
  glass: "cursor-pointer surface-glass-interactive",
};

const paddings = { none: "", sm: "p-card-sm", md: "p-card-sm sm:p-card" };

// A status tint for a card that is about money in, money out, a warning.
const tones = {
  success: "border border-success-line bg-success-subtle animate-enter",
  warning: "border border-warning-line bg-warning-subtle animate-enter",
  error: "border border-error-line bg-error-subtle animate-enter",
  info: "border border-info-line bg-info-subtle animate-enter",
};

/**
 * The surface every panel sits on. `variant="glass"` is the suite's frosted
 * look; `interactive` adds hover feedback and belongs only on cards that do
 * something when clicked. `selected` rings the card in the accent colour (a
 * picked plan, a chosen option); the control inside it still carries the
 * state for assistive tech (a radio, aria-pressed, aria-current).
 *
 * Padding defaults to none because most cards compose `CardHeader` and
 * `CardContent`, which bring their own.
 */
// Forwards its ref so callers (and libraries) can reach the root element.
/** @type {typeof import("../index").Card} */
export const Card = forwardRef(
  /** @param {any} props */ function Card(
    {
      children,
      variant = "default",
      interactive = false,
      selected = false,
      tone,
      padding = "none",
      className,
      as: Tag = "div",
      ...props
    },
    ref
  ) {
    return (
      <Tag
        ref={ref}
        // A stable hook for tests and tooling, independent of styling classes.
        data-slot="card"
        data-selected={selected || undefined}
        className={cn(
          // A card is its own stacking context (the glass blur), so a menu
          // opened in its last row painted under the next card. While it
          // holds an open popup, it sits above its neighbours.
          "rounded-card has-[[aria-expanded=true]]:relative has-[[aria-expanded=true]]:z-dropdown",
          tones[tone] ?? surfaces[variant] ?? surfaces.default,
          interactive &&
            (interactiveSurfaces[variant] ?? interactiveSurfaces.default),
          paddings[padding] ?? "",
          selected && "ring-2 ring-accent",
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

/** @param {Parameters<typeof import("../index").CardHeader>[0]} props */
export function CardHeader({ children, className }) {
  return <div className={cn("p-card-sm sm:p-card", className)}>{children}</div>;
}

/** @param {Parameters<typeof import("../index").CardTitle>[0]} props */
export function CardTitle({ children, icon: Icon, className, as: Tag = "h3" }) {
  return (
    <Tag
      className={cn(
        "text-body-lg font-semibold text-fg sm:text-title",
        Icon && "flex items-center gap-2",
        className
      )}
    >
      {Icon && (
        <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-fg-muted" />
      )}
      {children}
    </Tag>
  );
}

/** @param {Parameters<typeof import("../index").CardDescription>[0]} props */
export function CardDescription({ children, className, as: Tag = "p" }) {
  return (
    <Tag className={cn("text-body text-fg-muted", className)}>{children}</Tag>
  );
}

/** @param {Parameters<typeof import("../index").CardContent>[0]} props */
export function CardContent({ children, className }) {
  return (
    <div
      className={cn("px-card-sm pb-card-sm sm:px-card sm:pb-card", className)}
    >
      {children}
    </div>
  );
}

/** @param {Parameters<typeof import("../index").CardFooter>[0]} props */
export function CardFooter({ children, className }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-end gap-2 border-t border-line px-card-sm py-3 sm:px-card sm:py-4",
        className
      )}
    >
      {children}
    </div>
  );
}
