import { useId } from "react";
import { cn } from "../utils/cn.js";

const VALUE_KEYS = new Set(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"]);

/**
 * A value picked by dragging along a track: opacity, size, roughness. The
 * current value shows beside the label (`format` shapes it, e.g. "40%").
 * Arrow keys step, Page Up/Down jump, Home/End go to the ends (native range).
 *
 * `variant="media"` is the compact bar of a player (seek, volume): no visible
 * label (it becomes the accessible name), a thin track that takes the accent
 * and shows its thumb on hover or focus, and `onCommit` once the pointer or
 * key is released.
 *
 * @param {Parameters<typeof import("../index").Slider>[0]} props
 */
export function Slider({
  label,
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  onCommit,
  format,
  valueText,
  variant = "field",
  disabled,
  className,
}) {
  const id = useId();
  if (variant === "media") {
    const pct = Math.min(100, Math.max(0, ((value - min) / (max - min || 1)) * 100));
    const commit = (event) => onCommit?.(Number(event.currentTarget.value));
    return (
      <div
        className={cn(
          "group relative flex h-4 w-full items-center rounded-pill has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-focus",
          disabled && "opacity-50",
          className
        )}
      >
        <div className="relative h-1 w-full overflow-hidden rounded-pill bg-line-strong">
          <div
            className="absolute inset-y-0 left-0 rounded-pill bg-fg group-hover:bg-accent group-has-[:focus-visible]:bg-accent"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 rounded-pill bg-fg opacity-0 shadow-raised group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"
          style={{ left: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          aria-label={typeof label === "string" ? label : undefined}
          aria-valuetext={valueText}
          onChange={(event) => onChange?.(Number(event.target.value))}
          onPointerUp={commit}
          onKeyUp={(event) => VALUE_KEYS.has(event.key) && commit(event)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        />
      </div>
    );
  }
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-caption font-medium text-fg-muted">
          {label}
        </label>
        <output htmlFor={id} className="text-caption tabular-nums text-fg">
          {format ? format(value) : value}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange?.(Number(event.target.value))}
        className="h-2 w-full cursor-pointer accent-[rgb(var(--mw-accent))] disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}
