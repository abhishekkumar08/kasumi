import { BarGraph, DonutGraph, Card } from "../src/index.js";

const rupees = (value) => `₹${value.toLocaleString("en-IN")}`;
const compact = (value) =>
  `₹${value.toLocaleString("en-IN", { notation: "compact", maximumFractionDigits: 1 })}`;

const months = [
  { month: "Jan 26", income: 120000, spent: 64000 },
  { month: "Feb 26", income: 120000, spent: 71000 },
  { month: "Mar 26", income: 126000, spent: 58000 },
];
const categories = [
  { name: "Rent & Housing", value: 25000 },
  { name: "Food & Dining", value: 6200 },
  { name: "Groceries", value: 3100 },
  { name: "Transport", value: 1900 },
];

export default { title: "Data/Charts" };

export const Columns = {
  render: () => (
    <Card variant="glass" className="max-w-xl p-4">
      <BarGraph
        data={months}
        categoryKey="month"
        series={[
          { key: "income", label: "Income", colorIndex: 0 },
          { key: "spent", label: "Spent", colorIndex: 3 },
        ]}
        valueFormatter={compact}
        tooltipFormatter={rupees}
      />
    </Card>
  ),
};

export const Rows = {
  render: () => (
    <Card variant="glass" className="max-w-xl p-4">
      <BarGraph
        data={categories}
        categoryKey="name"
        series={[{ key: "value", label: "Spent" }]}
        layout="vertical"
        valueFormatter={compact}
        tooltipFormatter={rupees}
        onSelect={() => {}}
      />
    </Card>
  ),
};

export const Donut = {
  render: () => (
    <Card variant="glass" className="max-w-md p-4">
      <DonutGraph data={categories} valueFormatter={rupees} onSelect={() => {}} />
    </Card>
  ),
};
