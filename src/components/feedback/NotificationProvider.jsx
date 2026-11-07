"use client";

import { AlertTriangle, CheckCircle, Info, X, XCircle } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { COMPONENT_COPY } from "../../constants/componentCopy.js";
import { cn } from "../../utils/cn.js";
import { Button } from "../Button.jsx";
import { IconButton } from "../IconButton.jsx";
import { Input } from "../Input.jsx";
import { Modal } from "../Modal.jsx";
import { NotificationContext } from "./NotificationContext.js";

const tones = {
  success: {
    icon: CheckCircle,
    toast: "border-success-line text-success-fg",
    button: "success",
  },
  error: {
    icon: XCircle,
    toast: "border-error-line text-error-fg",
    button: "destructive",
  },
  warning: {
    icon: AlertTriangle,
    toast: "border-warning-line text-warning-fg",
    button: "primary",
  },
  info: {
    icon: Info,
    toast: "border-info-line text-info-fg",
    button: "primary",
  },
};

/** @param {Parameters<typeof import("../../index").NotificationProvider>[0]} props */
export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [dialog, setDialog] = useState(null);
  const dialogResolver = useRef(null);
  const stackRef = useRef(null);

  // The toast stack is a popover so it lives in the browser's top layer —
  // otherwise a toast raised from inside a <dialog> (a failed save in a
  // modal) would render behind that dialog. Re-showing moves it to the top.
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack?.showPopover) return;
    if (stack.matches(":popover-open")) stack.hidePopover();
    if (toasts.length > 0) stack.showPopover();
  }, [toasts]);

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const notify = useCallback(
    (message, variant = "info", options = {}) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setToasts((current) => [
        ...current,
        {
          id,
          message,
          variant: tones[variant] ? variant : "info",
          action: options.action ?? null,
        },
      ]);
      // A toast with an action (Undo) stays long enough to reach it.
      window.setTimeout(() => dismissToast(id), options.action ? 8000 : 4500);
    },
    [dismissToast]
  );

  const closeDialog = useCallback((result) => {
    const resolve = dialogResolver.current;
    dialogResolver.current = null;
    setDialog(null);
    resolve?.(result);
  }, []);

  const openDialog = useCallback(
    (type, options) =>
      new Promise((resolve) => {
        dialogResolver.current = resolve;
        setDialog({
          type,
          variant: "warning",
          title: COMPONENT_COPY.CONFIRM_TITLE,
          description:
            type === "confirm" ? COMPONENT_COPY.CONFIRM_DESCRIPTION : "",
          confirmText: COMPONENT_COPY.CONFIRM,
          cancelText: COMPONENT_COPY.CANCEL,
          placeholder: "",
          value: "",
          ...options,
        });
      }),
    []
  );

  const confirmAction = useCallback(
    (options = {}) => openDialog("confirm", options),
    [openDialog]
  );
  const promptAction = useCallback(
    (options = {}) => openDialog("prompt", options),
    [openDialog]
  );

  const value = useMemo(
    () => ({ notify, confirmAction, promptAction }),
    [confirmAction, notify, promptAction]
  );

  const cancel = () => closeDialog(dialog?.type === "prompt" ? null : false);
  const accept = () =>
    closeDialog(dialog?.type === "prompt" ? dialog.value.trim() : true);
  const dialogTone = tones[dialog?.variant] ?? tones.warning;

  const overlays = (
    <div
      ref={stackRef}
      // React 18's types predate the popover attribute; spread keeps the DOM
      // attribute without tripping excess-property checks.
      {...{ popover: "manual" }}
      aria-live="polite"
      className="inset-auto right-4 top-4 m-0 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3 overflow-visible border-0 bg-transparent p-0"
    >
      {toasts.map((toast) => {
        const tone = tones[toast.variant] ?? tones.info;
        const Icon = tone.icon;
        return (
          <div
            key={toast.id}
            role={toast.variant === "error" ? "alert" : "status"}
            className={cn(
              // Overlay glass, not the tinted fill: a toast floats over moving
              // content, and a 72% tint let dark content drop it to 2.8:1.
              "material-overlay flex items-start gap-3 rounded-control border px-4 py-3 shadow-overlay animate-enter",
              tone.toast
            )}
          >
            <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="min-w-0 flex-1 text-label">{toast.message}</p>
            {toast.action && (
              <Button
                size="sm"
                variant="outline"
                className="-my-1"
                onClick={() => {
                  dismissToast(toast.id);
                  toast.action.onClick();
                }}
              >
                {toast.action.label}
              </Button>
            )}
            <IconButton
              icon={X}
              label={COMPONENT_COPY.DISMISS}
              size="sm"
              className="-my-1 h-8 w-8 text-current hover:bg-fg/5"
              onClick={() => dismissToast(toast.id)}
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {typeof document === "undefined"
        ? overlays
        : createPortal(overlays, document.body)}
      <Modal
        open={Boolean(dialog)}
        onClose={cancel}
        title={dialog?.title}
        description={dialog?.description || undefined}
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={cancel}>
              {dialog?.cancelText}
            </Button>
            <Button variant={dialogTone.button} onClick={accept}>
              {dialog?.confirmText}
            </Button>
          </>
        }
      >
        {dialog?.type === "prompt" ? (
          <Input
            data-autofocus
            aria-label={dialog.title}
            value={dialog.value}
            placeholder={dialog.placeholder}
            onChange={(event) =>
              setDialog((current) => ({
                ...current,
                value: event.target.value,
              }))
            }
            onKeyDown={(event) => event.key === "Enter" && accept()}
          />
        ) : null}
      </Modal>
    </NotificationContext.Provider>
  );
}
