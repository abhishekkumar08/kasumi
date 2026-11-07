"use client";

import { useId } from "react";
import { cn } from "../utils/cn.js";
import { ChoiceText } from "./ChoiceText.jsx";

/**
 * An on/off setting that applies immediately. For a choice submitted with a
 * form, use `Checkbox`. The wrapping label makes the text a click target too.
 *
 * @param {Parameters<typeof import("../index").Switch>[0]} props
 */
export function Switch({
  checked = false,
  onChange,
  label,
  description,
  disabled,
  className,
  ...props
}) {
  const id = useId();
  const labelId = label ? `${id}-label` : undefined;
  const descriptionId = description ? `${id}-description` : undefined;
  return (
    <label
      className={cn(
        "inline-flex items-start gap-3",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-pill transition-colors duration-base ease-standard focus-ring disabled:cursor-not-allowed",
          checked ? "bg-accent" : "bg-line-strong"
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(
            "inline-block h-5 w-5 rounded-pill bg-canvas shadow-raised transition-transform duration-base ease-standard",
            checked ? "translate-x-[1.375rem]" : "translate-x-0.5"
          )}
        />
      </button>
      <ChoiceText
        label={label}
        description={description}
        labelId={labelId}
        descriptionId={descriptionId}
      />
    </label>
  );
}
