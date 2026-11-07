"use client";

import { Calendar, Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";
import {
  DATE_RANGE_PRESETS,
  formatDateRange,
  resolveDateRange,
} from "../utils/dateRange.js";
import { Button } from "./Button.jsx";
import { DateRange } from "./DateRange.jsx";
import { Popover } from "./Popover.jsx";
import { buttonClasses } from "./classes.js";

const triggerSizes = { sm: "h-8 px-3", md: "h-10 px-3" };

const ALL_TIME = { preset: "all_time" };

/**
 * Pick a period to filter by: quick presets ("Last 30 days") or a custom
 * from–to range, in one popover. `value` is `{ preset }` or `{ preset:
 * "custom", from, to }`; `onChange` receives the same shape with `from`/`to`
 * resolved for presets too ("" for all time). Pair with `dateRangeBounds`
 * for query bounds. `presets` limits and orders the preset ids.
 *
 * @param {Parameters<typeof import("../index").DateRangeSelect>[0]} props
 */
export function DateRangeSelect({
  value: given,
  onChange,
  presets = DATE_RANGE_PRESETS,
  allowCustom = true,
  label = COMPONENT_COPY.DATE_RANGE,
  size = "md",
  locale,
  align = "start",
  className,
}) {
  // A page that hasn't decided its range yet passes null: that is all time.
  const value = given ?? ALL_TIME;
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({ from: "", to: "" });
  const selectedRef = useRef(null);

  useEffect(() => {
    if (open) selectedRef.current?.focus();
  }, [open]);

  // The custom pane starts from the current range each time it opens.
  const onOpenChange = (next) => {
    if (next)
      setDraft(
        value.preset === "custom"
          ? { from: value.from ?? "", to: value.to ?? "" }
          : resolveDateRange(value)
      );
    setOpen(next);
  };

  const current =
    value.preset === "custom" && value.from && value.to
      ? formatDateRange(value.from, value.to, locale)
      : (COMPONENT_COPY.DATE_PRESET_LABELS[value.preset] ??
        COMPONENT_COPY.DATE_PRESET_LABELS.all_time);

  const pick = (preset) => {
    setOpen(false);
    onChange?.({ preset, ...resolveDateRange({ preset }) });
  };

  const canApply = draft.from && draft.to && draft.from <= draft.to;

  return (
    <Popover
      open={open}
      onOpenChange={onOpenChange}
      align={align}
      label={label}
      className={className}
      panelClassName="w-[min(36rem,calc(100vw-2rem))] p-0"
      trigger={
        <button
          type="button"
          aria-label={`${label}: ${current}`}
          className={cn(
            buttonClasses({ variant: "outline" }),
            "w-full justify-between font-normal sm:w-60",
            triggerSizes[size] ?? triggerSizes.md
          )}
        >
          <span className="flex min-w-0 items-center gap-2">
            <Calendar
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-fg-muted"
            />
            <span className="truncate">{current}</span>
          </span>
          <ChevronDown
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-fg-muted"
          />
        </button>
      }
    >
      <div className="flex flex-col sm:flex-row">
        <ul className="flex flex-col gap-0.5 p-1 sm:w-48 sm:border-r sm:border-line">
          {presets.map((preset) => {
            const selected = value.preset === preset;
            return (
              <li key={preset}>
                <button
                  ref={selected ? selectedRef : undefined}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => pick(preset)}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-control px-3 py-2 text-left text-label transition-colors duration-fast focus-ring",
                    selected
                      ? "bg-accent-subtle text-fg"
                      : "text-fg hover:bg-surface-muted"
                  )}
                >
                  {COMPONENT_COPY.DATE_PRESET_LABELS[preset]}
                  {selected && <Check aria-hidden="true" className="h-4 w-4" />}
                </button>
              </li>
            );
          })}
        </ul>
        {allowCustom && (
          <form
            className="flex flex-1 flex-col gap-3 border-t border-line p-4 sm:border-t-0"
            onSubmit={(event) => {
              event.preventDefault();
              if (!canApply) return;
              setOpen(false);
              onChange?.({ preset: "custom", ...draft });
            }}
          >
            <DateRange
              label={COMPONENT_COPY.CUSTOM_RANGE}
              from={draft.from}
              to={draft.to}
              onChange={setDraft}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                {COMPONENT_COPY.CANCEL}
              </Button>
              <Button size="sm" type="submit" disabled={!canApply}>
                {COMPONENT_COPY.APPLY}
              </Button>
            </div>
          </form>
        )}
      </div>
    </Popover>
  );
}
