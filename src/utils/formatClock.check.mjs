import assert from "node:assert/strict";
import { formatClock } from "./formatClock.js";

assert.equal(formatClock(0), "00:00");
assert.equal(formatClock(65), "01:05");
assert.equal(formatClock(59 * 60 + 59), "59:59");
assert.equal(formatClock(90 * 60), "1:30:00");
assert.equal(formatClock(-3), "00:00");
console.log("formatClock ok");
