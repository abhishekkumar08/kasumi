import { cn } from "../utils/cn.js";

/**
 * Label–value pairs: a rule's settings, a statement's details. `items`:
 * [{ label, value }]. `layout="inline"` puts label and value on one row
 * (value right-aligned); "stacked" puts the value under its label.
 *
 * @param {Parameters<typeof import("../index").DescriptionList>[0]} props
 */
export function DescriptionList({ items, layout = "inline", className }) {
  return (
    <dl className={cn("space-y-2", className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            layout === "inline"
              ? "flex items-center justify-between gap-4"
              : "space-y-0.5"
          )}
        >
          <dt className="text-caption text-fg-muted">{item.label}</dt>
          <dd className="min-w-0 text-label text-fg">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
