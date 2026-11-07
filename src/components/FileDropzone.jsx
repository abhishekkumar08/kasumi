"use client";

import { useId, useState } from "react";
import { UploadCloud } from "lucide-react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";

// `accept` is advisory in the picker and ignored on drop, so dropped files are
// filtered against it here: extensions (".pdf") and MIME types ("image/*").
const accepts = (file, accept) =>
  !accept ||
  accept.split(",").some((rule) => {
    const r = rule.trim().toLowerCase();
    if (r.startsWith(".")) return file.name.toLowerCase().endsWith(r);
    if (r.endsWith("/*")) return file.type.startsWith(r.slice(0, -1));
    return file.type === r;
  });

/**
 * Drag-and-drop or click-to-browse file picker. The real control is a
 * visually hidden `<input type="file">`, so it is keyboard- and screen-reader
 * operable with no library. `onFiles` receives an array of accepted files;
 * `children` (a selected-file summary, a preview) render inside the zone.
 * `capture` ("environment" | "user") opens the camera on phones; with no
 * visible `label`, name the control with `aria-label`.
 *
 * @param {Parameters<typeof import("../index").FileDropzone>[0]} props
 */
export function FileDropzone({
  id,
  label,
  title,
  description,
  hint,
  error,
  accept,
  capture,
  multiple = false,
  disabled = false,
  icon: Icon = UploadCloud,
  onFiles,
  className,
  children,
  "aria-label": ariaLabel,
}) {
  const generated = useId();
  const inputId = id || generated;
  const describedBy =
    [error && `${inputId}-error`, hint && `${inputId}-hint`]
      .filter(Boolean)
      .join(" ") || undefined;
  const [dragging, setDragging] = useState(false);

  const deliver = (list) => {
    const files = Array.from(list || []).filter((f) => accepts(f, accept));
    if (files.length) onFiles?.(multiple ? files : files.slice(0, 1));
  };

  return (
    <div className={className}>
      {label && (
        <p className="mb-1 block text-label text-fg" id={`${inputId}-label`}>
          {label}
        </p>
      )}
      <label
        htmlFor={inputId}
        onDragOver={(event) => {
          if (disabled) return;
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          if (!disabled) deliver(event.dataTransfer.files);
        }}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed px-card py-section text-center transition-colors duration-fast",
          "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus",
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:border-line-strong hover:bg-surface-subtle",
          dragging
            ? "border-accent bg-accent-subtle"
            : error
              ? "border-error-emphasis"
              : "border-line bg-surface"
        )}
      >
        <input
          id={inputId}
          type="file"
          className="sr-only"
          accept={accept}
          capture={capture}
          multiple={multiple}
          disabled={disabled}
          aria-label={label ? undefined : ariaLabel}
          aria-labelledby={label ? `${inputId}-label` : undefined}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          onChange={(event) => {
            deliver(event.target.files);
            // Clearing lets the same file be chosen again after a removal.
            event.target.value = "";
          }}
        />
        <Icon aria-hidden="true" className="h-8 w-8 text-fg-muted" />
        <span className="text-label text-fg">
          {dragging
            ? COMPONENT_COPY.DROP_ACTIVE
            : (title ??
              (multiple
                ? COMPONENT_COPY.DROP_TITLE_MULTIPLE
                : COMPONENT_COPY.DROP_TITLE))}
        </span>
        {description && (
          <span className="text-caption text-fg-muted">{description}</span>
        )}
        {children}
      </label>
      {error ? (
        <p id={`${inputId}-error`} className="mt-1 text-caption text-error-fg">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${inputId}-hint`} className="mt-1 text-caption text-fg-muted">
            {hint}
          </p>
        )
      )}
    </div>
  );
}
