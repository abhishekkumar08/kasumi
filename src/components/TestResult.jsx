import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";
import { Badge } from "./Badge.jsx";

/** @type {Record<string, "success" | "error" | "warning" | "neutral">} */
const tones = { pass: "success", fail: "error", error: "error", timeout: "warning", info: "neutral" };

/**
 * Test cases and how each went. A case with `detail` (expected vs got,
 * stderr) opens to show it; failures start open. `badge` replaces the status
 * word (a verdict code like "WA").
 *
 * @param {Parameters<typeof import("../index").TestResultList>[0]} props
 */
export function TestResultList({
  cases,
  label = COMPONENT_COPY.TEST_RESULTS,
  statusLabels = COMPONENT_COPY.TEST_STATUS,
  className,
}) {
  return (
    <ul aria-label={label} className={cn("flex flex-col gap-2", className)}>
      {cases.map((c, i) => {
        const head = (
          <>
            <span className="min-w-0 flex-1 truncate text-label text-fg-muted">{c.label}</span>
            <Badge tone={tones[c.status] ?? "neutral"} size="sm">
              {c.badge ?? statusLabels[c.status] ?? c.status}
            </Badge>
          </>
        );
        return (
          <li key={c.id ?? i} className="rounded-control border border-line bg-surface">
            {c.detail ? (
              <details open={c.status !== "pass" && c.status !== "info"} className="group">
                <summary className="flex cursor-pointer list-none items-center gap-3 px-3 py-2 focus-ring [&::-webkit-details-marker]:hidden">
                  {head}
                </summary>
                <div className="border-t border-line-muted px-3 py-2 font-mono text-caption text-fg">{c.detail}</div>
              </details>
            ) : (
              <div className="flex items-center gap-3 px-3 py-2">{head}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
