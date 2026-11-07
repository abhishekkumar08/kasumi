import { useState } from "react";
import { Search } from "lucide-react";
import { BackLink, Breadcrumb, IconButton, LoadMore, TableOfContents, Tabs, TopNav } from "../src/index.js";

export default { title: "Navigation/Wayfinding", component: Breadcrumb };

export const BreadcrumbStory = {
  name: "Breadcrumb and BackLink",
  render: () => (
    <div className="space-y-4">
      <Breadcrumb
        items={[
          { label: "Practice", href: "#practice" },
          { label: "Arrays", href: "#arrays" },
          { label: "Two Sum" },
        ]}
      />
      <BackLink href="#problems">All problems</BackLink>
    </div>
  ),
};

export const UnderlineTabs = {
  name: "Tabs: underline",
  render: () => (
    <Tabs
      variant="underline"
      tabs={[
        { id: "description", label: "Description", content: <p className="text-body text-fg-muted">Problem statement.</p> },
        { id: "solutions", label: "Solutions", content: <p className="text-body text-fg-muted">Solutions panel.</p> },
        { id: "submissions", label: "Submissions", content: <p className="text-body text-fg-muted">Submissions panel.</p> },
      ]}
    />
  ),
};

export const TableOfContentsStory = {
  name: "TableOfContents",
  render: () => (
    <TableOfContents
      className="max-w-xs"
      activeId="complexity"
      items={[
        { id: "approach", label: "Approach", level: 2 },
        { id: "hash-map", label: "Hash map", level: 3 },
        { id: "complexity", label: "Complexity", level: 2 },
        { id: "pitfalls", label: "Pitfalls", level: 2 },
      ]}
    />
  ),
};

function More() {
  const [shown, setShown] = useState(20);
  return <LoadMore shown={shown} total={54} onLoadMore={() => setShown((n) => Math.min(n + 20, 54))} />;
}

export const LoadMoreStory = { name: "LoadMore", render: () => <More /> };

export const TopNavStory = {
  name: "TopNav",
  parameters: { layout: "fullscreen" },
  render: () => (
    <TopNav
      brand={<span className="text-title text-fg">Lab</span>}
      items={[
        { label: "Today", href: "#today", active: true },
        {
          label: "Practice",
          items: [
            { label: "Problems", href: "#problems" },
            { label: "System design", href: "#design" },
            { label: "Quizzes", href: "#quizzes" },
          ],
        },
        { label: "Jobs", href: "#jobs" },
      ]}
      actions={<IconButton icon={Search} label="Search" />}
    />
  ),
};
