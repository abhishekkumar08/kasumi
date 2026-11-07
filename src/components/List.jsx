import { cn } from "../utils/cn.js";

/**
 * Rows divided by hairlines. Put it in a Card for a boxed list.
 *
 * @param {Parameters<typeof import("../index").List>[0]} props
 */
export function List({ children, className, ...props }) {
  return (
    <ul className={cn("divide-y divide-line-muted", className)} {...props}>
      {children}
    </ul>
  );
}

/**
 * One row: `leading` (icon, avatar), `title` and `description`, `meta`
 * (badges, a date), `trailing` (a value, a Menu). `href`, or `as` + `to`,
 * makes the row a link and `onClick` a button; `trailing` stays outside it,
 * so a Menu in it is not a control nested in a link. `selected` marks the
 * open item in a master-detail list. `data-*` attributes go on the row's
 * `<li>`, so a test hook covers `trailing` too; other props go to the link
 * or button.
 *
 * @param {Parameters<typeof import("../index").ListRow>[0]} props
 */
export function ListRow({
  title,
  description,
  meta,
  leading,
  trailing,
  stackOnPhone = false,
  selected = false,
  as,
  href,
  onClick,
  className,
  ...props
}) {
  const Tag = as ?? (href ? "a" : onClick ? "button" : "div");
  const rowData = Object.fromEntries(
    Object.entries(props).filter(([key]) => key.startsWith("data-"))
  );
  const innerProps = Object.fromEntries(
    Object.entries(props).filter(([key]) => !key.startsWith("data-"))
  );
  const interactive = Tag !== "div";
  const state =
    Tag === "button"
      ? { type: "button", "aria-pressed": selected }
      : interactive
        ? { href, "aria-current": selected ? "true" : undefined }
        : {};

  return (
    <li
      {...rowData}
      className={cn(
        "flex items-center",
        stackOnPhone && "flex-wrap sm:flex-nowrap",
        selected && "bg-accent-subtle",
        className
      )}
    >
      <Tag
        {...state}
        onClick={onClick}
        className={cn(
          "flex min-w-0 flex-1 items-center gap-3 px-4 py-3 text-left",
          stackOnPhone && "basis-full sm:basis-0",
          interactive &&
            "transition-colors duration-fast focus-ring hover:bg-surface-subtle"
        )}
        {...innerProps}
      >
        {leading && (
          <span className="flex shrink-0 text-fg-muted [&_svg]:h-5 [&_svg]:w-5">
            {leading}
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-label text-fg">{title}</span>
          {description && (
            <span className="block truncate text-caption text-fg-muted">
              {description}
            </span>
          )}
        </span>
        {meta && (
          <span className="flex shrink-0 items-center gap-2">{meta}</span>
        )}
      </Tag>
      {trailing && (
        <div
          className={cn(
            "shrink-0 pr-4",
            stackOnPhone && "w-full pb-3 pl-4 sm:w-auto sm:pb-0 sm:pl-0"
          )}
        >
          {trailing}
        </div>
      )}
    </li>
  );
}
