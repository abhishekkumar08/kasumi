"use client";

import { Check, Copy, X } from "lucide-react";
import { useEffect, useState } from "react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";
import { Button } from "./Button.jsx";

const copyStates = {
  idle: { icon: Copy, label: COMPONENT_COPY.COPY_CODE },
  copied: { icon: Check, label: COMPONENT_COPY.COPIED },
  failed: { icon: X, label: COMPONENT_COPY.COPY_FAILED },
};

/**
 * A block of code with an optional language label, line numbers and a copy
 * button. Kasumi ships no highlighter: pass highlighted nodes as `children`
 * (coloured with the `text-code-*` roles) and the raw text as `code`, which
 * is what gets copied and counted for line numbers.
 *
 * @param {Parameters<typeof import("../index").CodeBlock>[0]} props
 */
export function CodeBlock({
  code,
  language,
  lineNumbers = false,
  copyable = true,
  children,
  className,
}) {
  const [copyState, setCopyState] = useState("idle");

  useEffect(() => {
    if (copyState === "idle") return undefined;
    const timer = setTimeout(() => setCopyState("idle"), 2000);
    return () => clearTimeout(timer);
  }, [copyState]);

  // Promise.resolve first: on an insecure origin navigator.clipboard is
  // undefined and the call throws instead of rejecting.
  const copy = () =>
    Promise.resolve()
      .then(() => navigator.clipboard.writeText(code))
      .then(
        () => setCopyState("copied"),
        () => setCopyState("failed")
      );

  const lines = code.replace(/\n$/, "").split("\n");
  const { icon: CopyIcon, label: copyLabel } = copyStates[copyState];

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-card border border-line bg-surface-subtle",
        className
      )}
    >
      {(language || copyable) && (
        <figcaption className="flex items-center justify-between gap-2 border-b border-line-muted py-1 pl-4 pr-1">
          <span className="font-mono text-caption text-fg-muted">
            {language}
          </span>
          {copyable && (
            <Button size="xs" variant="ghost" onClick={copy}>
              <CopyIcon aria-hidden="true" className="h-4 w-4" />
              {copyLabel}
            </Button>
          )}
          <span className="sr-only" aria-live="polite">
            {copyState === "idle" ? "" : copyLabel}
          </span>
        </figcaption>
      )}
      {/* Focusable so a keyboard user can scroll a long line sideways. */}
      <pre
        tabIndex={0}
        className="flex overflow-x-auto p-4 font-mono text-body text-fg focus-ring"
      >
        {lineNumbers && (
          <span
            aria-hidden="true"
            className="select-none pr-4 text-right tabular-nums text-fg-muted"
          >
            {lines.map((_, i) => (
              <span key={i} className="block">
                {i + 1}
              </span>
            ))}
          </span>
        )}
        <code className="min-w-0 flex-1">{children ?? code}</code>
      </pre>
    </figure>
  );
}
