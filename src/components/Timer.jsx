import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";
import { formatClock } from "../utils/formatClock.js";
import { Button } from "./Button.jsx";
import { Progress } from "./Progress.jsx";

/**
 * A countdown's face: label, clock, elapsed bar and controls. The app owns
 * the ticking; this shows `seconds` left of `total`. `tone="success"` is a
 * break. At zero it says so (role="alert") and Start is disabled.
 * `compact` is the clock alone, as a button (a collapsed timer).
 *
 * @param {Parameters<typeof import("../index").Timer>[0]} props
 */
export function Timer({
  seconds,
  total,
  running = false,
  label,
  meta,
  tone = "accent",
  compact = false,
  onToggle,
  onReset,
  onSkip,
  onExpand,
  actions,
  startLabel = COMPONENT_COPY.START,
  pauseLabel = COMPONENT_COPY.PAUSE,
  resetLabel = COMPONENT_COPY.RESET,
  skipLabel = COMPONENT_COPY.SKIP,
  doneLabel = COMPONENT_COPY.TIME_UP,
  className,
}) {
  const done = seconds <= 0;
  const clock = formatClock(seconds);

  if (compact) {
    return (
      <button
        type="button"
        onClick={onExpand}
        className={cn(
          "inline-flex h-8 items-center rounded-pill border px-3 font-mono text-label tabular-nums focus-ring",
          tone === "success" ? "border-success-line bg-success-subtle text-success-fg" : "border-line bg-surface text-fg",
          className
        )}
      >
        {clock}
      </button>
    );
  }

  return (
    <div role="timer" aria-live="off" className={cn("flex flex-col gap-3 rounded-card border border-line bg-surface p-4 shadow-raised", className)}>
      {(label || meta || actions) && (
        <div className="flex items-center gap-2">
          {label && <span className={cn("text-label", tone === "success" ? "text-success-fg" : "text-fg")}>{label}</span>}
          {meta && <span className="text-caption text-fg-muted">{meta}</span>}
          {actions && <span className="ml-auto flex items-center gap-1">{actions}</span>}
        </div>
      )}
      <div className={cn("font-mono text-display tabular-nums leading-none", done ? "text-error-fg" : "text-fg")}>{clock}</div>
      {total ? (
        <Progress showValue={false} value={total - seconds} max={total} size="sm" tone={tone === "success" ? "success" : "accent"} aria-label={label ? String(label) : clock} />
      ) : null}
      {done && (
        <p role="alert" className="text-label text-error-fg">
          {doneLabel}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {onToggle && (
          <Button size="sm" onClick={onToggle} disabled={done && !running}>
            {running ? pauseLabel : startLabel}
          </Button>
        )}
        {onReset && (
          <Button size="sm" variant="outline" onClick={onReset}>
            {resetLabel}
          </Button>
        )}
        {onSkip && (
          <Button size="sm" variant="ghost" onClick={onSkip}>
            {skipLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
