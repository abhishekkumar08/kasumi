import { useState } from "react";
import { Copy, LayoutGrid, List, Pencil, Trash2 } from "lucide-react";
import { Disclosure, Menu, Pagination, SegmentedControl, Tabs } from "../src/index.js";

export default { title: "Navigation/Overview", component: Tabs };

export const TabsStory = {
  name: "Tabs",
  render: () => (
    <Tabs
      tabs={[
        { id: "overview", label: "Overview", content: <p className="text-body text-fg-muted">Overview panel.</p> },
        { id: "budgets", label: "Budgets", content: <p className="text-body text-fg-muted">Budgets panel.</p> },
        { id: "reports", label: "Reports", content: <p className="text-body text-fg-muted">Reports panel.</p> },
      ]}
    />
  ),
};

function Segments() {
  const [view, setView] = useState("table");
  const [range, setRange] = useState("90d");
  return (
    <div className="flex flex-wrap gap-4">
      <SegmentedControl
        label="View"
        value={view}
        onChange={setView}
        options={[
          { value: "table", label: "Table", icon: List },
          { value: "cards", label: "Cards", icon: LayoutGrid },
        ]}
      />
      <SegmentedControl
        label="Range"
        value={range}
        onChange={setRange}
        options={[
          { value: "30d", label: "30D" },
          { value: "90d", label: "90D" },
          { value: "12m", label: "12M" },
        ]}
      />
    </div>
  );
}
export const SegmentedControlStory = { name: "SegmentedControl", render: () => <Segments /> };

function Pages({ total }) {
  const [page, setPage] = useState(3);
  return <Pagination page={page} totalPages={total} onPageChange={setPage} summary={`Showing ${(page - 1) * 20 + 1}–${page * 20} of ${total * 20}`} />;
}
export const PaginationStory = { name: "Pagination", render: () => <Pages total={12} /> };
export const PaginationShort = { name: "Pagination (few pages)", render: () => <Pages total={4} /> };

export const MenuStory = {
  name: "Menu",
  render: () => (
    <div className="flex justify-center pb-40">
      <Menu
        items={[
          { label: "Edit", icon: Pencil },
          { label: "Duplicate", icon: Copy },
          { label: "Archive", disabled: true },
          { label: "Delete", icon: Trash2, tone: "danger" },
        ]}
      />
    </div>
  ),
};

export const DisclosureStory = {
  name: "Disclosure",
  render: () => (
    <div className="max-w-lg space-y-3">
      <Disclosure title="How categories are guessed" description="Merchant rules first, then the description." defaultOpen>
        <p className="text-body text-fg-muted">
          A merchant rule always wins. Without one, keywords in the description pick the category.
        </p>
      </Disclosure>
      <Disclosure title="Advanced options">
        <p className="text-body text-fg-muted">Closed by default; find-in-page still searches it.</p>
      </Disclosure>
    </div>
  ),
};
