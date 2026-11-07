import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";

const statusClasses = {
  done: "border-success-line bg-success-subtle text-success-fg",
  partial: "border-warning-line bg-warning-subtle text-warning-fg",
  missed: "border-error-line bg-error-subtle text-error-fg",
  rest: "border-line-muted bg-surface-muted text-fg-subtle",
  interview: "border-accent bg-accent text-fg-on-accent",
  upcoming: "border-line bg-surface text-fg-muted",
};

/**
 * A month-style grid of days, each coloured by how it went. Weeks start on
 * Monday. Pass the days in order; the first one's weekday sets the offset.
 * Each day is announced as "date: status"; the colour is never the only cue.
 *
 * @param {Parameters<typeof import("../index").Calendar>[0]} props
 */
export function Calendar({
  days,
  today,
  label = COMPONENT_COPY.CALENDAR,
  weekdays = COMPONENT_COPY.WEEKDAYS,
  statusLabels = COMPONENT_COPY.DAY_STATUS,
  todayLabel = COMPONENT_COPY.TODAY,
  className,
}) {
  const first = days[0] ? new Date(`${days[0].date}T00:00:00`) : null;
  const lead = first ? (first.getDay() + 6) % 7 : 0;
  return (
    <div className={cn("grid w-full max-w-md grid-cols-7 gap-1", className)}>
      {weekdays.map((day, i) => (
        <span key={i} aria-hidden="true" className="py-1 text-center text-caption text-fg-subtle">
          {day}
        </span>
      ))}
      <ol aria-label={label} className="col-span-7 grid grid-cols-7 gap-1">
        {Array.from({ length: lead }, (_, i) => (
          <li key={`lead-${i}`} aria-hidden="true" />
        ))}
        {days.map((day) => {
          const isToday = day.date === today;
          const status = statusLabels[day.status] ?? day.status;
          const name = [day.date, status, isToday && todayLabel, day.label].filter(Boolean).join(", ");
          return (
            <li
              key={day.date}
              aria-label={name}
              title={name}
              className={cn(
                "flex aspect-square min-h-8 items-center justify-center rounded-control border text-label tabular-nums",
                statusClasses[day.status] ?? statusClasses.upcoming,
                isToday && "ring-2 ring-focus ring-offset-2 ring-offset-canvas"
              )}
            >
              {Number(day.date.slice(8))}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
