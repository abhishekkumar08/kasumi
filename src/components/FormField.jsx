"use client";

import { useId } from "react";

/**
 * Label, hint, warning and error around one control, wired for assistive tech:
 * the control gets `id`, `aria-describedby` and `aria-invalid` through
 * `children(fieldProps)`, so every form in the suite announces errors the
 * same way. `warning` is a softer note ("couldn't read this from the
 * receipt — check it"): amber, described, but not `aria-invalid`.
 *
 * @param {Parameters<typeof import("../index").FormField>[0]} props
 */
export function FormField({
  id,
  label,
  hint,
  error,
  warning,
  required,
  className,
  children,
}) {
  const generated = useId();
  const fieldId = id || generated;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const warningId = !error && warning ? `${fieldId}-warning` : undefined;
  const describedBy =
    [errorId, warningId, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={fieldId} className="mb-1 block text-label text-fg">
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-error-fg">
              *
            </span>
          )}
        </label>
      )}
      {children({
        id: fieldId,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
        required,
      })}
      {error ? (
        <p id={errorId} className="mt-1 text-caption text-error-fg">
          {error}
        </p>
      ) : warning ? (
        <p id={warningId} className="mt-1 text-caption text-warning-fg">
          {warning}
        </p>
      ) : (
        hint && (
          <p id={hintId} className="mt-1 text-caption text-fg-muted">
            {hint}
          </p>
        )
      )}
    </div>
  );
}
