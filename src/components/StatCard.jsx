import { cn } from "../utils/cn.js";
import { Card } from "./Card.jsx";
import { Stat } from "./Stat.jsx";

const bubbles = {
  neutral: "bg-surface-muted text-fg-muted",
  accent: "bg-accent-subtle text-accent-fg",
  success: "bg-success-subtle text-success-fg",
  warning: "bg-warning-subtle text-warning-fg",
  error: "bg-error-subtle text-error-fg",
  info: "bg-info-subtle text-info-fg",
};

/**
 * A headline number on its own card, with an icon tinted by `iconTone`. The
 * number itself stays `fg`; colour carries the category, not the value.
 * `delta` + `tone` work as on `Stat`; `tint` washes the whole card in a
 * status colour (a category tile: income green, spend red).
 *
 * @param {Parameters<typeof import("../index").StatCard>[0]} props
 */
export function StatCard({
  label,
  value,
  delta,
  tone,
  hint,
  icon: Icon,
  iconTone = "neutral",
  tint,
  variant = "default",
  className,
  ...props
}) {
  // Extra props (onClick, interactive, as, data-*) go to the Card, so a tile
  // can link somewhere or keep its semantics.
  return (
    <Card
      variant={variant}
      tone={tint}
      padding="md"
      // The card is the size container its value scales to (see Stat). Its
      // content starts top-left even as a button (which centres it), so
      // tiles of one row line up whatever their values say.
      className={cn(
        "flex flex-col justify-start text-left [container-type:inline-size]",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-2 sm:gap-4">
        <Stat
          label={label}
          value={value}
          delta={delta}
          tone={tone}
          hint={hint}
        />
        {Icon && (
          <span
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-control sm:h-10 sm:w-10",
              bubbles[iconTone] ?? bubbles.neutral
            )}
          >
            <Icon aria-hidden="true" className="h-5 w-5" />
          </span>
        )}
      </div>
    </Card>
  );
}
