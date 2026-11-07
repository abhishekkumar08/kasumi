"use client";

import { useRef, useState } from "react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";
import { SegmentedControl } from "./SegmentedControl.jsx";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/**
 * Two panes: side by side from `lg`, with a divider to drag (or arrow-key)
 * the split; one at a time below that, behind a switch. The hidden pane stays
 * mounted, so an editor keeps its text and cursor when you flip back.
 *
 * @param {Parameters<typeof import("../index").SplitView>[0]} props
 */
export function SplitView({
  start,
  end,
  startLabel,
  endLabel,
  label = COMPONENT_COPY.SPLIT_VIEW,
  resizeLabel = COMPONENT_COPY.SPLIT_RESIZE,
  defaultSize = 50,
  minSize = 25,
  resizable = true,
  className,
}) {
  const [pane, setPane] = useState(/** @type {"start" | "end"} */ ("start"));
  const [size, setSize] = useState(defaultSize);
  const root = useRef(/** @type {HTMLDivElement | null} */ (null));
  const max = 100 - minSize;

  /** @param {import("react").PointerEvent<HTMLDivElement>} event */
  const onPointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  /** @param {import("react").PointerEvent<HTMLDivElement>} event */
  const onPointerMove = (event) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId) || !root.current) return;
    const box = root.current.getBoundingClientRect();
    setSize(clamp(((event.clientX - box.left) / box.width) * 100, minSize, max));
  };
  /** @param {import("react").KeyboardEvent<HTMLDivElement>} event */
  const onKeyDown = (event) => {
    /** @type {Record<string, (s: number) => number>} */
    const moves = {
      ArrowLeft: (s) => s - 5,
      ArrowRight: (s) => s + 5,
      Home: () => minSize,
      End: () => max,
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    setSize((s) => clamp(move(s), minSize, max));
  };

  return (
    <div
      ref={root}
      className={cn("flex h-full min-h-0 flex-col gap-3 lg:flex-row lg:gap-0", className)}
      style={/** @type {import("react").CSSProperties} */ ({ "--split": `${size}%` })}
    >
      <SegmentedControl
        label={label}
        value={pane}
        onChange={(value) => setPane(value === "end" ? "end" : "start")}
        options={[
          { value: "start", label: startLabel },
          { value: "end", label: endLabel },
        ]}
        className="self-start lg:hidden"
      />
      <div
        className={cn(
          "min-h-0 min-w-0 flex-1 lg:flex lg:flex-none lg:basis-[var(--split)] lg:flex-col",
          pane === "start" ? "flex flex-col" : "hidden"
        )}
      >
        {start}
      </div>
      {resizable && (
        <div
          role="separator"
          aria-orientation="vertical"
          aria-label={resizeLabel}
          aria-valuemin={minSize}
          aria-valuemax={max}
          aria-valuenow={Math.round(size)}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onKeyDown={onKeyDown}
          onDoubleClick={() => setSize(defaultSize)}
          className="group hidden w-3 shrink-0 cursor-col-resize touch-none items-stretch justify-center focus-ring lg:flex"
        >
          <span className="w-px bg-line transition-colors duration-fast group-hover:bg-accent group-focus-visible:bg-accent" />
        </div>
      )}
      <div
        className={cn(
          "min-h-0 min-w-0 flex-1 lg:flex lg:flex-col",
          !resizable && "lg:border-l lg:border-line",
          pane === "end" ? "flex flex-col" : "hidden"
        )}
      >
        {end}
      </div>
    </div>
  );
}
