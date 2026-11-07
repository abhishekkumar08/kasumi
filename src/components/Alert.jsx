import { cn } from "../utils/cn.js";

const tones = {
  error: "border-error-line bg-error-subtle text-error-fg",
  warning: "border-warning-line bg-warning-subtle text-warning-fg",
  success: "border-success-line bg-success-subtle text-success-fg",
  info: "border-info-line bg-info-subtle text-info-fg",
  // A note or aside in prose: present, but not a status.
  neutral: "border-line bg-surface-muted text-fg",
};

// Inline: no box, just tinted text and an icon — "Saved", "3 tests failed"
// under the thing it is about.
const inlineTones = {
  error: "text-error-fg",
  warning: "text-warning-fg",
  success: "text-success-fg",
  info: "text-info-fg",
  neutral: "text-fg-muted",
};

/**
 * Inline message attached to the thing it is about — a failed submit, a
 * blocked action. For transient page-level feedback use `notify` instead.
 * Errors interrupt (`role="alert"`); everything else waits its turn.
 *
 * `tone="neutral"` is a note. `variant="inline"` drops the box for a one-line
 * note under a field or result, inside a card or form: straight on a page
 * with decorative colour behind it, info and error text drop below 4.5:1.
 * `icon` leads either variant.
 *
 * @param {Parameters<typeof import("../index").Alert>[0]} props
 */
export function Alert({
  children,
  title,
  action,
  icon: Icon,
  tone = "error",
  variant = "banner",
  className,
  ...props
}) {
  const role = tone === "error" ? "alert" : "status";
  // A one-line message beside its action button sits level with it; a
  // titled alert reads from the top.
  const centered = Boolean(action) && !title;

  if (variant === "inline")
    return (
      <p
        role={role}
        className={cn(
          "flex items-start gap-2 text-body",
          inlineTones[tone] ?? inlineTones.error,
          className
        )}
        {...props}
      >
        {Icon && (
          <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
        )}
        <span className="min-w-0">
          {title && <span className="font-semibold">{title} </span>}
          {children}
        </span>
      </p>
    );

  return (
    <div
      role={role}
      className={cn(
        "flex gap-3 rounded-control border px-control-x py-control-y text-body animate-enter",
        centered ? "items-center" : "items-start",
        tones[tone] ?? tones.error,
        className
      )}
      {...props}
    >
      {Icon && (
        <Icon
          aria-hidden="true"
          className={cn("h-5 w-5 shrink-0", !centered && "mt-0.5")}
        />
      )}
      <div className="min-w-0 flex-1">
        {title && <p className="font-semibold">{title}</p>}
        {children}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
