import { useEffect, useState } from "react";
import { Calendar, FileCode2, Moon, Search, Settings } from "lucide-react";
import { Button, CommandPalette, Kbd } from "../src/index.js";

export default { title: "Overlays/CommandPalette", component: CommandPalette };

function Demo() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState("");

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const go = (label) => () => setLast(label);
  const commands = [
    { id: "today", label: "Go to Today", group: "Pages", icon: Calendar, onSelect: go("Today") },
    { id: "problems", label: "Go to Problems", group: "Pages", icon: FileCode2, keywords: ["dsa", "leetcode"], onSelect: go("Problems") },
    { id: "settings", label: "Open settings", group: "Pages", icon: Settings, shortcut: ["⌘", ","], onSelect: go("Settings") },
    { id: "theme", label: "Toggle dark theme", group: "Actions", icon: Moon, onSelect: go("Theme") },
    { id: "search", label: "Search jobs", group: "Actions", icon: Search, onSelect: go("Search jobs") },
  ];

  return (
    <div className="space-y-3">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </Button>
      {last && <p className="text-body text-fg-muted">Ran: {last}</p>}
      <CommandPalette open={open} onClose={() => setOpen(false)} commands={commands} />
    </div>
  );
}

export const Playground = { render: () => <Demo /> };
