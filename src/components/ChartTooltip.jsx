/**
 * Recharts content for <Tooltip content={<ChartTooltip />} />: overlay
 * material and token text instead of a hard-coded dark box, so it follows
 * theme and material. `formatter(value, name)` formats each row's value;
 * `labelFormatter(label)` the heading.
 *
 * @param {Parameters<typeof import("../index").ChartTooltip>[0]} props
 */
export function ChartTooltip({
  active,
  payload,
  label,
  formatter,
  labelFormatter,
}) {
  if (!active || !payload?.length) return null;
  const heading = labelFormatter ? labelFormatter(label) : label;
  return (
    <div className="material-overlay rounded-control border border-line px-3 py-2 text-caption shadow-overlay">
      {heading !== undefined && heading !== "" && (
        <p className="mb-1 font-semibold text-fg">{heading}</p>
      )}
      <ul className="space-y-0.5">
        {payload.map((entry) => (
          <li
            key={`${entry.name}-${entry.dataKey}`}
            className="flex items-center gap-2"
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-pill"
              style={{ backgroundColor: entry.color ?? entry.payload?.fill }}
            />
            <span className="text-fg-muted">{entry.name}</span>
            <span className="ml-auto pl-3 font-semibold tabular-nums text-fg">
              {formatter ? formatter(entry.value, entry.name) : entry.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * For <Legend formatter={(value) => <ChartLegendLabel>{value}</ChartLegendLabel>} />:
 * recharts colours legend text with the series colour, which fails contrast
 * for most of the palette; the swatch already carries the colour.
 */
/** @param {Parameters<typeof import("../index").ChartLegendLabel>[0]} props */
export function ChartLegendLabel({ children, color }) {
  return (
    <span className="inline-flex items-center gap-2 text-caption text-fg-muted">
      {color && (
        <span
          aria-hidden="true"
          className="h-3 w-3 shrink-0 rounded-[0.25rem]"
          // The series colour is data.
          style={{ backgroundColor: color }}
        />
      )}
      {children}
    </span>
  );
}
