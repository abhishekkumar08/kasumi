"use client";

import { useEffect, useRef, useState } from "react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";
import { Button } from "./Button.jsx";

/**
 * A button that asks "Are you sure?" in place instead of opening a dialog —
 * for small, low-stakes actions in rows (delete a draft, clear a filter set).
 * Asking moves focus to Cancel, the safe default; Escape or Cancel goes back
 * to the button. Use Modal when the consequence needs explaining.
 *
 * @param {Parameters<typeof import("../index").InlineConfirm>[0]} props
 */
export function InlineConfirm({
  children,
  onConfirm,
  question = COMPONENT_COPY.CONFIRM_QUESTION,
  confirmLabel = COMPONENT_COPY.CONFIRM,
  cancelLabel = COMPONENT_COPY.CANCEL,
  variant = "ghost",
  confirmVariant = "destructive",
  size = "sm",
  icon: Icon,
  className,
}) {
  const [asking, setAsking] = useState(false);
  const triggerRef = useRef(null);
  const cancelRef = useRef(null);
  const wasAsking = useRef(false);

  useEffect(() => {
    if (asking) cancelRef.current?.focus();
    else if (wasAsking.current) triggerRef.current?.focus();
    wasAsking.current = asking;
  }, [asking]);

  if (!asking)
    return (
      <Button
        ref={triggerRef}
        variant={variant}
        size={size}
        onClick={() => setAsking(true)}
        className={className}
      >
        {Icon && <Icon aria-hidden="true" className="h-4 w-4" />}
        {children}
      </Button>
    );

  return (
    <span
      role="group"
      aria-label={question}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        event.stopPropagation();
        setAsking(false);
      }}
      className={cn(
        "inline-flex flex-wrap items-center gap-2 animate-enter",
        className
      )}
    >
      <span className="text-label text-fg">{question}</span>
      <Button
        size={size}
        variant={confirmVariant}
        onClick={() => {
          setAsking(false);
          onConfirm();
        }}
      >
        {confirmLabel}
      </Button>
      <Button
        ref={cancelRef}
        size={size}
        variant="ghost"
        onClick={() => setAsking(false)}
      >
        {cancelLabel}
      </Button>
    </span>
  );
}
