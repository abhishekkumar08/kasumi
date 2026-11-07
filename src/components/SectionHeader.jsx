import { cn } from "../utils/cn.js";
import { Badge } from "./Badge.jsx";

/**
 * The heading over a group of cards or rows. `count` sits beside the title;
 * `action` goes on the right (a "See all" link, a filter, a button).
 *
 * @param {Parameters<typeof import("../index").SectionHeader>[0]} props
 */
export function SectionHeader({
  title,
  icon: Icon,
  count,
  description,
  action,
  as: Tag = "h2",
  align = "start",
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-x-4 gap-y-2",
        align === "center"
          ? "flex-col items-center text-center"
          : "items-end justify-between",
        className
      )}
    >
      <div className="min-w-0">
        <Tag
          className={cn(
            "flex items-center gap-2 text-body-lg font-semibold text-fg sm:text-title",
            align === "center" && "justify-center"
          )}
        >
          {Icon && (
            <Icon
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-fg-muted"
            />
          )}
          {title}
          {count !== undefined && <Badge size="count">{count}</Badge>}
        </Tag>
        {description && (
          <p className="mt-1 text-body text-fg-muted">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
