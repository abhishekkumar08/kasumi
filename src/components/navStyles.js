import { cn } from "../utils/cn.js";

export const isActivePath = (pathname, href) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

/** One look for a navigation row, shared by the sidebar and the mobile drawer. */
export const navItemClasses = (active) =>
  cn(
    "flex min-h-10 items-center gap-3 rounded-control px-3 py-2 text-label transition-colors duration-fast focus-ring",
    active
      ? "bg-accent-subtle text-fg"
      : "text-fg-muted hover:bg-surface-muted hover:text-fg"
  );

/**
 * App chrome. Content scrolls under it, so in glass it uses the dense overlay
 * material: a card-weight tint let a white button scrolling beneath drop
 * muted nav text to 2.6:1.
 */
export const chromeClasses = "material-overlay border-line";
