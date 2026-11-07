"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useChartTheme } from "../theme/useChartTheme.js";
import { useMediaQuery } from "../utils/useMediaQuery.js";
import { ChartLegendLabel, ChartTooltip } from "./ChartTooltip.jsx";

const identity = (value) => value;
// A chart is read, not watched: a short draw, and none when the user asks
// for less motion.
const useDraw = () => {
  const still = useMediaQuery("(prefers-reduced-motion: reduce)");
  return { isAnimationActive: !still, animationDuration: 300 };
};
const percent = (value, total) =>
  `${total > 0 ? ((value / total) * 100).toFixed(1) : "0.0"}%`;

/**
 * Bars for one or more series, themed and behaving the same everywhere.
 *
 * `layout="horizontal"` draws columns along a category axis (months);
 * `layout="vertical"` draws one row per category with its value at the bar's
 * end (rankings), sized to the number of rows. `onSelect(row)` fires for a
 * click anywhere in a row's band — the strip the hover cursor highlights — so
 * a 2px bar beside a large one is as clickable as the large one.
 * `valueFormatter` formats axis ticks and bar labels (keep it short);
 * `tooltipFormatter` the tooltip value (defaults to `valueFormatter`).
 *
 * @param {Parameters<typeof import("../index").BarGraph>[0]} props
 */
export function BarGraph({
  data,
  categoryKey,
  series,
  layout = "horizontal",
  height,
  valueFormatter = identity,
  tooltipFormatter,
  categoryFormatter,
  showValues = layout === "vertical",
  categoryWidth = 130,
  onSelect,
}) {
  const { colors, grid, axis, cursor } = useChartTheme();
  const draw = useDraw();
  const rows = layout === "vertical";
  const phone = useMediaQuery("(max-width: 639px)");
  const tick = { fill: axis, fontSize: 12 };
  const valueAxis = { stroke: grid, tick, tickFormatter: valueFormatter };
  const categoryAxis = {
    dataKey: categoryKey,
    stroke: grid,
    tick,
    tickFormatter: categoryFormatter,
  };

  return (
    <ResponsiveContainer
      width="100%"
      height={height ?? (rows ? data.length * 48 + 40 : 300)}
    >
      <BarChart
        data={data}
        layout={rows ? "vertical" : "horizontal"}
        margin={rows ? { left: 10, right: 48 } : { top: 16, right: 8 }}
        className={onSelect ? "cursor-pointer" : undefined}
        onClick={
          onSelect
            ? (state) => {
                const row = state?.activePayload?.[0]?.payload;
                if (row) onSelect(row);
              }
            : undefined
        }
      >
        <CartesianGrid strokeDasharray="3 3" stroke={grid} />
        {rows ? (
          <>
            {/* Each bar carries its value, so a value axis only repeats
                them — and its last tick is cut off on a phone. */}
            <XAxis type="number" {...valueAxis} hide={showValues} />
            <YAxis
              type="category"
              {...categoryAxis}
              width={phone ? Math.min(categoryWidth, 100) : categoryWidth}
            />
          </>
        ) : (
          <>
            <XAxis type="category" {...categoryAxis} />
            <YAxis type="number" {...valueAxis} />
          </>
        )}
        <Tooltip
          cursor={{ fill: cursor }}
          content={
            <ChartTooltip
              formatter={tooltipFormatter ?? valueFormatter}
              labelFormatter={categoryFormatter}
            />
          }
        />
        {series.length > 1 && (
          <Legend
            formatter={(value) => <ChartLegendLabel>{value}</ChartLegendLabel>}
          />
        )}
        {series.map((item, index) => (
          <Bar
            key={item.key}
            dataKey={item.key}
            name={item.label}
            fill={colors[(item.colorIndex ?? index) % colors.length]}
            radius={rows ? [0, 6, 6, 0] : [6, 6, 0, 0]}
            {...draw}
            label={
              showValues
                ? {
                    position: rows ? "right" : "top",
                    fill: axis,
                    fontSize: 11,
                    formatter: valueFormatter,
                  }
                : undefined
            }
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

/**
 * A donut of parts of a whole: share labels on slices of 5% or more, a
 * legend, and a tooltip with the value and its share. `onSelect(row)` fires
 * for a slice or its legend entry.
 *
 * @param {Parameters<typeof import("../index").DonutGraph>[0]} props
 */
export function DonutGraph({
  data,
  nameKey = "name",
  valueKey = "value",
  height = 320,
  valueFormatter = identity,
  legendFormatter = identity,
  onSelect,
}) {
  const { colors } = useChartTheme();
  const draw = useDraw();
  const total = data.reduce((sum, row) => sum + Number(row[valueKey]), 0);
  const select = (name) => {
    const row = data.find((item) => item[nameKey] === name);
    if (row) onSelect(row);
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey={valueKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          // Shares of the room left after the legend, which wraps onto more
          // lines on a phone: fixed radii pushed the top label off the chart.
          innerRadius="34%"
          outerRadius="62%"
          paddingAngle={2}
          {...draw}
          labelLine={false}
          label={({ value }) =>
            total > 0 && value / total >= 0.05 ? percent(value, total) : ""
          }
          className={onSelect ? "cursor-pointer" : undefined}
          onClick={onSelect ? (slice) => select(slice[nameKey]) : undefined}
        >
          {data.map((row, index) => (
            <Cell
              key={String(row[nameKey])}
              aria-label={`${row[nameKey]}: ${percent(Number(row[valueKey]), total)}`}
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>
        <Tooltip
          content={
            <ChartTooltip
              formatter={(value) =>
                `${valueFormatter(value)} · ${percent(value, total)}`
              }
            />
          }
        />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          wrapperStyle={onSelect ? { cursor: "pointer" } : undefined}
          onClick={onSelect ? (item) => select(item.value) : undefined}
          formatter={(value) => (
            <ChartLegendLabel>{legendFormatter(value)}</ChartLegendLabel>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
