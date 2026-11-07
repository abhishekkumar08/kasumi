"use client";

import { forwardRef, useEffect, useId, useRef } from "react";
import { cn } from "../utils/cn.js";
import { ChoiceText } from "./ChoiceText.jsx";

const control =
  "mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-line-strong accent-accent focus-ring disabled:cursor-not-allowed";

function ChoiceLabel({
  htmlFor,
  label,
  description,
  disabled,
  children,
  className,
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "flex items-start gap-3",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className
      )}
    >
      {children}
      <ChoiceText label={label} description={description} />
    </label>
  );
}

/** Native checkbox, so keyboard, forms and screen readers work for free. */
/** @type {typeof import("../index").Checkbox} */
export const Checkbox = forwardRef(function Checkbox(
  {
    id,
    label,
    description,
    indeterminate = false,
    disabled,
    className,
    ...props
  },
  forwardedRef
) {
  const generated = useId();
  const inputId = id || generated;
  const innerRef = useRef(null);

  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const setRef = (node) => {
    innerRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  return (
    <ChoiceLabel
      htmlFor={inputId}
      label={label}
      description={description}
      disabled={disabled}
      className={className}
    >
      <input
        ref={setRef}
        id={inputId}
        type="checkbox"
        disabled={disabled}
        className={control}
        {...props}
      />
    </ChoiceLabel>
  );
});

/** @param {Parameters<typeof import("../index").Radio>[0]} props */
export function Radio({
  id,
  label,
  description,
  disabled,
  className,
  ...props
}) {
  const generated = useId();
  const inputId = id || generated;
  return (
    <ChoiceLabel
      htmlFor={inputId}
      label={label}
      description={description}
      disabled={disabled}
      className={className}
    >
      <input
        id={inputId}
        type="radio"
        disabled={disabled}
        className={cn(control, "rounded-pill")}
        {...props}
      />
    </ChoiceLabel>
  );
}

/** One choice from a short list. Arrow keys move between options natively. */
/** @param {Parameters<typeof import("../index").RadioGroup>[0]} props */
export function RadioGroup({
  legend,
  name,
  options,
  value,
  onChange,
  orientation = "vertical",
  className,
}) {
  const generated = useId();
  const groupName = name || generated;
  return (
    <fieldset className={className}>
      {legend && <legend className="mb-2 text-label text-fg">{legend}</legend>}
      <div
        className={
          orientation === "horizontal" ? "flex flex-wrap gap-6" : "space-y-3"
        }
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            name={groupName}
            value={option.value}
            label={option.label}
            description={option.description}
            disabled={option.disabled}
            checked={value === option.value}
            onChange={() => onChange?.(option.value)}
          />
        ))}
      </div>
    </fieldset>
  );
}
