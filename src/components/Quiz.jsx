"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";
import { CodeBlock } from "./CodeBlock.jsx";

const stateClasses = {
  idle: "border-line bg-surface text-fg hover:border-line-strong hover:bg-surface-subtle",
  selected: "border-accent bg-accent-subtle text-fg",
  correct: "border-success-line bg-success-subtle text-success-fg",
  wrong: "border-error-line bg-error-subtle text-error-fg",
  dim: "border-line-muted bg-surface text-fg-subtle",
};

/**
 * One answer to a multiple-choice question: a letter, the answer, and once
 * answered a ✓ or ✗ (so colour is never the only cue).
 *
 * @param {Parameters<typeof import("../index").QuizOption>[0]} props
 */
export function QuizOption({ index, state = "idle", children, className, ...props }) {
  const Mark = state === "correct" ? Check : state === "wrong" ? X : null;
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-start gap-3 rounded-control border px-3 py-2.5 text-left text-body transition-colors duration-fast focus-ring disabled:cursor-default",
        stateClasses[state] ?? stateClasses.idle,
        className
      )}
      {...props}
    >
      <span aria-hidden="true" className="mt-px w-4 shrink-0 font-mono text-label opacity-80">
        {String.fromCharCode(65 + index)}
      </span>
      <span className="min-w-0 flex-1">{children}</span>
      {Mark && <Mark aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />}
    </button>
  );
}

/**
 * A question with its options. Answer once: the pick is locked, the right
 * answer shows, and the explanation follows. `onAnswer` gets whether it was
 * right.
 *
 * @param {Parameters<typeof import("../index").QuizQuestion>[0]} props
 */
export function QuizQuestion({
  meta,
  prompt,
  code,
  options,
  answerIndex,
  explanation,
  onAnswer,
  correctLabel = COMPONENT_COPY.QUIZ_CORRECT,
  wrongLabel = COMPONENT_COPY.QUIZ_WRONG,
  answersLabel = COMPONENT_COPY.QUIZ_ANSWERS,
  className,
}) {
  const [picked, setPicked] = useState(/** @type {number | null} */ (null));
  const answered = picked !== null;
  /** @param {number} i @returns {"idle" | "correct" | "wrong" | "dim"} */
  const stateOf = (i) => (!answered ? "idle" : i === answerIndex ? "correct" : i === picked ? "wrong" : "dim");

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {meta && <p className="text-caption text-fg-muted">{meta}</p>}
      <p className="text-body-lg text-fg">{prompt}</p>
      {code && <CodeBlock code={code} copyable={false} />}
      <div role="group" aria-label={answersLabel} className="flex flex-col gap-2">
        {options.map((option, i) => (
          <QuizOption
            key={i}
            index={i}
            state={stateOf(i)}
            disabled={answered}
            onClick={() => {
              setPicked(i);
              onAnswer?.(i === answerIndex);
            }}
          >
            {option}
          </QuizOption>
        ))}
      </div>
      {answered && (
        <p role="status" className="text-body text-fg-muted">
          <strong className={picked === answerIndex ? "text-success-fg" : "text-error-fg"}>
            {picked === answerIndex ? correctLabel : wrongLabel}
          </strong>{" "}
          {explanation}
        </p>
      )}
    </div>
  );
}
