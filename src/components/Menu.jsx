"use client";

import { useEffect, useRef, useState } from "react";
import { Check, MoreHorizontal } from "lucide-react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";
import { IconButton } from "./IconButton.jsx";
import { Popover } from "./Popover.jsx";

/**
 * An actions menu ("…"). WAI-ARIA menu button: focus moves into the menu on
 * open, arrow keys and Home/End move between items, Enter picks, Escape
 * closes back to the trigger. `items`: [{ label, onSelect, icon, tone:
 * "danger", disabled }]. An item with `href` (or `as` + `to`, e.g. a router
 * Link) is a link, so it opens in a new tab and shows its URL. Consecutive
 * items with the same `group` sit under that heading. `shortcut` shows keys
 * at the end of the row (display only); `checked` (true/false) makes the item
 * a checkbox item with a tick. Defaults to a "More actions" icon trigger.
 * `side="top"` opens it above the trigger (bottom bars); `open` +
 * `onOpenChange` control it from outside (a right-click menu).
 *
 * @param {Parameters<typeof import("../index").Menu>[0]} props
 */
export function Menu({
  items,
  label = COMPONENT_COPY.MORE_ACTIONS,
  trigger,
  align = "end",
  side = "bottom",
  open: controlledOpen,
  onOpenChange,
  className,
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = (next) => {
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };
  const itemRefs = useRef([]);
  // Consecutive items with the same `group` share a labelled section.
  const groups = [];
  items.forEach((item, i) => {
    const last = groups[groups.length - 1];
    if (last && last.name === (item.group ?? "")) last.items.push({ item, i });
    else groups.push({ name: item.group ?? "", items: [{ item, i }] });
  });

  useEffect(() => {
    if (open) itemRefs.current.find((node) => node && !node.disabled)?.focus();
  }, [open]);

  const onKeyDown = (event) => {
    const enabled = itemRefs.current.filter((node) => node && !node.disabled);
    const index = enabled.indexOf(document.activeElement);
    const moves = {
      ArrowDown: index + 1,
      ArrowUp: index - 1,
      Home: 0,
      End: enabled.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    enabled[(moves[event.key] + enabled.length) % enabled.length]?.focus();
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      align={align}
      side={side}
      popupRole="menu"
      label={label}
      className={className}
      trigger={
        trigger ?? (
          <IconButton
            icon={MoreHorizontal}
            label={label}
            variant="ghost"
            size="sm"
          />
        )
      }
    >
      <div onKeyDown={onKeyDown}>
        {groups.map((group, g) => (
          <div
            key={`${group.name}-${group.items[0].i}`}
            role={group.name ? "group" : undefined}
            aria-label={group.name || undefined}
            className={cn(g > 0 && "mt-1 border-t border-line-muted pt-1")}
          >
            {group.name && (
              <p
                aria-hidden="true"
                className="px-3 pb-1 pt-2 text-caption font-semibold uppercase tracking-wide text-fg-muted"
              >
                {group.name}
              </p>
            )}
            {group.items.map(({ item, i }) => {
              const { label: text, onSelect, icon: Icon, tone, disabled, as, href, to, shortcut, checked } = item;
              const checkable = typeof checked === "boolean";
              const Item = as ?? (href ? "a" : "button");
              return (
                <Item
                  key={text}
                  ref={(node) => {
                    itemRefs.current[i] = node;
                  }}
                  {...(Item === "button"
                    ? { type: "button", disabled }
                    : href
                      ? { href }
                      : { to })}
                  role={checkable ? "menuitemcheckbox" : "menuitem"}
                  aria-checked={checkable ? checked : undefined}
                  tabIndex={-1}
                  onClick={() => {
                    setOpen(false);
                    onSelect?.();
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-control px-3 py-2 text-left text-label transition-colors duration-fast focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    tone === "danger"
                      ? "text-error-fg hover:bg-error-subtle focus:bg-error-subtle"
                      : "text-fg hover:bg-surface-muted focus:bg-surface-muted"
                  )}
                >
                  {checkable ? (
                    <Check aria-hidden="true" className={cn("h-4 w-4 shrink-0", !checked && "invisible")} />
                  ) : (
                    Icon && <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                  )}
                  <span className="flex-1">{text}</span>
                  {shortcut && (
                    <span aria-hidden="true" className="ml-4 text-caption tabular-nums text-fg-subtle">
                      {shortcut.join("")}
                    </span>
                  )}
                </Item>
              );
            })}
          </div>
        ))}
      </div>
    </Popover>
  );
}
