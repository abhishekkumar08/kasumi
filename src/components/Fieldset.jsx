import { cn } from "../utils/cn.js";

/**
 * A titled group of related controls: a set of checkboxes, a picker, the
 * matching options of a rule. `variant="card"` boxes it on an inset surface.
 *
 * @param {Parameters<typeof import("../index").Fieldset>[0]} props
 */
export function Fieldset({
  legend,
  description,
  variant = "plain",
  className,
  children,
}) {
  return (
    <fieldset
      className={cn(
        "min-w-0 space-y-3",
        variant === "card" &&
          "rounded-card border border-line bg-surface-subtle p-card-sm",
        className
      )}
    >
      <legend
        className={cn(
          "text-label text-fg",
          variant === "card" && "float-left w-full"
        )}
      >
        {legend}
      </legend>
      {description && (
        <p className="clear-left text-caption text-fg-muted">{description}</p>
      )}
      <div className="clear-left space-y-3">{children}</div>
    </fieldset>
  );
}
