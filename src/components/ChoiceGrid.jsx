"use client";

import { useId, useRef } from "react";
import { cn } from "../utils/cn.js";

/**
 * Pick one from a grid of visual options: an emoji, an icon, a colour.
 * Radio semantics (one tab stop, arrow keys move and select). An option is
 * `{ value, label }` where `label` is the accessible name; `display` is what
 * shows (defaults to `label`); `color` renders a swatch instead.
 *
 * @param {Parameters<typeof import("../index").ChoiceGrid>[0]} props
 */
export function ChoiceGrid({ label, options, value, onChange, className }) {
  const labelId = useId();
  const refs = useRef([]);
  const index = options.findIndex((option) => option.value === value);

  const onKeyDown = (event) => {
    const moves = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next =
      (Math.max(index, 0) + moves[event.key] + options.length) % options.length;
    onChange?.(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div className={className}>
      <p id={labelId} className="mb-2 text-label text-fg">
        {label}
      </p>
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-2"
      >
        {options.map((option, i) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              ref={(node) => {
                refs.current[i] = node;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={option.label}
              title={option.label}
              tabIndex={selected || (index < 0 && i === 0) ? 0 : -1}
              onClick={() => onChange?.(option.value)}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-control border text-title transition-colors duration-fast focus-ring",
                selected
                  ? "border-accent ring-2 ring-accent"
                  : "border-line-strong hover:bg-surface-muted"
              )}
            >
              {option.color ? (
                <span
                  aria-hidden="true"
                  className="h-6 w-6 rounded-pill"
                  // The colour is the data being picked.
                  style={{ backgroundColor: option.color }}
                />
              ) : (
                <span aria-hidden="true">{option.display ?? option.label}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
