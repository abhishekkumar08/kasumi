import { forwardRef } from "react";
import { buttonClasses } from "./classes.js";
import { Spinner } from "./Spinner.jsx";

/**
 * `as` renders the button styles on another element — usually a router
 * `Link` — so navigation stays a link (right-click, new tab) while looking
 * like an action.
 */
/** @type {typeof import("../index").Button} */
export const Button = forwardRef(
  /** @param {any} props */
  function Button(
    {
      as: Component = "button",
      children,
      variant,
      size,
      className,
      disabled = false,
      loading = false,
      ...props
    },
    ref
  ) {
    const isButton = Component === "button";
    return (
      <Component
        ref={ref}
        className={buttonClasses({ variant, size, className })}
        disabled={isButton ? disabled || loading : undefined}
        aria-disabled={!isButton && disabled ? true : undefined}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && <Spinner size="sm" className="text-current" />}
        {children}
      </Component>
    );
  }
);
