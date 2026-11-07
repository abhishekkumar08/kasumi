import { ChevronDown } from "lucide-react";
import { cn } from "../utils/cn.js";

/**
 * Show/hide a section. Native `<details>`/`<summary>`, so it is keyboard
 * operable, announced as expanded/collapsed, and searchable with find-in-page
 * while closed. Uncontrolled (`defaultOpen`); `onToggle` reports changes.
 * `leading` sits before the title (an Avatar); `meta` before the chevron (a
 * status Badge, a count). Keep buttons out of both — the summary is itself
 * the control; put actions in the body.
 * `variant="plain"` drops the card frame for use inside another surface.
 *
 * @param {Parameters<typeof import("../index").Disclosure>[0]} props
 */
export function Disclosure({
  title,
  description,
  leading,
  meta,
  defaultOpen = false,
  onToggle,
  variant = "card",
  className,
  children,
}) {
  return (
    <details
      open={defaultOpen}
      onToggle={(event) => onToggle?.(event.currentTarget.open)}
      className={cn(
        "group",
        variant === "card" && "rounded-card border border-line bg-surface",
        className
      )}
    >
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center justify-between gap-3 rounded-card focus-ring [&::-webkit-details-marker]:hidden",
          variant === "card" ? "px-card py-3" : "py-2"
        )}
      >
        <span className="flex min-w-0 items-center gap-3">
          {leading}
          <span className="min-w-0">
            <span className="block text-label text-fg">{title}</span>
            {description && (
              <span className="block text-caption text-fg-muted">
                {description}
              </span>
            )}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-3">
          {meta}
          <ChevronDown
            aria-hidden="true"
            className="h-4 w-4 text-fg-muted transition-transform duration-fast group-open:rotate-180"
          />
        </span>
      </summary>
      <div className={variant === "card" ? "px-card pb-card" : "pb-2"}>
        {children}
      </div>
    </details>
  );
}
