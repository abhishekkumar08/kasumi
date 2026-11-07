"use client";

import { useRef } from "react";
import { cn } from "../utils/cn.js";
import { segmentClasses, segmentTrackClasses } from "./classes.js";

/**
 * Pick one of a few options that change what's shown (a view, a range).
 * WAI-ARIA radio group: one tab stop, arrow keys move and select. For a
 * choice submitted with a form, use `RadioGroup`; for panels, `Tabs`.
 *
 * @param {Parameters<typeof import("../index").SegmentedControl>[0]} props
 */
export function SegmentedControl({ label, options, value, onChange, className }) {
  const refs = useRef({});
  const enabled = options.filter((option) => !option.disabled);
  // A value matching no option (a custom range) leaves the first one tabbable.
  const tabbable = enabled.some((o) => o.value === value)
    ? value
    : enabled[0]?.value;

  const onKeyDown = (event) => {
    const index = enabled.findIndex((o) => o.value === tabbable);
    const moves = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: enabled.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = enabled[(moves[event.key] + enabled.length) % enabled.length];
    onChange?.(next.value);
    refs.current[next.value]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cn(segmentTrackClasses, className)}
    >
      {options.map(({ value: optionValue, label: text, icon: Icon, disabled }) => {
        const selected = optionValue === value;
        return (
          <button
            key={optionValue}
            ref={(node) => {
              refs.current[optionValue] = node;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={optionValue === tabbable ? 0 : -1}
            disabled={disabled}
            onClick={() => onChange?.(optionValue)}
            className={segmentClasses(selected)}
          >
            {Icon && <Icon aria-hidden="true" />}
            {text}
          </button>
        );
      })}
    </div>
  );
}
