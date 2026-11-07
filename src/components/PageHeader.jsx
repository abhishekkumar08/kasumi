import { cn } from "../utils/cn.js";

/**
 * The top of a page: `title` (the page's one h1), `subtitle`, and actions
 * as `children` on the right. `back` (a BackLink) sits above the title on
 * detail pages; `eyebrow` is a small label above the title (the product
 * name). `size="display"` and `align="center"` make it a landing-page hero.
 * `variant="sticky"` pins it as a frosted band that content scrolls under,
 * for pages without app chrome of their own.
 *
 * On a phone the header is at most two rows: the title with `action` (the
 * page's one primary control) beside it, then `children` underneath. The
 * subtitle is hidden there unless `showSubtitleOnPhone` — on a 393px screen
 * a sentence of explanation pushes the page's content below the fold.
 *
 * @param {Parameters<typeof import("../index").PageHeader>[0]} props
 */
export function PageHeader({
  title,
  subtitle,
  eyebrow,
  back,
  size = "headline",
  align = "start",
  action,
  showSubtitleOnPhone = false,
  children,
  variant = "inline",
  showShadow = true,
  className,
}) {
  const sticky = variant === "sticky";
  const centered = align === "center";
  return (
    <header
      className={cn(
        sticky &&
          "material-overlay sticky top-0 z-sticky mb-6 border-b border-line",
        sticky && showShadow && "shadow-raised",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-wrap items-center gap-x-4 gap-y-3",
          centered ? "flex-col justify-center text-center" : "justify-between",
          sticky && "px-gutter py-4 sm:py-6 lg:px-gutter-lg"
        )}
      >
        <div className="order-1 min-w-0 flex-1">
          {back && <div className="mb-2">{back}</div>}
          {eyebrow && (
            <p className="mb-1 text-label text-fg-muted">{eyebrow}</p>
          )}
          <h1
            className={cn(
              size === "display"
                ? "text-display"
                : "text-title-lg sm:text-headline",
              // The display family is the sans one unless an app sets
              // --mw-font-display (a brand face for page titles).
              "font-display text-fg"
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={cn(
                "mt-1 text-body text-fg-muted sm:text-body-lg",
                !showSubtitleOnPhone && "hidden sm:block"
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        {action && (
          <div className="order-2 flex shrink-0 items-center gap-2 sm:order-3">
            {action}
          </div>
        )}
        {children && (
          // min-w-0 down the chain lets a wide control (a segmented
          // range picker) scroll inside its track on a phone instead of
          // pushing the page sideways.
          <div
            className={cn(
              "order-3 flex min-w-0 max-w-full flex-wrap items-center gap-3 sm:order-2 [&>*]:min-w-0 [&>*]:max-w-full",
              !centered && "w-full sm:w-auto"
            )}
          >
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
