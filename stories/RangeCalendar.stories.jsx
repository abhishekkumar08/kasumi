import { useState } from "react";
import { NumberStepper, RangeCalendar } from "../src/index.js";

export default { title: "Forms/RangeCalendar", component: RangeCalendar };

const taken = new Set(["2026-11-12", "2026-11-13", "2026-11-14", "2026-11-25"]);
const shift = (iso, n) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86_400_000).toISOString().slice(0, 10);

function Booking() {
  const [range, setRange] = useState({ start: null, end: null });
  const getDayState = (d) => (taken.has(d) ? (taken.has(shift(d, -1)) ? "disabled" : "end_only") : taken.has(shift(d, 1)) ? "no_end" : "available");
  const isValidEnd = (s, d) => {
    for (let n = s; n < d; n = shift(n, 1)) if (taken.has(n)) return false;
    return shift(s, 2) <= d;
  };
  return (
    <div className="max-w-3xl space-y-3">
      <RangeCalendar {...range} onChange={setRange} minDate="2026-11-01" month="2026-11-01" getDayState={getDayState} isValidEnd={isValidEnd} />
      <p className="font-mono text-caption text-fg-muted">{JSON.stringify(range)}</p>
    </div>
  );
}

function Steppers() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  return (
    <div className="max-w-sm divide-y divide-line">
      <NumberStepper label="Adults" description="Ages 13 or above" value={adults} min={1} max={8} onChange={setAdults} />
      <NumberStepper label="Children" description="Ages 2–12" value={children} max={6} onChange={setChildren} />
    </div>
  );
}

export const TwoMonths = { render: () => <Booking /> };
export const Stepper = { name: "NumberStepper", render: () => <Steppers /> };
