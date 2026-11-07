import { ChevronLeft, ChevronRight } from "lucide-react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";
import { buttonClasses } from "./classes.js";
import { IconButton } from "./IconButton.jsx";

const GAP = "gap";

// First, last, the current page and `siblings` either side; gaps elsewhere.
const pageList = (page, totalPages, siblings) => {
  const pages = new Set([1, totalPages]);
  for (let p = page - siblings; p <= page + siblings; p += 1)
    if (p >= 1 && p <= totalPages) pages.add(p);
  const sorted = [...pages].sort((a, b) => a - b);
  return sorted.flatMap((p, i) =>
    i > 0 && p - sorted[i - 1] > 1 ? [`${GAP}-${p}`, p] : [p]
  );
};

/**
 * Page through a long list. Renders nothing for a single page. `summary` is
 * optional text beside the controls, such as "Showing 21–40 of 312".
 *
 * @param {Parameters<typeof import("../index").Pagination>[0]} props
 */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblings = 1,
  summary,
  className,
}) {
  if (totalPages <= 1) return null;
  const go = (next) => onPageChange(Math.min(totalPages, Math.max(1, next)));

  return (
    <nav
      aria-label={COMPONENT_COPY.PAGINATION}
      className={cn(
        "flex flex-wrap items-center justify-between gap-3",
        className
      )}
    >
      {summary ? (
        <p className="text-caption text-fg-muted">{summary}</p>
      ) : (
        <span />
      )}
      <ul className="flex items-center gap-1">
        <li>
          <IconButton
            icon={ChevronLeft}
            label={COMPONENT_COPY.PREVIOUS_PAGE}
            variant="ghost"
            size="sm"
            disabled={page <= 1}
            onClick={() => go(page - 1)}
          />
        </li>
        {pageList(page, totalPages, siblings).map((item) =>
          typeof item === "string" ? (
            <li key={item} aria-hidden="true" className="px-1 text-fg-muted">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                aria-label={COMPONENT_COPY.GO_TO_PAGE(item)}
                aria-current={item === page ? "page" : undefined}
                onClick={() => go(item)}
                className={buttonClasses({
                  variant: item === page ? "secondary" : "ghost",
                  size: "sm",
                  className: "min-w-9 px-2 tabular-nums",
                })}
              >
                {item}
              </button>
            </li>
          )
        )}
        <li>
          <IconButton
            icon={ChevronRight}
            label={COMPONENT_COPY.NEXT_PAGE}
            variant="ghost"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => go(page + 1)}
          />
        </li>
      </ul>
    </nav>
  );
}
