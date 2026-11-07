/**
 * Date-range presets and their maths, shared by DateRangeSelect and the apps
 * that query by range. Ranges are local calendar days; `from`/`to` are
 * inclusive "YYYY-MM-DD" strings, `dateRangeBounds` gives Dates with an
 * exclusive end, ready for `>= start && < end` queries.
 */

/** @type {import("../index").DateRangePreset[]} */
export const DATE_RANGE_PRESETS = [
  "all_time",
  "today",
  "yesterday",
  "last_7_days",
  "last_30_days",
  "this_month",
  "last_month",
  "this_year",
  "last_year",
];

const pad = (n) => String(n).padStart(2, "0");
export const toISODate = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const parse = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const addDays = (date, days) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

/**
 * Inclusive from/to for a value: a preset id resolves against `today`, a
 * custom range passes through, "all_time" is open ("" / "").
 *
 * @param {{ preset: string, from?: string, to?: string }} value
 * @param {Date} [today]
 * @returns {{ from: string, to: string }}
 */
export function resolveDateRange(value, today = new Date()) {
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const y = t.getFullYear();
  const m = t.getMonth();
  const range = (from, to) => ({ from: toISODate(from), to: toISODate(to) });
  switch (value?.preset) {
    case "today":
      return range(t, t);
    case "yesterday":
      return range(addDays(t, -1), addDays(t, -1));
    case "last_7_days":
      return range(addDays(t, -7), t);
    case "last_30_days":
      return range(addDays(t, -30), t);
    case "this_month":
      return range(new Date(y, m, 1), t);
    case "last_month":
      return range(new Date(y, m - 1, 1), new Date(y, m, 0));
    case "this_year":
      return range(new Date(y, 0, 1), t);
    case "last_year":
      return range(new Date(y - 1, 0, 1), new Date(y - 1, 11, 31));
    case "custom":
      return { from: value.from ?? "", to: value.to ?? "" };
    default:
      return { from: "", to: "" };
  }
}

/**
 * Query bounds for a value: `start` at local midnight of `from`, `end` at
 * midnight after `to`; null where the range is open.
 *
 * @returns {{ start: Date | null, end: Date | null }}
 */
export function dateRangeBounds(value, today = new Date()) {
  const { from, to } = resolveDateRange(value, today);
  return {
    start: from ? parse(from) : null,
    end: to ? addDays(parse(to), 1) : null,
  };
}

/** "1 Jul – 9 Jul 2026" in the reader's locale. */
export function formatDateRange(from, to, locale) {
  const format = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
  });
  const withYear = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const a = parse(from);
  const b = parse(to);
  if (from === to) return withYear.format(a);
  const head = a.getFullYear() === b.getFullYear() ? format : withYear;
  return `${head.format(a)} – ${withYear.format(b)}`;
}
