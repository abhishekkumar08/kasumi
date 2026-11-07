"use client";

import { useId, useRef, useState } from "react";
import { cn } from "../utils/cn.js";
import { segmentClasses, segmentTrackClasses } from "./classes.js";

// Underline tabs sit inside a pane or card, where a filled track is too heavy.
const underlineTrack =
  "flex max-w-full gap-6 overflow-x-auto border-b border-line";
const underlineTab = (selected) =>
  cn(
    "-mb-px inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-1 pb-2 pt-1 text-label transition-colors duration-fast focus-ring disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:h-4 [&_svg]:w-4",
    selected
      ? "border-accent text-fg"
      : "border-transparent text-fg-muted hover:border-line-strong hover:text-fg"
  );

/**
 * WAI-ARIA tabs: one tab stop for the whole list, arrow keys and Home/End to
 * move. Controlled (`value` + `onChange`) or uncontrolled (`defaultValue`).
 * `variant="underline"` for tabs inside a pane; the default is a segmented track.
 *
 * @param {Parameters<typeof import("../index").Tabs>[0]} props
 */
export function Tabs({
  tabs,
  value,
  defaultValue,
  onChange,
  variant = "segmented",
  className,
}) {
  const baseId = useId();
  const [internal, setInternal] = useState(defaultValue ?? tabs[0]?.id);
  const active = value ?? internal;
  const refs = useRef({});

  const select = (id) => {
    if (value === undefined) setInternal(id);
    onChange?.(id);
  };

  const onKeyDown = (event) => {
    const enabled = tabs.filter((tab) => !tab.disabled);
    const index = enabled.findIndex((tab) => tab.id === active);
    const moves = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: enabled.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = enabled[(moves[event.key] + enabled.length) % enabled.length];
    select(next.id);
    refs.current[next.id]?.focus();
  };

  const current = tabs.find((tab) => tab.id === active);

  return (
    // min-w-0: inside a flex or grid parent the track must be able to shrink
    // and scroll its tabs, not widen the page on a phone.
    <div className={cn("min-w-0 max-w-full", className)}>
      <div
        role="tablist"
        onKeyDown={onKeyDown}
        className={
          variant === "underline" ? underlineTrack : segmentTrackClasses
        }
      >
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(node) => {
                refs.current[tab.id] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => select(tab.id)}
              className={
                variant === "underline"
                  ? underlineTab(selected)
                  : segmentClasses(selected)
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {current && (
        <div
          role="tabpanel"
          id={`${baseId}-panel-${current.id}`}
          aria-labelledby={`${baseId}-tab-${current.id}`}
          tabIndex={0}
          className="pt-stack focus-ring"
        >
          {current.content}
        </div>
      )}
    </div>
  );
}
