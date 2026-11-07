import { ChevronDown, ChevronUp } from "lucide-react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";

const arrow =
  "inline-flex h-8 w-8 items-center justify-center rounded-control transition-colors duration-fast focus-ring disabled:cursor-not-allowed disabled:opacity-50";

/**
 * Up and down around a score. Pressing the arrow already chosen takes the
 * vote back (`onVote(0)`).
 *
 * @param {Parameters<typeof import("../index").VoteBox>[0]} props
 */
export function VoteBox({
  score,
  vote = 0,
  onVote,
  busy = false,
  upLabel = COMPONENT_COPY.UPVOTE,
  downLabel = COMPONENT_COPY.DOWNVOTE,
  className,
}) {
  return (
    <div role="group" aria-label={COMPONENT_COPY.SCORE(score)} className={cn("inline-flex flex-col items-center", className)}>
      <button
        type="button"
        aria-pressed={vote === 1}
        aria-label={upLabel}
        title={upLabel}
        disabled={busy}
        onClick={() => onVote(vote === 1 ? 0 : 1)}
        className={cn(arrow, vote === 1 ? "bg-accent-subtle text-accent-fg" : "text-fg-muted hover:bg-surface-muted hover:text-fg")}
      >
        <ChevronUp aria-hidden="true" className="h-5 w-5" />
      </button>
      <span className={cn("text-label tabular-nums", vote === 0 ? "text-fg" : vote === 1 ? "text-accent-fg" : "text-error-fg")}>{score}</span>
      <button
        type="button"
        aria-pressed={vote === -1}
        aria-label={downLabel}
        title={downLabel}
        disabled={busy}
        onClick={() => onVote(vote === -1 ? 0 : -1)}
        className={cn(arrow, vote === -1 ? "bg-error-subtle text-error-fg" : "text-fg-muted hover:bg-surface-muted hover:text-fg")}
      >
        <ChevronDown aria-hidden="true" className="h-5 w-5" />
      </button>
    </div>
  );
}
