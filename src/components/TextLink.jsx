import { cn } from "../utils/cn.js";

/**
 * A link inside running text. `href`, or `as` + `to` for a router Link.
 * Underlined always: colour alone can't mark a link in a sentence.
 *
 * @param {Parameters<typeof import("../index").TextLink>[0]} props
 */
export function TextLink({ as: Tag = "a", className, children, ...props }) {
  return (
    <Tag
      className={cn(
        "rounded-[0.125rem] font-medium text-fg underline underline-offset-4 transition-colors duration-fast hover:decoration-2 focus-ring",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
