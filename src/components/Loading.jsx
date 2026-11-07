import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { Card } from "./Card.jsx";
import { Skeleton, Spinner } from "./Spinner.jsx";

/** @type {Record<string, "sm" | "md" | "lg" | "xl">} */
const legacySizes = { sm: "sm", default: "lg", lg: "xl", xl: "xl" };

/** Kept for existing callers; new code uses `Spinner`. */
/** @param {Parameters<typeof import("../index").LoadingSpinner>[0]} props */
export function LoadingSpinner({ size = "default", className }) {
  return <Spinner size={legacySizes[size] ?? "lg"} className={className} />;
}

/** @param {Parameters<typeof import("../index").LoadingOverlay>[0]} props */
export function LoadingOverlay({ message = COMPONENT_COPY.LOADING }) {
  return (
    <div className="fixed inset-0 z-overlay flex items-center justify-center bg-scrim/60 backdrop-surface">
      <div className="material-overlay flex flex-col items-center gap-4 rounded-card p-card shadow-modal">
        <Spinner size="xl" />
        {message && <p className="text-label text-fg">{message}</p>}
      </div>
    </div>
  );
}

/** @param {Parameters<typeof import("../index").LoadingCard>[0]} props */
export function LoadingCard({ className }) {
  return (
    <Card padding="md" className={className}>
      <div className="space-y-4">
        <Skeleton className="w-3/4" />
        <Skeleton className="w-1/2" />
        <Skeleton className="w-5/6" />
      </div>
    </Card>
  );
}

/** @param {Parameters<typeof import("../index").LoadingTable>[0]} props */
export function LoadingTable({ rows = 5, cols = 4 }) {
  const grid = { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` };
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-line bg-surface-subtle p-4">
        <div className="grid gap-4" style={grid}>
          {Array.from({ length: cols }, (_, i) => (
            <Skeleton key={i} className="bg-line-strong" />
          ))}
        </div>
      </div>
      <div className="divide-y divide-line">
        {Array.from({ length: rows }, (_, row) => (
          <div key={row} className="p-4">
            <div className="grid gap-4" style={grid}>
              {Array.from({ length: cols }, (_, col) => (
                <Skeleton key={col} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function LoadingPage() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-1/3" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-32 rounded-card" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-card" />
    </div>
  );
}
