import { useState } from "react";
import { DateRange, DateRangeSelect } from "../src/index.js";

const presets = [
  { id: "jul", label: "July", from: "2026-07-01", to: "2026-07-31" },
  { id: "aug", label: "August", from: "2026-08-01", to: "2026-08-31" },
  { id: "q3", label: "Q3", from: "2026-07-01", to: "2026-09-30" },
];

export default { title: "Forms/DateRange", component: DateRange };

function Controlled({ withPresets }) {
  const [range, setRange] = useState({ from: "2026-07-01", to: "2026-07-31" });
  return (
    <div className="max-w-lg space-y-3">
      <DateRange label="Statement period" {...range} onChange={setRange} presets={withPresets ? presets : undefined} />
      <p className="text-caption text-fg-muted">
        {range.from} → {range.to}
      </p>
    </div>
  );
}

export const WithPresets = { render: () => <Controlled withPresets /> };
export const DatesOnly = { render: () => <Controlled /> };

function Select() {
  const [value, setValue] = useState({ preset: "last_30_days" });
  return (
    <div className="space-y-3">
      <DateRangeSelect value={value} onChange={setValue} />
      <p className="font-mono text-caption text-fg-muted">{JSON.stringify(value)}</p>
    </div>
  );
}

export const DateRangeSelectStory = { name: "DateRangeSelect", render: () => <Select /> };
