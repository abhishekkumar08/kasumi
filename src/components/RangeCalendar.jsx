import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";
import { IconButton } from "./IconButton.jsx";

const DAY_MS = 86_400_000;
const toTime = (iso) => Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10));
const toIso = (t) => new Date(t).toISOString().slice(0, 10);
const shift = (iso, days) => toIso(toTime(iso) + days * DAY_MS);
const monthStart = (iso) => `${iso.slice(0, 7)}-01`;
const addMonths = (iso, n) => {
  const d = new Date(toTime(monthStart(iso)));
  d.setUTCMonth(d.getUTCMonth() + n);
  return toIso(d.getTime());
};
const localToday = () => {
  const d = new Date();
  return toIso(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
};

function monthDays(first) {
  const days = [];
  for (let d = first; d.slice(0, 7) === first.slice(0, 7); d = shift(d, 1)) days.push(d);
  return days;
}

/**
 * A month-grid picker for a start and end date ("check-in" to "check-out",
 * "from" to "to"). Values are "YYYY-MM-DD" strings.
 *
 * `getDayState(date)` lets the caller describe each day: "available",
 * "disabled", "end_only" (can close a range but not open one) or "no_end"
 * (free, but no valid end follows). `isValidEnd(start, date)` decides which
 * days can close a range once a start is picked. Days before `minDate` are
 * disabled. Arrow keys move between days, Enter or Space picks.
 *
 * @param {Parameters<typeof import("../index").RangeCalendar>[0]} props
 */
export function RangeCalendar({
  start = null,
  end = null,
  onChange,
  months = 2,
  month,
  onMonthChange,
  minDate = localToday(),
  getDayState = () => "available",
  isValidEnd = (s, d) => d > s,
  weekStartsOn = 0,
  locale,
  label = COMPONENT_COPY.RANGE_CALENDAR,
  stateLabels = COMPONENT_COPY.RANGE_DAY_STATE,
  className,
}) {
  const [ownMonth, setOwnMonth] = useState(() => monthStart(start ?? minDate));
  const first = month ? monthStart(month) : ownMonth;
  const setMonth = (iso) => (onMonthChange ? onMonthChange(iso) : setOwnMonth(iso));
  const [focused, setFocused] = useState(null);
  const grid = useRef(null);

  const fmt = useMemo(
    () => ({
      month: new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }),
      weekday: new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }),
      long: new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
    }),
    [locale]
  );
  const weekdays = Array.from({ length: 7 }, (_, i) => fmt.weekday.format(new Date(Date.UTC(2023, 0, 1 + ((i + weekStartsOn) % 7)))));
  const pickingEnd = start && !end;

  function info(date) {
    const state = date < minDate ? "disabled" : getDayState(date);
    const canStart = state === "available";
    const canEnd = pickingEnd && date > start && isValidEnd(start, date);
    const enabled = pickingEnd ? canEnd || canStart : canStart;
    return { state, canStart, canEnd, enabled };
  }

  function pick(date) {
    const d = info(date);
    if (d.canEnd) onChange?.({ start, end: date });
    else if (d.canStart) onChange?.({ start: date, end: null });
  }

  function move(date, days) {
    const next = shift(date, days);
    if (next < monthStart(first)) setMonth(addMonths(first, -1));
    if (next >= addMonths(first, months)) setMonth(addMonths(first, 1));
    setFocused(next);
    requestAnimationFrame(() => grid.current?.querySelector(`[data-date="${next}"]`)?.focus());
  }

  function onKeyDown(event, date) {
    const keys = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (keys[event.key]) {
      event.preventDefault();
      move(date, keys[event.key]);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      pick(date);
    }
  }

  const visible = Array.from({ length: months }, (_, i) => addMonths(first, i));
  const tabbable = focused && focused >= visible[0] && focused < addMonths(first, months) ? focused : start && start >= visible[0] ? start : null;

  return (
    <div ref={grid} role="group" aria-label={label} className={cn("w-full", className)}>
      <div className="mb-2 flex items-center justify-between">
        <IconButton icon={ChevronLeft} label={COMPONENT_COPY.PREVIOUS_MONTH} size="sm" disabled={first <= monthStart(minDate)} onClick={() => setMonth(addMonths(first, -1))} />
        <IconButton icon={ChevronRight} label={COMPONENT_COPY.NEXT_MONTH} size="sm" onClick={() => setMonth(addMonths(first, 1))} />
      </div>
      <div className={cn("grid gap-8", months > 1 && "sm:grid-cols-2")}>
        {visible.map((m, mi) => {
          const days = monthDays(m);
          const lead = (new Date(toTime(m)).getUTCDay() - weekStartsOn + 7) % 7;
          return (
            <section key={m} className={cn(mi > 0 && "hidden sm:block")}>
              <h3 className="mb-3 text-center text-label text-fg">{fmt.month.format(new Date(toTime(m)))}</h3>
              <div className="grid grid-cols-7 text-center text-caption text-fg-subtle" aria-hidden="true">
                {weekdays.map((w, i) => (
                  <span key={i} className="py-1">
                    {w}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-1">
                {Array.from({ length: lead }, (_, i) => (
                  <span key={`lead-${i}`} />
                ))}
                {days.map((date) => {
                  const d = info(date);
                  const isStart = date === start;
                  const isEnd = date === end;
                  const inRange = start && end && date > start && date < end;
                  const stateText = isStart ? stateLabels.start : isEnd ? stateLabels.end : inRange ? stateLabels.inRange : d.state === "end_only" || d.state === "no_end" || d.enabled ? stateLabels[d.state] ?? stateLabels.available : stateLabels.disabled;
                  const firstTabbable = tabbable ? date === tabbable : d.enabled && !days.slice(0, days.indexOf(date)).some((x) => info(x).enabled) && mi === 0;
                  return (
                    <div key={date} className={cn("flex justify-center", inRange && "bg-accent-subtle", isStart && end && "rounded-l-pill bg-accent-subtle", isEnd && "rounded-r-pill bg-accent-subtle")}>
                      <button
                        type="button"
                        data-date={date}
                        tabIndex={firstTabbable ? 0 : -1}
                        aria-pressed={isStart || isEnd}
                        aria-disabled={!d.enabled}
                        aria-label={`${fmt.long.format(new Date(toTime(date)))}. ${stateText}`}
                        onClick={() => d.enabled && pick(date)}
                        onKeyDown={(e) => onKeyDown(e, date)}
                        onFocus={() => setFocused(date)}
                        className={cn(
                          "h-10 w-10 rounded-pill text-label tabular-nums transition-colors duration-fast focus-ring",
                          d.enabled ? "text-fg hover:ring-1 hover:ring-fg" : "cursor-default text-fg-subtle line-through decoration-fg-subtle",
                          (isStart || isEnd) && "bg-accent text-fg-on-accent no-underline hover:ring-0"
                        )}
                      >
                        {Number(date.slice(8))}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
