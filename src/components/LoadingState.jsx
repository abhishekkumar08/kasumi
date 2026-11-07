import { cn } from "../utils/cn.js";
import { Spinner } from "./Spinner.jsx";

/**
 * Something is loading and the wait is worth explaining: a spinner, a
 * `title`, an optional `description` and the `steps` being worked through
 * (parsing a statement, say). Announced politely. Use LoadingPage when a
 * skeleton of the page says it better.
 *
 * @param {Parameters<typeof import("../index").LoadingState>[0]} props
 */
export function LoadingState({ title, description, steps, className }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-section text-center animate-enter",
        className
      )}
    >
      <Spinner size="lg" />
      <p className="text-body-lg font-semibold text-fg">{title}</p>
      {description && (
        <p className="max-w-md text-body text-fg-muted">{description}</p>
      )}
      {steps?.length > 0 && (
        <ul className="space-y-1 text-body text-fg-muted">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
