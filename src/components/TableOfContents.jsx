"use client";

import { useEffect, useState } from "react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";

// The heading nearest the top of the viewport is the current one; the -70%
// bottom margin stops a heading low on the screen from claiming it early.
function useActiveHeading(ids) {
  const key = ids ? ids.join("|") : "";
  const [active, setActive] = useState(ids?.[0]);

  useEffect(() => {
    if (!key) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px" }
    );
    for (const id of key.split("|")) {
      const heading = document.getElementById(id);
      if (heading) observer.observe(heading);
    }
    return () => observer.disconnect();
  }, [key]);

  return active;
}

/**
 * "On this page": links to the headings of a long page. `items`: [{ id,
 * label, level: 2 | 3 }], where `id` is the heading's id. Tracks the current
 * heading while scrolling unless `activeId` is given.
 *
 * @param {Parameters<typeof import("../index").TableOfContents>[0]} props
 */
export function TableOfContents({
  items,
  activeId,
  title = COMPONENT_COPY.TABLE_OF_CONTENTS,
  className,
}) {
  const tracked = useActiveHeading(
    activeId === undefined ? items.map((item) => item.id) : null
  );
  const current = activeId ?? tracked;

  return (
    <nav aria-label={title} className={className}>
      <p className="mb-2 text-caption font-semibold text-fg-muted">{title}</p>
      <ul className="border-l border-line">
        {items.map((item) => {
          const active = item.id === current;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l-2 py-1 text-label transition-colors duration-fast focus-ring",
                  item.level === 3 ? "pl-6" : "pl-3",
                  active
                    ? "border-accent text-fg"
                    : "border-transparent text-fg-muted hover:text-fg"
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
