import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";

/**
 * Wraps the table in a scroll container so wide data never widens the page.
 * The container takes focus: on a narrow screen it scrolls sideways, and a
 * keyboard user can only scroll what they can focus (axe:
 * scrollable-region-focusable). No backdrop blur of its own: a table sits
 * in a card, and a material inside a material only compounds the frost.
 *
 * @param {Parameters<typeof import("../index").Table>[0]} props
 */
export function Table({ caption, children, className, containerClassName }) {
  return (
    <div
      tabIndex={0}
      className={cn(
        "relative overflow-x-auto rounded-card border border-line bg-surface focus-ring",
        containerClassName
      )}
    >
      <table className={cn("w-full border-collapse text-body", className)}>
        {caption && <caption className="sr-only">{caption}</caption>}
        {children}
      </table>
    </div>
  );
}

/** @param {Parameters<typeof import("../index").TableHead>[0]} props */
export function TableHead({ children, className }) {
  return (
    <thead className={cn("bg-surface-subtle", className)}>{children}</thead>
  );
}

/** @param {Parameters<typeof import("../index").TableBody>[0]} props */
export function TableBody({ children, className }) {
  return (
    <tbody className={cn("divide-y divide-line", className)}>{children}</tbody>
  );
}

/** @param {Parameters<typeof import("../index").TableRow>[0]} props */
export function TableRow({
  children,
  interactive = false,
  className,
  ...props
}) {
  return (
    <tr
      className={cn(
        interactive &&
          "cursor-pointer transition-colors duration-fast hover:bg-surface-subtle",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

/**
 * Column header. Pass `onSort` to make it sortable: the header gets
 * `aria-sort` and a real button, so the order is reachable by keyboard and
 * announced to screen readers. `sortDirection` is "asc", "desc" or unset.
 *
 * @param {Parameters<typeof import("../index").TableHeader>[0]} props
 */
export function TableHeader({
  children,
  numeric = false,
  onSort,
  sortDirection,
  className,
  ...props
}) {
  const SortIcon =
    sortDirection === "asc"
      ? ArrowUp
      : sortDirection === "desc"
        ? ArrowDown
        : ArrowUpDown;
  return (
    <th
      scope="col"
      aria-sort={
        onSort
          ? sortDirection === "asc"
            ? "ascending"
            : sortDirection === "desc"
              ? "descending"
              : "none"
          : undefined
      }
      className={cn(
        "whitespace-nowrap border-b border-line px-4 py-3 text-caption font-semibold uppercase tracking-wide text-fg-muted",
        numeric ? "text-right" : "text-left",
        className
      )}
      {...props}
    >
      {onSort ? (
        <button
          type="button"
          onClick={onSort}
          className={cn(
            "inline-flex items-center gap-1 rounded-control uppercase tracking-wide transition-colors duration-fast hover:text-fg focus-ring",
            numeric && "flex-row-reverse",
            sortDirection && "text-fg"
          )}
        >
          {children}
          <SortIcon aria-hidden="true" className="h-3.5 w-3.5" />
        </button>
      ) : (
        children
      )}
    </th>
  );
}

/** `numeric` right-aligns and uses tabular figures so amounts line up. */
/** @param {Parameters<typeof import("../index").TableCell>[0]} props */
export function TableCell({
  children,
  description,
  numeric = false,
  className,
  ...props
}) {
  return (
    <td
      className={cn(
        "px-4 py-3 text-fg",
        numeric && "text-right tabular-nums",
        className
      )}
      {...props}
    >
      {description ? (
        <>
          <span className="block">{children}</span>
          <span className="block text-caption text-fg-muted">
            {description}
          </span>
        </>
      ) : (
        children
      )}
    </td>
  );
}

/** @param {Parameters<typeof import("../index").TableEmpty>[0]} props */
export function TableEmpty({ colSpan, children = COMPONENT_COPY.NO_RESULTS }) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-4 py-section text-center text-fg-muted"
      >
        {children}
      </td>
    </tr>
  );
}
