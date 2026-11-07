import { ArrowLeft, ChevronRight } from "lucide-react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";

const linkClasses =
  "rounded-control underline-offset-4 transition-colors duration-fast hover:text-fg hover:underline focus-ring";

const target = (item) => (item.href ? { href: item.href } : { to: item.to });

/**
 * Where this page sits: `items` from the root to the current page, each
 * `{ label, href }` or `{ label, to }` with `linkAs` set to a router Link. The
 * last item is the current page and is not a link.
 *
 * @param {Parameters<typeof import("../index").Breadcrumb>[0]} props
 */
export function Breadcrumb({ items, linkAs: LinkTag = "a", className }) {
  return (
    <nav aria-label={COMPONENT_COPY.BREADCRUMB} className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-label text-fg-muted">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${i}-${item.label}`} className="flex items-center gap-1">
              {last || !(item.href || item.to) ? (
                <span
                  aria-current={last ? "page" : undefined}
                  className={cn(last && "text-fg")}
                >
                  {item.label}
                </span>
              ) : (
                <LinkTag {...target(item)} className={linkClasses}>
                  {item.label}
                </LinkTag>
              )}
              {!last && (
                <ChevronRight
                  aria-hidden="true"
                  className="h-4 w-4 text-fg-subtle"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * "← Back" to a parent page. A link (`href`, or `as` + `to`), never
 * history.back(): a deep-linked visitor has no history to go back to.
 *
 * @param {Parameters<typeof import("../index").BackLink>[0]} props
 */
export function BackLink({
  children = COMPONENT_COPY.BACK,
  as: Tag = "a",
  className,
  ...props
}) {
  return (
    <Tag
      className={cn(
        "inline-flex items-center gap-1 text-label text-fg-muted",
        linkClasses,
        className
      )}
      {...props}
    >
      <ArrowLeft aria-hidden="true" className="h-4 w-4" />
      {children}
    </Tag>
  );
}
