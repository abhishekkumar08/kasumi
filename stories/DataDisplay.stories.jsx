import { Landmark, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import {
  Avatar,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartLegendLabel,
  ChartTooltip,
  Progress,
  Stat,
  StatCard,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  useChartTheme,
} from "../src/index.js";

export default { title: "Data display/Overview", component: Card };

export const Cards = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-3">
      {["default", "glass"].map((variant) => (
        <Card key={variant} variant={variant}>
          <CardHeader>
            <CardTitle>{variant === "glass" ? "Glass card" : "Default card"}</CardTitle>
            <CardDescription>Surfaces hold content.</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge tone="success">+4%</Badge>
          </CardContent>
        </Card>
      ))}
      <Card interactive padding="md">
        <CardTitle>Interactive card</CardTitle>
        <CardDescription>Lifts on hover; only for cards that do something.</CardDescription>
      </Card>
    </div>
  ),
};

export const StatCards = {
  name: "StatCard",
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Income" value="₹2,45,000" hint="This month" icon={TrendingUp} iconTone="success" />
      <StatCard label="Spending" value="₹1,51,800" delta="+12%" tone="error" hint="vs last month" icon={TrendingDown} iconTone="error" />
      <StatCard label="Net worth" value="₹9,43,200" hint="Projected" icon={Landmark} iconTone="info" />
      <StatCard label="Safe to spend" value="₹18,400" icon={Wallet} iconTone="accent" variant="glass" />
    </div>
  ),
};

export const StatInline = {
  name: "Stat",
  render: () => (
    <Card padding="md" className="max-w-xs">
      <Stat label="Spent this month" value="₹42,180" delta="+12%" tone="error" hint="vs last month" icon={Wallet} />
    </Card>
  ),
};

export const ProgressStory = {
  name: "Progress",
  args: { value: 64, max: 100, label: "Emergency fund", tone: "success", size: "md", showValue: true },
  argTypes: {
    tone: { control: "select", options: ["accent", "success", "warning", "error", "info"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
    value: { control: { type: "range", min: 0, max: 100 } },
  },
  render: (args) => (
    <Card padding="md" className="max-w-md space-y-5">
      <Progress {...args} />
      <Progress label="Groceries budget" value={8400} max={10000} valueLabel="₹8,400 of ₹10,000" tone="warning" />
      <Progress label="Dining budget" value={6300} max={6000} valueLabel="₹6,300 of ₹6,000" tone="error" />
    </Card>
  ),
};

export const BadgesAndAvatars = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {["neutral", "accent", "outline", "success", "warning", "error", "info"].map((tone) => (
          <Badge key={tone} tone={tone}>
            {tone}
          </Badge>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Avatar name="Asha Rao" size="sm" />
        <Avatar name="Vikram Shah" />
        <Avatar name="Meera" size="lg" />
      </div>
    </div>
  ),
};

export const TableStory = {
  name: "Table",
  render: () => (
    <Table caption="Recent transactions">
      <TableHead>
        <TableRow>
          <TableHeader>Merchant</TableHeader>
          <TableHeader>Category</TableHeader>
          <TableHeader numeric>Amount</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {[
          ["Fresh Mart", "Groceries", "₹1,240.00"],
          ["City Fuel", "Fuel", "₹2,500.00"],
          ["Cafe Nine", "Dining", "₹480.50"],
        ].map(([merchant, category, amount]) => (
          <TableRow key={merchant} interactive>
            <TableCell>{merchant}</TableCell>
            <TableCell>
              <Badge>{category}</Badge>
            </TableCell>
            <TableCell numeric>{amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

function ChartTheme() {
  const theme = useChartTheme();
  return (
    <Card padding="md" className="grid gap-6 md:grid-cols-2">
      <ul className="grid grid-cols-4 gap-3">
        {theme.colors.map((value, i) => (
          <li key={value} className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-control" style={{ backgroundColor: value }} />
            <ChartLegendLabel>{`chart-${i + 1}`}</ChartLegendLabel>
          </li>
        ))}
      </ul>
      <ChartTooltip
        active
        label="Aug 2026"
        payload={[
          { name: "Income", value: "₹2,45,000", dataKey: "income", color: theme.colors[0] },
          { name: "Spending", value: "₹1,51,800", dataKey: "spending", color: theme.colors[1] },
        ]}
      />
    </Card>
  );
}
export const Charts = { name: "Chart theme", render: () => <ChartTheme /> };
