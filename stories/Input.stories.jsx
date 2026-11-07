import { useState } from "react";
import { Search, X } from "lucide-react";
import { Card, IconButton, Input, Select, SelectMenu, Textarea } from "../src/index.js";

export default {
  title: "Forms/Input",
  component: Input,
  args: { label: "Merchant", placeholder: "Fresh Mart", hint: "As it appears on your statement.", error: "", disabled: false },
};

export const Playground = { render: (args) => <div className="max-w-sm"><Input {...args} /></div> };

export const Invalid = {
  args: { label: "Amount", defaultValue: "0", error: "Enter an amount greater than zero.", hint: "" },
  render: (args) => <div className="max-w-sm"><Input {...args} /></div>,
};

function SearchField() {
  const [query, setQuery] = useState("Fresh");
  return (
    <Input
      label="Search transactions"
      type="search"
      placeholder="Merchant, note or amount"
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      leading={<Search />}
      trailing={query && <IconButton icon={X} label="Clear search" variant="ghost" size="sm" onClick={() => setQuery("")} />}
    />
  );
}

export const LeadingAndTrailing = {
  name: "Search (leading + trailing)",
  render: () => <div className="max-w-sm"><SearchField /></div>,
};

export const CurrencyPrefix = {
  name: "Amount (₹ prefix)",
  render: () => (
    <div className="max-w-sm">
      <Input label="Amount" type="number" inputMode="decimal" defaultValue="1240" leading="₹" />
    </div>
  ),
};

export const SelectField = {
  name: "Select",
  render: () => (
    <div className="max-w-sm">
      <Select label="Category" defaultValue="Groceries">
        <option>Groceries</option>
        <option>Fuel</option>
        <option>Dining</option>
      </Select>
    </div>
  ),
};

export const SelectMenuField = {
  name: "SelectMenu",
  render: function Render() {
    const [options, setOptions] = useState(["Bills", "Dining", "Fuel", "Groceries", "Rent", "Shopping", "Transport", "Travel"]);
    const [value, setValue] = useState("Fuel");
    return (
      <Card variant="glass" className="max-w-sm p-4">
        <SelectMenu
          aria-label="Category"
          value={value}
          onChange={setValue}
          options={options}
          onCreate={(name) => {
            setOptions((current) => [...current, name].sort());
            return name;
          }}
        />
      </Card>
    );
  },
};

export const TextareaField = {
  name: "Textarea",
  render: () => <div className="max-w-sm"><Textarea label="Note" rows={3} placeholder="Split with Asha" /></div>,
};

export const FieldSizes = {
  name: "Field sizes (32 / 40px)",
  render: () => (
    <div className="flex max-w-xl flex-wrap items-end gap-3">
      <Input aria-label="Search, small" placeholder="32px" fieldSize="sm" containerClassName="w-40" />
      <Input aria-label="Search, medium" placeholder="40px" fieldSize="md" containerClassName="w-40" />
      <Input aria-label="Search, default" placeholder="Default" containerClassName="w-40" />
    </div>
  ),
};
