"use client";

import { cloneElement, useId, useState } from "react";
import { cn } from "../utils/cn.js";

const sides = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
};

/**
 * Short supplementary text. Opens on hover and keyboard focus, closes on Esc
 * (WCAG 1.4.13). Never put the only copy of important information here.
 *
 * @param {Parameters<typeof import("../index").Tooltip>[0]} props
 */
export function Tooltip({ content, side = "top", children }) {
  const id = useId();
  // Visibility is CSS (hover / focus-within) so it can't drift from the real
  // focus state; React only remembers an Esc dismissal until the pointer or
  // focus leaves.
  const [dismissed, setDismissed] = useState(false);
  const reset = () => setDismissed(false);

  return (
    <span
      className="group relative inline-flex"
      onMouseLeave={reset}
      onBlur={reset}
      onKeyDown={(event) => event.key === "Escape" && setDismissed(true)}
    >
      {cloneElement(children, { "aria-describedby": id })}
      <span
        role="tooltip"
        id={id}
        className={cn(
          "pointer-events-none absolute z-dropdown whitespace-nowrap rounded-control bg-surface-inverse px-2 py-1 backdrop-overlay text-caption text-fg-inverse shadow-overlay",
          "opacity-0 transition-opacity duration-fast",
          !dismissed &&
            "group-focus-within:opacity-100 group-hover:opacity-100",
          sides[side] ?? sides.top
        )}
      >
        {content}
      </span>
    </span>
  );
}
