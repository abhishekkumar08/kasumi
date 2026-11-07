import { isValidElement } from "react";
import { cn } from "../utils/cn.js";

const paddings = { sm: "py-6", md: "py-section" };
import { Button } from "./Button.jsx";

/** @param {Parameters<typeof import("../index").EmptyState>[0]} props */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  actionLabel,
  size = "md",
  titleAs: Title = "h3",
  className,
}) {
  // An icon component, or a ready node (an emoji, an Avatar).
  const node = isValidElement(Icon) || typeof Icon === "string";
  const IconComponent = /** @type {import("react").ElementType} */ (Icon);
  return (
    <div
      className={cn(
        "text-center animate-enter",
        paddings[size] ?? paddings.md,
        className
      )}
    >
      {Icon && (
        <div
          aria-hidden="true"
          className="mb-4 flex justify-center text-headline"
        >
          {/* 32px glyph, not a 64px illustration — a ledger's empty state is a
              note, not a poster. */}
          {node ? Icon : <IconComponent className="h-8 w-8 text-fg-subtle" />}
        </div>
      )}
      <Title className="mb-2 text-body-lg font-semibold text-fg">{title}</Title>
      {description && (
        <p className="mx-auto mb-6 max-w-md text-body text-fg-muted">
          {description}
        </p>
      )}
      {/* `action` is a handler (with `actionLabel`) or a ready element, such
          as a link-styled Button, when one button isn't enough. */}
      {typeof action === "function"
        ? actionLabel && <Button onClick={action}>{actionLabel}</Button>
        : action}
    </div>
  );
}
