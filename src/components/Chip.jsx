import { X } from "lucide-react";
import { cn } from "../utils/cn.js";

/**
 * Smaller than a button, for filters and page links. What it renders follows
 * from its props:
 * - `onClick`: a toggle button; `selected` is announced as aria-pressed.
 * - `href`, or `as` + `to` (a router Link): a link; `selected` marks the
 *   current page (aria-current).
 * - neither: a static label.
 * `count` trails the label ("Easy 12"). `onRemove` adds an × (an active
 * filter): the chip becomes a static label with a remove button inside.
 *
 * @param {Parameters<typeof import("../index").Chip>[0]} props
 */
export function Chip({
  children,
  selected = false,
  count,
  icon: Icon,
  as,
  href,
  onClick,
  onRemove,
  removeLabel,
  className,
  ...props
}) {
  const Tag = onRemove
    ? "span"
    : (as ?? (href ? "a" : onClick ? "button" : "span"));
  const state =
    Tag === "button"
      ? { type: "button", "aria-pressed": selected }
      : Tag === "span"
        ? {}
        : { href, "aria-current": selected ? "page" : undefined };

  return (
    <Tag
      {...state}
      onClick={onClick}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-pill border px-3 text-label transition-colors duration-fast",
        selected
          ? "border-accent bg-accent text-fg-on-accent"
          : "border-line-strong bg-surface text-fg-muted",
        Tag !== "span" && "focus-ring",
        Tag !== "span" && !selected && "hover:border-fg-subtle hover:text-fg",
        className
      )}
      {...props}
    >
      {Icon && <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />}
      {children}
      {count !== undefined && (
        <span
          className={cn("font-semibold tabular-nums", !selected && "text-fg")}
        >
          {count}
        </span>
      )}
      {onRemove && (
        <button
          type="button"
          aria-label={removeLabel}
          title={removeLabel}
          onClick={onRemove}
          className="-mr-1.5 rounded-pill p-0.5 text-fg-muted transition-colors duration-fast hover:bg-surface-muted hover:text-fg focus-ring"
        >
          <X aria-hidden="true" className="h-3.5 w-3.5" />
        </button>
      )}
    </Tag>
  );
}
