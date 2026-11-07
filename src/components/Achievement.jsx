import { Lock } from "lucide-react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";
import { Progress } from "./Progress.jsx";

/**
 * A badge tile: earned shows the accent and its description; locked is
 * muted with a lock and progress toward it ("3/10").
 *
 * @param {Parameters<typeof import("../index").AchievementBadge>[0]} props
 */
export function AchievementBadge({
  icon,
  name,
  description,
  earned = false,
  current,
  target,
  lockedLabel = COMPONENT_COPY.LOCKED,
  className,
}) {
  const showProgress = !earned && target !== undefined && current !== undefined;
  return (
    <div
      title={typeof description === "string" ? description : undefined}
      className={cn(
        "flex flex-col items-center gap-1.5 rounded-card border p-4 text-center",
        earned ? "border-accent bg-accent-subtle" : "border-line bg-surface",
        className
      )}
    >
      <span aria-hidden="true" className={cn("text-headline leading-none", !earned && "opacity-40 grayscale")}>
        {icon}
      </span>
      <span className={cn("text-label", earned ? "text-fg" : "text-fg-muted")}>{name}</span>
      {earned ? (
        <span className="text-caption text-fg-muted">{description}</span>
      ) : (
        <span className="inline-flex items-center gap-1 text-caption text-fg-muted">
          <Lock aria-hidden="true" className="h-3 w-3" />
          <span className="sr-only">{lockedLabel}: </span>
          {showProgress ? `${current}/${target}` : lockedLabel}
        </span>
      )}
      {showProgress && <Progress showValue={false} value={current} max={target} size="sm" aria-label={String(name)} className="w-full" />}
    </div>
  );
}

/**
 * Level and XP: a playing-card mark with the level, a kicker, a headline,
 * and the bar to the next level. `xpLabel` / `nextLabel` sit either side of
 * the bar ("1,240 XP", "260 to L6"). `titleAs="h1"` when it heads the page.
 *
 * @param {Parameters<typeof import("../index").LevelCard>[0]} props
 */
export function LevelCard({
  level,
  suit = "♠",
  kicker,
  title,
  titleAs: Title = "h2",
  children,
  progress,
  xpLabel,
  nextLabel,
  className,
}) {
  return (
    <section aria-label={COMPONENT_COPY.LEVEL(level)} className={cn("flex flex-col gap-6 sm:flex-row sm:items-center", className)}>
      <div
        aria-hidden="true"
        className="relative flex aspect-[5/7] w-28 shrink-0 items-center justify-center rounded-card border border-line-strong bg-surface shadow-raised"
      >
        <span className="absolute left-2 top-1.5 flex flex-col items-center font-display text-label leading-none text-fg">
          {level}
          <small className="text-caption text-accent-fg">{suit}</small>
        </span>
        <span className="font-display text-display leading-none text-fg">
          L<i className="not-italic text-accent-fg">{level}</i>
        </span>
        <span className="absolute bottom-1.5 right-2 flex rotate-180 flex-col items-center font-display text-label leading-none text-fg">
          {level}
          <small className="text-caption text-accent-fg">{suit}</small>
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {kicker && <p className="text-caption font-semibold uppercase tracking-wide text-accent-fg">{kicker}</p>}
        {title && <Title className="font-display text-headline text-fg">{title}</Title>}
        {children && <div className="text-body text-fg-muted">{children}</div>}
        <div className="flex items-center gap-3">
          {xpLabel && <span className="shrink-0 font-mono text-caption text-fg-muted">{xpLabel}</span>}
          <Progress showValue={false} value={Math.round(progress * 100)} max={100} size="sm" aria-label={COMPONENT_COPY.LEVEL(level)} className="flex-1" />
          {nextLabel && <span className="shrink-0 font-mono text-caption text-fg-muted">{nextLabel}</span>}
        </div>
      </div>
    </section>
  );
}
