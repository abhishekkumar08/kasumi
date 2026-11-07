"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";
import { IconButton } from "./IconButton.jsx";

const sizes = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

/**
 * A native `<dialog>` opened with `showModal()`: the browser supplies the focus
 * trap, Esc handling, top-layer stacking and focus return to the trigger —
 * the parts hand-rolled overlays usually get wrong.
 *
 * `variant="sheet"` docks it to the bottom edge on a phone and to the right
 * edge from `sm` up: a detail panel over a list that keeps its scroll.
 *
 * @param {Parameters<typeof import("../index").Modal>[0]} props
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  variant = "dialog",
  className,
}) {
  const ref = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // React's autoFocus doesn't survive showModal(), which focuses the first
      // focusable (the close button). Mark the intended field instead.
      dialog.querySelector("[data-autofocus]")?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Portalled to <body>: rendered in place, a parent's `space-y-*` or `gap`
  // margins land on the <dialog> and knock it off centre.
  const dialog = (
    <dialog
      ref={ref}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        event.preventDefault();
        onClose?.();
      }}
      onClick={(event) => {
        if (event.target === ref.current) onClose?.();
      }}
      className={cn(
        // Capped to the viewport with only the body scrolling, so a tall form
        // never pushes its footer actions below the fold.
        "material-overlay flex-col border border-line p-0 text-fg shadow-modal open:flex",
        variant === "sheet"
          ? "mb-0 mt-auto max-h-[90dvh] w-full max-w-none rounded-t-overlay pb-[env(safe-area-inset-bottom)] animate-sheet-up sm:my-0 sm:ml-auto sm:mr-0 sm:h-dvh sm:max-h-dvh sm:w-[28rem] sm:rounded-none sm:rounded-l-overlay sm:animate-sheet-left"
          : cn(
              "m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] rounded-overlay animate-enter",
              sizes[size] ?? sizes.md
            ),
        className
      )}
    >
      {open && (
        <>
          {(title || onClose) && (
            <div className="flex shrink-0 items-start justify-between gap-4 px-card pt-card">
              <div className="min-w-0">
                {title && (
                  <h2 id={titleId} className="text-title text-fg">
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id={descriptionId}
                    className="mt-1 text-body text-fg-muted"
                  >
                    {description}
                  </p>
                )}
              </div>
              {onClose && (
                <IconButton
                  icon={X}
                  label={COMPONENT_COPY.CLOSE}
                  size="sm"
                  onClick={onClose}
                />
              )}
            </div>
          )}
          <div className="min-h-0 overflow-y-auto p-card">{children}</div>
          {footer && (
            <div className="flex shrink-0 flex-wrap justify-end gap-2 border-t border-line px-card py-4">
              {footer}
            </div>
          )}
        </>
      )}
    </dialog>
  );

  return typeof document === "undefined"
    ? dialog
    : createPortal(dialog, document.body);
}
