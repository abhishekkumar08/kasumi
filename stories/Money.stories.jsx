import { useState } from "react";
import { Bell, Search, Store, Trash2, TrendingUp } from "lucide-react";
import {
  Amount,
  Avatar,
  Card,
  ChoiceGrid,
  Chip,
  DescriptionList,
  EmptyState,
  Fieldset,
  IconButton,
  LoadingState,
  StatCard,
  TextLink,
} from "../src/index.js";

export default { title: "Data display/Money and more", component: Amount };

export const AmountInWords = {
  name: "Amount in words",
  render: () => (
    <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
      <StatCard label="Income" value={<Amount value={241097} decimals={0} />} hint="104 payments" />
      <StatCard label="Moved" value={<Amount value={23416.73} />} hint="Between your own accounts" />
      <p className="text-body text-fg">Inline, no words: <Amount value={23416.73} /></p>
    </div>
  ),
};

export const AmountStory = {
  name: "Amount",
  render: () => (
    <Card padding="md" className="space-y-2">
      <p className="text-body text-fg">
        Balance <Amount value={128450.5} />
      </p>
      <p className="text-body text-fg">
        Salary <Amount value={85000} tone="auto" sign="always" trendIcon />
      </p>
      <p className="text-body text-fg">
        Groceries <Amount value={-2340.75} tone="auto" sign="always" trendIcon />
      </p>
    </Card>
  ),
};

export const TintedStatCards = {
  name: "StatCard tint (Card tone)",
  render: () => (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard label="Income" value="₹85,000" hint="3 txns" tint="success" icon={TrendingUp} iconTone="success" />
      <StatCard label="Food & Dining" value="₹12,300" hint="41 txns" tint="error" />
      <StatCard label="Bills & Fees" value="₹4,210" hint="6 txns" tint="info" />
    </div>
  ),
};

export const Avatars = {
  name: "Avatar: icon, emoji, colour, xl",
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar icon={Store} tone="success" />
      <Avatar icon={Bell} tone="warning" />
      <Avatar emoji="🍔" color="#F59E0B" />
      <Avatar emoji="🚗" color="#3B82F6" size="lg" />
      <Avatar name="Asha Rao" size="xl" />
    </div>
  ),
};

function Pickers() {
  const [emoji, setEmoji] = useState("🍔");
  const [color, setColor] = useState("#10B981");
  return (
    <Fieldset legend="Category look" description="Shown on tiles and charts." variant="card">
      <ChoiceGrid
        label="Emoji"
        value={emoji}
        onChange={setEmoji}
        options={["🍔", "🚗", "🛒", "🏠", "🎬"].map((e) => ({ value: e, label: e }))}
      />
      <ChoiceGrid
        label="Colour"
        value={color}
        onChange={setColor}
        options={[
          ["#10B981", "Emerald"],
          ["#3B82F6", "Blue"],
          ["#F59E0B", "Amber"],
          ["#EF4444", "Red"],
        ].map(([value, label]) => ({ value, label, color: value }))}
      />
    </Fieldset>
  );
}

export const FieldsetAndChoiceGrid = { name: "Fieldset and ChoiceGrid", render: () => <Pickers /> };

export const DescriptionListStory = {
  name: "DescriptionList",
  render: () => (
    <Card padding="md" className="max-w-sm">
      <DescriptionList
        items={[
          { label: "Pattern", value: "SWIGGY*" },
          { label: "Category", value: "Food & Dining" },
          { label: "Applied", value: "42 times" },
        ]}
      />
    </Card>
  ),
};

function Filters() {
  const [active, setActive] = useState(["Search: swiggy", "Food & Dining"]);
  return (
    <div className="flex flex-wrap gap-2">
      {active.map((f) => (
        <Chip key={f} icon={f.startsWith("Search") ? Search : undefined} onRemove={() => setActive(active.filter((x) => x !== f))} removeLabel={`Clear ${f}`}>
          {f}
        </Chip>
      ))}
    </div>
  );
}

export const RemovableChips = { name: "Chip onRemove", render: () => <Filters /> };

export const StatesAndLinks = {
  name: "LoadingState, EmptyState sm, IconButton loading, TextLink",
  render: () => (
    <div className="space-y-6">
      <Card>
        <LoadingState title="Processing statement" description="This takes a few seconds." steps={["Reading the file", "Detecting the bank", "Categorising"]} />
      </Card>
      <Card>
        <EmptyState size="sm" icon="🧾" title="No transactions" description="Nothing in this range." />
      </Card>
      <div className="flex items-center gap-3">
        <IconButton icon={Trash2} label="Delete" loading />
        <p className="text-body text-fg">
          Read the <TextLink href="#privacy">privacy note</TextLink> first.
        </p>
      </div>
    </div>
  ),
};
