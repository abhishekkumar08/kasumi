import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";
import { Button } from "./Button.jsx";

/**
 * The end of a growing list: "Showing 20 of 134" and a Load more button,
 * which disappears once everything is shown. Use Pagination instead when
 * people need to reach a specific page.
 *
 * @param {Parameters<typeof import("../index").LoadMore>[0]} props
 */
export function LoadMore({
  shown,
  total,
  onLoadMore,
  loading = false,
  label = COMPONENT_COPY.LOAD_MORE,
  className,
}) {
  return (
    <div className={cn("flex flex-col items-center gap-2 py-4", className)}>
      <p className="text-caption text-fg-muted" aria-live="polite">
        {COMPONENT_COPY.SHOWING(shown, total)}
      </p>
      {shown < total && (
        <Button
          variant="outline"
          size="sm"
          loading={loading}
          onClick={onLoadMore}
        >
          {label}
        </Button>
      )}
    </div>
  );
}
