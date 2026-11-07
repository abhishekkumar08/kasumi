import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { Accordion, Badge, Card, Checkbox, List, ListRow, Menu, Progress, SectionHeader } from "../src/index.js";

export default { title: "Data display/Lists", component: List };

export const SectionHeaderStory = {
  name: "SectionHeader",
  render: () => (
    <div className="space-y-6">
      <SectionHeader title="Due today" count={4} action={<a className="text-label text-fg-muted underline-offset-4 hover:underline" href="#all">See all</a>} />
      <SectionHeader title="Recently solved" description="Your last seven days." />
    </div>
  ),
};

function Rows() {
  const [open, setOpen] = useState("two-sum");
  const rows = [
    ["two-sum", "Two Sum", "Arrays · Hash map", "success", "Easy", true],
    ["lru", "LRU Cache", "Design · Linked list", "warning", "Medium", false],
    ["median", "Median of Two Sorted Arrays", "Binary search", "error", "Hard", false],
  ];
  return (
    <Card>
      <List>
        {rows.map(([id, title, description, tone, level, done]) => (
          <ListRow
            key={id}
            title={title}
            description={description}
            selected={open === id}
            onClick={() => setOpen(id)}
            leading={done ? <CheckCircle2 className="text-success-fg" /> : <Circle />}
            meta={<Badge tone={tone} size="sm">{level}</Badge>}
            trailing={<Menu items={[{ label: "Open in new tab", href: `#${id}` }, { label: "Remove", tone: "danger", onSelect: () => {} }]} />}
          />
        ))}
      </List>
    </Card>
  );
}

export const ListRows = { name: "List and ListRow", render: () => <Rows /> };

export const SelectedCards = {
  name: "Card: selected",
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card padding="md" selected>
        <p className="text-title text-fg">4-week plan</p>
        <p className="text-body text-fg-muted">Selected</p>
      </Card>
      <Card padding="md" variant="glass">
        <p className="text-title text-fg">8-week plan</p>
        <p className="text-body text-fg-muted">Not selected</p>
      </Card>
    </div>
  ),
};

export const CountsAndSteps = {
  name: "Badge count and Progress steps",
  render: () => (
    <div className="max-w-sm space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-label text-fg">Inbox</span>
        <Badge size="count">3</Badge>
        <Badge size="count" tone="error">12</Badge>
      </div>
      <Progress label="Onboarding" steps={5} value={2} />
      <Progress label="Week 3" steps={7} value={7} tone="success" size="sm" />
    </div>
  ),
};

function Modules() {
  const [open, setOpen] = useState("http");
  const [done, setDone] = useState(["http"]);
  const modules = [
    ["http", "HTTP and request lifecycle"],
    ["db", "Databases and indexes"],
    ["queues", "Queues and retries"],
  ];
  return (
    <Card>
      <Accordion
        value={open}
        onChange={setOpen}
        items={modules.map(([id, title], i) => ({
          id,
          title: `${i + 1}. ${title}`,
          meta: done.includes(id) ? "Done" : undefined,
          actions: (
            <Checkbox
              aria-label={`Mark ${title} complete`}
              checked={done.includes(id)}
              onChange={() => setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]))}
            />
          ),
          content: <p className="text-body text-fg-muted">What you learn in {title.toLowerCase()}.</p>,
        }))}
      />
    </Card>
  );
}

export const AccordionStory = { name: "Accordion", render: () => <Modules /> };
