import { AlertTriangle, RefreshCw } from "lucide-react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";
import { Button } from "./Button.jsx";

/**
 * A load that failed, with a way to try again. Announced as an alert. Use it
 * in place of the content that didn't arrive; for a whole-app crash the
 * ErrorBoundary already renders its own screen.
 *
 * @param {Parameters<typeof import("../index").ErrorState>[0]} props
 */
export function ErrorState({
  title = COMPONENT_COPY.LOAD_ERROR_TITLE,
  message,
  onRetry,
  retryLabel = COMPONENT_COPY.RETRY,
  className,
}) {
  return (
    <div role="alert" className={cn("py-section text-center animate-enter", className)}>
      <div className="mb-4 flex justify-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-pill bg-error-subtle text-error-fg">
          <AlertTriangle aria-hidden="true" className="h-6 w-6" />
        </span>
      </div>
      <h3 className="mb-2 text-body-lg font-semibold text-fg">{title}</h3>
      {message && (
        <p className="mx-auto mb-6 max-w-md text-body text-fg-muted">{message}</p>
      )}
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          <RefreshCw aria-hidden="true" className="h-4 w-4" />
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
