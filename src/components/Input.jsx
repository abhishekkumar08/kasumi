import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../utils/cn.js";
import { fieldClasses } from "./classes.js";
import { FormField } from "./FormField.jsx";

// Fixed heights to line up with Button sizes in toolbars and filter rows. The
// default (no fieldSize) keeps the roomier form height. Textareas grow.
const fieldSizes = { sm: "h-8 px-3 py-0", md: "h-10 py-0" };

function makeField(Tag, extra = "") {
  // Typed at each export below; the shared body takes the union of their props.
  return forwardRef(
    /** @param {any} props */ function Field(
      {
        id,
        label,
        error,
        warning,
        hint,
        required,
        className,
        containerClassName,
        leading,
        trailing,
        fieldSize,
        children,
        ...props
      },
      ref
    ) {
      return (
        <FormField
          id={id}
          label={label}
          hint={hint}
          error={error}
          warning={warning}
          required={required}
          className={containerClassName}
        >
          {(fieldProps) => {
            // A select draws Kasumi's chevron, not the browser's: the native
            // arrow sits wherever each browser and size puts it.
            const end =
              trailing ??
              (Tag === "select" ? (
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none"
                />
              ) : null);
            const control = (
              <Tag
                ref={ref}
                className={cn(
                  fieldClasses(Boolean(error), Boolean(warning)),
                  extra,
                  Tag !== "textarea" && fieldSizes[fieldSize],
                  leading && "pl-10",
                  end && "pr-10",
                  className
                )}
                {...fieldProps}
                {...props}
              >
                {children}
              </Tag>
            );
            if (!leading && !end) return control;
            // Leading is decoration (an icon, "₹") and lets clicks through to
            // the field; trailing may be a control, such as a clear button.
            return (
              <div className="relative">
                {leading && (
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex w-10 items-center justify-center text-fg-muted [&_svg]:h-4 [&_svg]:w-4">
                    {leading}
                  </span>
                )}
                {control}
                {end && (
                  <span
                    className={cn(
                      "absolute inset-y-0 right-0 flex w-10 items-center justify-center text-fg-muted [&_svg]:h-4 [&_svg]:w-4",
                      !trailing && "pointer-events-none"
                    )}
                  >
                    {end}
                  </span>
                )}
              </div>
            );
          }}
        </FormField>
      );
    }
  );
}

/** @type {typeof import("../index").Input} */
export const Input = makeField("input");
/** @type {typeof import("../index").Select} */
export const Select = makeField("select", "appearance-none");
/** @type {typeof import("../index").Textarea} */
export const Textarea = makeField("textarea", "resize-y");
