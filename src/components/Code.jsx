import { cn } from "../utils/cn.js";

/**
 * Code inside a sentence: a name, a command, a value. 0.85em so it matches
 * the size of whatever text it sits in.
 *
 * @param {Parameters<typeof import("../index").Code>[0]} props
 */
export function Code({ children, className }) {
  return (
    <code
      className={cn(
        "rounded-[0.25rem] border border-line-muted bg-surface-muted px-1 py-0.5 font-mono text-[0.85em] text-fg",
        className
      )}
    >
      {children}
    </code>
  );
}

/**
 * A key to press: `<Kbd>⌘</Kbd><Kbd>K</Kbd>`.
 *
 * @param {Parameters<typeof import("../index").Kbd>[0]} props
 */
export function Kbd({ children, className }) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-[0.25rem] border border-line-strong bg-surface px-1 font-mono text-caption text-fg-muted shadow-control",
        className
      )}
    >
      {children}
    </kbd>
  );
}
