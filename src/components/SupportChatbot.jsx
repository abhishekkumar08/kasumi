"use client";

import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Send, X } from "lucide-react";
import { SUPPORT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";
import { Alert } from "./Alert.jsx";
import { Button } from "./Button.jsx";
import { IconButton } from "./IconButton.jsx";
import { Select, Textarea } from "./Input.jsx";

const ACCESS_TOKEN_KEY = "ya_access_token";
const MAX_ATTACHMENT_BYTES = 1_500_000;

function resolveApiBaseUrl() {
  if (typeof window === "undefined") return "";
  const configuredApi = import.meta.env.VITE_API_BASE_URL;
  if (configuredApi) return configuredApi.replace(/\/$/, "");

  const { protocol, hostname, port, origin } = window.location;
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    if (port === "8080") return origin;
    return `${protocol}//${hostname}:3005`;
  }
  return origin;
}

function buildTicketTitle(appName, category, message) {
  const normalized = message.trim().replace(/\s+/g, " ");
  const preview =
    normalized.length > 80 ? `${normalized.slice(0, 77)}...` : normalized;
  return `[${appName}] ${category}: ${preview}`;
}

function SupportBotIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <rect x="10" y="14" width="28" height="24" rx="10" fill="currentColor" />
      <path
        d="M24 14V8M19 8h10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect x="16" y="22" width="6" height="6" rx="3" fill="white" />
      <rect x="26" y="22" width="6" height="6" rx="3" fill="white" />
      <path
        d="M18 32c3.5 3 8.5 3 12 0"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M8 25H5M43 25h-3"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="24" cy="8" r="3" fill="currentColor" />
    </svg>
  );
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("Read failed"));
    reader.readAsDataURL(file);
  });
}

/** @param {Parameters<typeof import("../index").SupportChatbot>[0]} props */
export function SupportChatbot({
  appName = "MoneyWise",
  currentUser = null,
  open: controlledOpen,
  onOpenChange,
  className,
}) {
  const [ownOpen, setOwnOpen] = useState(false);
  const open = controlledOpen ?? ownOpen;
  const setOpen = (next) => {
    const value = typeof next === "function" ? next(open) : next;
    if (onOpenChange) onOpenChange(value);
    else setOwnOpen(value);
  };
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("P2");
  const [category, setCategory] = useState("Feedback");
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState("");
  const [pasteError, setPasteError] = useState("");

  const apiBaseUrl = useMemo(resolveApiBaseUrl, []);
  const canSubmit = message.trim().length >= 8 && status !== "submitting";
  const portalTarget =
    typeof document !== "undefined" ? document.body : undefined;

  async function submitFeedback(event) {
    event.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setResult("");

    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem(ACCESS_TOKEN_KEY)
          : null;
      const response = await fetch(
        `${apiBaseUrl}/api/company-os/support-tickets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            title: buildTicketTitle(appName, category, message),
            message,
            severity,
            category,
            app: appName,
            channel: "global-chatbot",
            pageUrl: typeof window !== "undefined" ? window.location.href : "",
            userEmail: currentUser?.email,
          }),
        }
      );
      const payload = await response.json();
      if (!response.ok || !payload.success) {
        throw new Error(payload.error?.message || "Failed to create ticket");
      }
      setResult(`Support ticket ${payload.data.id} created.`);
      setMessage("");
      setStatus("sent");
    } catch (error) {
      setResult(
        error instanceof Error ? error.message : "Failed to send feedback"
      );
      setStatus("error");
    }
  }

  async function pasteIntoMessage(event) {
    const items = Array.from(event.clipboardData?.items || []);
    const imageItem = items.find((item) => item.type.startsWith("image/"));
    if (!imageItem) return;

    event.preventDefault();
    setPasteError("");

    const file = imageItem.getAsFile();
    if (!file) return;
    if (file.size > MAX_ATTACHMENT_BYTES) {
      setPasteError("Pasted screenshot must be below 1.5 MB.");
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      const stamp = new Date().toISOString().replace(/[:.]/g, "-");
      const pastedText = [
        "",
        `[Pasted screenshot: screenshot-${stamp}.png]`,
        dataUrl,
      ].join("\n");
      setMessage((current) => `${current}${current ? "\n" : ""}${pastedText}`);
    } catch {
      setPasteError("Could not read pasted screenshot.");
    }
  }

  const widget = (
    <div
      className={cn(
        "fixed bottom-24 right-5 z-overlay flex max-w-[calc(100vw-2.5rem)] flex-col items-end lg:bottom-5",
        "[.moneywise-modal-open_&]:hidden",
        className
      )}
    >
      {open && (
        <form
          onSubmit={submitFeedback}
          className="material-overlay mb-3 w-[min(92vw,25rem)] rounded-overlay border border-line p-card shadow-modal"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-card bg-info-subtle text-info-fg">
                <SupportBotIcon className="h-8 w-8" />
              </span>
              <div>
                <p className="text-body-lg font-semibold text-fg">
                  {SUPPORT_COPY.TITLE}
                </p>
                <p className="mt-1 text-body text-fg-muted">
                  {SUPPORT_COPY.SUBTITLE}
                </p>
              </div>
            </div>
            <IconButton
              icon={X}
              label={SUPPORT_COPY.CLOSE}
              size="sm"
              onClick={() => setOpen(false)}
            />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Select
              label={SUPPORT_COPY.TYPE}
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {SUPPORT_COPY.TYPES.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </Select>
            <Select
              label={SUPPORT_COPY.SEVERITY}
              value={severity}
              onChange={(event) => setSeverity(event.target.value)}
            >
              {SUPPORT_COPY.SEVERITIES.map((level) => (
                <option key={level}>{level}</option>
              ))}
            </Select>
          </div>

          <Textarea
            containerClassName="mt-3"
            label={SUPPORT_COPY.MESSAGE}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onPaste={pasteIntoMessage}
            placeholder={SUPPORT_COPY.PLACEHOLDER}
            rows={6}
            className="resize-none"
            hint={SUPPORT_COPY.PASTE_HINT}
            error={pasteError || undefined}
          />

          {result && (
            <Alert
              tone={status === "error" ? "error" : "success"}
              className="mt-3"
            >
              {result}
            </Alert>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={!canSubmit}
            loading={status === "submitting"}
            className="mt-4 w-full"
          >
            {status !== "submitting" && (
              <Send aria-hidden="true" className="h-4 w-4" />
            )}
            {status === "submitting" ? SUPPORT_COPY.SENDING : SUPPORT_COPY.SEND}
          </Button>
        </form>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "group inline-flex h-14 min-w-14 items-center justify-center gap-3 rounded-pill bg-accent text-fg-on-accent shadow-overlay transition-all duration-base ease-standard hover:bg-accent-hover hover:px-6 focus-ring focus-visible:px-6",
          onOpenChange && "hidden lg:inline-flex"
        )}
        aria-label={open ? SUPPORT_COPY.LAUNCHER_CLOSE : SUPPORT_COPY.LAUNCHER}
        title={SUPPORT_COPY.LAUNCHER_HINT}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-info-subtle text-info-fg">
          <SupportBotIcon className="h-6 w-6" />
        </span>
        <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-body-lg font-semibold opacity-0 transition-all duration-base group-hover:max-w-40 group-hover:opacity-100 group-focus-visible:max-w-40 group-focus-visible:opacity-100 sm:inline-block">
          {SUPPORT_COPY.LAUNCHER}
        </span>
      </button>
    </div>
  );

  return portalTarget ? createPortal(widget, portalTarget) : widget;
}
