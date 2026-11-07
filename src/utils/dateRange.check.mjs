import assert from "node:assert/strict";
import {
  dateRangeBounds,
  formatDateRange,
  resolveDateRange,
} from "./dateRange.js";

const today = new Date(2026, 6, 15);
const r = (preset) => resolveDateRange({ preset }, today);
assert.deepEqual(r("all_time"), { from: "", to: "" });
assert.deepEqual(r("today"), { from: "2026-07-15", to: "2026-07-15" });
assert.deepEqual(r("yesterday"), { from: "2026-07-14", to: "2026-07-14" });
assert.deepEqual(r("last_7_days"), { from: "2026-07-08", to: "2026-07-15" });
assert.deepEqual(r("last_month"), { from: "2026-06-01", to: "2026-06-30" });
assert.deepEqual(r("last_year"), { from: "2025-01-01", to: "2025-12-31" });
assert.deepEqual(
  resolveDateRange({ preset: "this_month" }, new Date(2026, 0, 1)),
  { from: "2026-01-01", to: "2026-01-01" }
);
assert.deepEqual(
  resolveDateRange({ preset: "last_month" }, new Date(2026, 0, 20)),
  { from: "2025-12-01", to: "2025-12-31" }
);
const b = dateRangeBounds({
  preset: "custom",
  from: "2026-07-01",
  to: "2026-07-09",
});
assert.equal(b.start.getTime(), new Date(2026, 6, 1).getTime());
assert.equal(b.end.getTime(), new Date(2026, 6, 10).getTime());
assert.deepEqual(dateRangeBounds({ preset: "all_time" }), {
  start: null,
  end: null,
});
assert.equal(
  formatDateRange("2026-07-01", "2026-07-09", "en-GB"),
  "1 Jul – 9 Jul 2026"
);
assert.equal(
  formatDateRange("2025-12-28", "2026-01-03", "en-GB"),
  "28 Dec 2025 – 3 Jan 2026"
);
console.log("dateRange ok");
