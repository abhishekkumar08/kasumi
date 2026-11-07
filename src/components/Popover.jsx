"use client";

import {
  cloneElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cn } from "../utils/cn.js";

/**
 * A panel anchored under its trigger: closes on Escape (focus returns to the
 * trigger) and on a press outside. `trigger` is one element; it gets
 * aria-expanded/aria-controls and toggles the panel on click unless
 * `toggleOnClick` is false (an input that opens on focus, say). Controlled
 * with `open` + `onOpenChange`, or uncontrolled. A text input as trigger
 * needs `role="combobox"`: aria-expanded isn't allowed on a plain textbox.
 * `align` is a preference: a panel that would run off that side of the
 * viewport opens from the other edge of the trigger instead, if it fits there.
 *
 * @param {Parameters<typeof import("../index").Popover>[0]} props
 */
export function Popover({
  trigger,
  children,
  open: controlledOpen,
  onOpenChange,
  toggleOnClick = true,
  align = "start",
  popupRole = "dialog",
  label,
  className,
  panelClassName,
  side: placement = "bottom",
}) {
  const panelId = useId();
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;

  // The listeners below outlive renders; reading through a ref keeps them on
  // the latest handler without re-subscribing every render.
  const setOpenRef = useRef(null);
  setOpenRef.current = (next) => {
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpenRef.current(false);
    };
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setOpenRef.current(false);
      rootRef.current?.querySelector(`[aria-controls="${panelId}"]`)?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, panelId]);

  useLayoutEffect(() => {
    if (!open) {
      setFlipped(false);
      return;
    }
    const panel = panelRef.current?.getBoundingClientRect();
    const root = rootRef.current?.getBoundingClientRect();
    if (!panel || !root) return;
    const viewport = document.documentElement.clientWidth;
    setFlipped(
      align === "end"
        ? panel.left < 0 && root.left + panel.width <= viewport
        : panel.right > viewport && root.right - panel.width >= 0
    );
  }, [open, align]);

  const side = flipped ? (align === "end" ? "start" : "end") : align;

  const anchor = cloneElement(trigger, {
    "aria-expanded": open,
    "aria-controls": panelId,
    "aria-haspopup": popupRole,
    onClick: (event) => {
      trigger.props.onClick?.(event);
      if (toggleOnClick) setOpenRef.current(!open);
    },
  });

  return (
    <div ref={rootRef} className={cn("relative inline-block", className)}>
      {anchor}
      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role={popupRole}
          aria-label={label}
          className={cn(
            // Capped to the viewport below the trigger: a long menu (every link
            // folded into a phone nav) scrolls instead of running off screen.
            "material-overlay absolute z-dropdown max-h-[calc(100dvh-6rem)]",
            placement === "top" ? "bottom-full mb-2" : "top-full mt-2",
            " min-w-48 overflow-y-auto overscroll-contain rounded-card border border-line p-1 text-fg shadow-overlay animate-enter",
            side === "end" ? "right-0" : "left-0",
            panelClassName
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
