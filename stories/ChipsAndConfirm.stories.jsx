import { useState } from "react";
import { Bold, Italic, Pin, Plus, Trash2 } from "lucide-react";
import { Button, Chip, IconButton, InlineConfirm } from "../src/index.js";

export default { title: "Actions/Chip and confirm", component: Chip };

function Filters() {
  const [picked, setPicked] = useState(["easy"]);
  const toggle = (id) =>
    setPicked((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]));
  return (
    <div className="flex flex-wrap gap-2">
      {[
        ["easy", "Easy", 42],
        ["medium", "Medium", 87],
        ["hard", "Hard", 23],
      ].map(([id, label, count]) => (
        <Chip key={id} selected={picked.includes(id)} count={count} onClick={() => toggle(id)}>
          {label}
        </Chip>
      ))}
    </div>
  );
}

export const FilterChips = { name: "Chip: filters (toggle, with count)", render: () => <Filters /> };

export const LinkChips = {
  name: "Chip: page links and static",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip href="#overview" selected>Overview</Chip>
      <Chip href="#plans">Plans</Chip>
      <Chip href="#jobs" icon={Pin}>Pinned</Chip>
      <Chip>Remote</Chip>
    </div>
  ),
};

export const DenseSizes = {
  name: "Button and IconButton: xs (32px)",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">
        <Plus aria-hidden="true" className="h-4 w-4" />
        Add
      </Button>
      <Button size="xs" variant="outline">Filter</Button>
      <IconButton icon={Trash2} label="Delete" size="xs" />
      <Button size="sm">36px</Button>
      <Button>40px</Button>
    </div>
  ),
};

function Toggles() {
  const [bold, setBold] = useState(true);
  const [italic, setItalic] = useState(false);
  return (
    <div className="flex gap-1">
      <IconButton icon={Bold} label="Bold" pressed={bold} onClick={() => setBold(!bold)} />
      <IconButton icon={Italic} label="Italic" pressed={italic} onClick={() => setItalic(!italic)} />
    </div>
  );
}

export const ToggleIconButtons = { name: "IconButton: on/off", render: () => <Toggles /> };

function Confirm() {
  const [deleted, setDeleted] = useState(false);
  return deleted ? (
    <p className="text-body text-fg-muted">Draft deleted.</p>
  ) : (
    <InlineConfirm icon={Trash2} onConfirm={() => setDeleted(true)}>
      Delete draft
    </InlineConfirm>
  );
}

export const InlineConfirmStory = { name: "InlineConfirm", render: () => <Confirm /> };
