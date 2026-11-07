"use client";

import { useState } from "react";
import { cn } from "../utils/cn.js";

const sizes = {
  sm: "h-8 w-8 text-caption",
  md: "h-10 w-10 text-label",
  lg: "h-12 w-12 text-body-lg",
  xl: "h-20 w-20 text-headline",
};
const iconSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
};

const tones = {
  neutral: "bg-surface-muted text-fg-muted",
  accent: "bg-accent-subtle text-accent-fg",
  success: "bg-success-subtle text-success-fg",
  warning: "bg-warning-subtle text-warning-fg",
  error: "bg-error-subtle text-error-fg",
  info: "bg-info-subtle text-info-fg",
};

const initials = (name = "") =>
  name
    .trim()
    .split(/[\s\-_@.]+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

/**
 * A round mark for a person or a thing: photo when there is one and it
 * loads, else `icon`, `emoji`, or initials of `name`. `tone` tints it;
 * `color` (data: a category colour) washes it at 12% and colours the glyph. Without a
 * `name` it is decoration and hidden from assistive tech.
 *
 * @param {Parameters<typeof import("../index").Avatar>[0]} props
 */
export function Avatar({
  name,
  src,
  icon: Icon,
  emoji,
  tone = "neutral",
  color,
  size = "md",
  className,
}) {
  const [failed, setFailed] = useState(false);
  const classes = cn(
    "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-pill font-semibold",
    tones[tone] ?? tones.neutral,
    sizes[size] ?? sizes.md,
    className
  );

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setFailed(true)}
        className={cn(classes, "object-cover")}
      />
    );
  }
  return (
    <span
      role={name ? "img" : undefined}
      aria-label={name || undefined}
      aria-hidden={name ? undefined : true}
      className={classes}
      // A data colour, not a token: the one inline style the suite allows.
      style={color ? { backgroundColor: `${color}1f`, color } : undefined}
    >
      {Icon ? (
        <Icon aria-hidden="true" className={iconSizes[size] ?? iconSizes.md} />
      ) : (
        (emoji ?? initials(name))
      )}
    </span>
  );
}
