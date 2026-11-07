"use client";

import { ChevronDown } from "lucide-react";
import { useId, useRef, useState } from "react";
import { cn } from "../utils/cn.js";

/**
 * Sections where opening one closes the others: a course's modules, an FAQ.
 * WAI-ARIA accordion: each header is a real button with aria-expanded and
 * aria-controls; ArrowUp/Down and Home/End move between headers. Controlled
 * (`value` + `onChange`) or uncontrolled (`defaultValue`). An item is `{ id,
 * title, meta, actions, content, triggerProps }`: `meta` sits inside the
 * header button (a status, "Open module"), `actions` beside it (a checkbox,
 * a menu — never inside the button), `triggerProps` reach the button
 * (data-testid). Use Disclosure when sections open independently.
 *
 * @param {Parameters<typeof import("../index").Accordion>[0]} props
 */
export function Accordion({
  items,
  value,
  defaultValue = null,
  onChange,
  headingAs: Heading = "h3",
  className,
}) {
  const baseId = useId();
  const [internal, setInternal] = useState(defaultValue);
  const open = value === undefined ? internal : value;
  const refs = useRef([]);

  const toggle = (id) => {
    if (value === undefined) setInternal(id);
    onChange?.(id);
  };

  const onKeyDown = (event, index) => {
    const moves = {
      ArrowDown: index + 1,
      ArrowUp: index - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    refs.current[(moves[event.key] + items.length) % items.length]?.focus();
  };

  return (
    <div className={cn("divide-y divide-line-muted", className)}>
      {items.map((item, index) => {
        const isOpen = open === item.id;
        const triggerId = `${baseId}-trigger-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;
        return (
          <div key={item.id}>
            <div className="flex items-center gap-2 px-4">
              <Heading className="min-w-0 flex-1">
                <button
                  ref={(node) => {
                    refs.current[index] = node;
                  }}
                  type="button"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(item.id)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                  className="flex w-full items-center justify-between gap-3 rounded-control py-3 text-left text-label text-fg transition-colors duration-fast hover:text-fg-muted focus-ring"
                  {...item.triggerProps}
                >
                  <span className="min-w-0 break-words">{item.title}</span>
                  <span className="flex shrink-0 items-center gap-2 text-caption text-fg-muted">
                    {item.meta}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "h-4 w-4 transition-transform duration-fast",
                        isOpen && "rotate-180"
                      )}
                    />
                  </span>
                </button>
              </Heading>
              {item.actions && <div className="shrink-0">{item.actions}</div>}
            </div>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="px-4 pb-6 pt-2"
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
