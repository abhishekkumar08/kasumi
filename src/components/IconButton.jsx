import { forwardRef } from "react";
import { cn } from "../utils/cn.js";
import { buttonClasses } from "./classes.js";
import { Spinner } from "./Spinner.jsx";

const sizes = {
  xs: "h-8 w-8",
  sm: "h-9 w-9",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};
const iconSizes = {
  xs: "h-4 w-4",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

/**
 * A button that is only an icon. `label` is required — it is the accessible
 * name. Pass `pressed` (true/false) to make it a toggle: it announces
 * aria-pressed and shows the on state, so the label stays the same ("Bold"),
 * never "Bold on" / "Bold off".
 */
/** @type {typeof import("../index").IconButton} */
export const IconButton = forwardRef(function IconButton(
  {
    icon: Icon,
    label,
    variant = "ghost",
    size = "md",
    pressed,
    loading = false,
    disabled,
    className,
    type = "button",
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      aria-pressed={pressed}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      title={label}
      className={cn(
        buttonClasses({ variant, size: "icon" }),
        sizes[size] ?? sizes.md,
        pressed && "bg-accent-subtle text-fg hover:bg-accent-subtle",
        className
      )}
      {...props}
    >
      {loading ? (
        <Spinner size="sm" className="text-current" />
      ) : (
        <Icon aria-hidden="true" className={iconSizes[size] ?? iconSizes.md} />
      )}
    </button>
  );
});
