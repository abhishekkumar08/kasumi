import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";
import { Input } from "./Input.jsx";
import { SegmentedControl } from "./SegmentedControl.jsx";

/**
 * A from–to date range on native date inputs (the platform picker, keyboard
 * entry and locale formats for free). Values are "YYYY-MM-DD" strings.
 * `presets` ([{ id, label, from, to }]) add quick ranges; the matching one
 * shows as selected, and editing a date by hand clears it.
 *
 * @param {Parameters<typeof import("../index").DateRange>[0]} props
 */
export function DateRange({
  label,
  from = "",
  to = "",
  onChange,
  presets,
  min,
  max,
  fromLabel = COMPONENT_COPY.DATE_FROM,
  toLabel = COMPONENT_COPY.DATE_TO,
  className,
}) {
  const active = presets?.find((p) => p.from === from && p.to === to)?.id;

  return (
    <fieldset className={cn("min-w-0", className)}>
      {label && <legend className="mb-2 text-label text-fg">{label}</legend>}
      {presets?.length > 0 && (
        <SegmentedControl
          label={COMPONENT_COPY.DATE_PRESETS}
          options={presets.map((p) => ({ value: p.id, label: p.label }))}
          value={active}
          onChange={(id) => {
            const preset = presets.find((p) => p.id === id);
            if (preset) onChange?.({ from: preset.from, to: preset.to });
          }}
          className="mb-3"
        />
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          type="date"
          label={fromLabel}
          value={from}
          min={min}
          max={to || max}
          onChange={(event) => onChange?.({ from: event.target.value, to })}
        />
        <Input
          type="date"
          label={toLabel}
          value={to}
          min={from || min}
          max={max}
          onChange={(event) => onChange?.({ from, to: event.target.value })}
        />
      </div>
    </fieldset>
  );
}
