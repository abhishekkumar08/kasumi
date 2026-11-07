"use client";

import { Check, ChevronDown, Plus, Search } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";
import { fieldClasses } from "./classes.js";
import { FormField } from "./FormField.jsx";
import { Popover } from "./Popover.jsx";

const triggerSizes = { sm: "h-8 px-3 py-0", md: "h-10 py-0" };
const normalize = (option) =>
  typeof option === "string" ? { value: option, label: option } : option;

/**
 * A styled single-choice dropdown — Select's look without the operating
 * system's menu. The trigger is a button (aria-haspopup="listbox"); the
 * panel is a listbox driven from the keyboard (arrows, Home/End, Enter,
 * Escape), with a search box once the list is long (always with onCreate,
 * labelled "Search or add new"). `onCreate(text)` adds
 * a "Create “text”" option when the search matches nothing; resolve it to
 * the new value (or call onChange yourself) and the menu closes. `label`
 * (and `hint`) render the same field label as Input and Select, so a
 * SelectMenu lines up with them in a form; it also names the trigger.
 *
 * @param {Parameters<typeof import("../index").SelectMenu>[0]} props
 */
export function SelectMenu({
  value,
  onChange,
  options,
  placeholder = COMPONENT_COPY.SELECT_PLACEHOLDER,
  size,
  searchable,
  onCreate,
  align = "start",
  disabled = false,
  label,
  hint,
  className,
  "aria-label": ariaLabel,
}) {
  const baseId = useId();
  const items = options.map(normalize);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const searchRef = useRef(null);
  const listRef = useRef(null);
  const withSearch = searchable ?? (Boolean(onCreate) || items.length > 7);
  const searchLabel = onCreate
    ? COMPONENT_COPY.SEARCH_OR_CREATE
    : COMPONENT_COPY.SEARCH_OPTIONS;

  const needle = query.trim().toLowerCase();
  const visible = needle
    ? items.filter((item) => item.label.toLowerCase().includes(needle))
    : items;
  const canCreate =
    Boolean(onCreate) &&
    needle !== "" &&
    !items.some((item) => item.label.toLowerCase() === needle);
  const count = visible.length + (canCreate ? 1 : 0);
  const optionId = (index) => `${baseId}-option-${index}`;
  const selected = items.find((item) => item.value === value);

  const openMenu = (next) => {
    if (next) {
      setQuery("");
      setActive(
        Math.max(
          0,
          items.findIndex((item) => item.value === value)
        )
      );
    }
    setOpen(next);
  };

  useEffect(() => {
    if (!open) return;
    (withSearch ? searchRef.current : listRef.current)?.focus();
  }, [open, withSearch]);

  const activeId = optionId(active);
  useEffect(() => {
    if (open)
      document.getElementById(activeId)?.scrollIntoView({ block: "nearest" });
  }, [open, activeId]);

  const choose = async (index) => {
    if (index < visible.length) {
      onChange?.(visible[index].value);
    } else if (canCreate) {
      const created = await onCreate(query.trim());
      if (created !== undefined) onChange?.(created);
    }
    setOpen(false);
  };

  const onKeyDown = (event) => {
    const moves = {
      ArrowDown: active + 1,
      ArrowUp: active - 1,
      Home: 0,
      End: count - 1,
    };
    if (event.key in moves) {
      event.preventDefault();
      if (count) setActive((moves[event.key] + count) % count);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (count) choose(Math.min(active, count - 1));
    }
  };

  const optionClasses = (index) =>
    cn(
      "flex cursor-pointer items-center justify-between gap-3 rounded-control px-3 py-2 text-label text-fg",
      index === active && "bg-surface-muted"
    );

  const menu = (fieldProps = {}) => (
    <Popover
      open={open}
      onOpenChange={openMenu}
      align={align}
      // The panel holds a search box and the listbox, so it is a dialog;
      // the listbox inside it carries the options.
      popupRole="dialog"
      label={ariaLabel ?? label}
      className={cn("w-full", !label && className)}
      panelClassName="w-72 max-w-[calc(100vw-2rem)] p-0"
      trigger={
        <button
          type="button"
          id={fieldProps.id}
          aria-describedby={fieldProps["aria-describedby"]}
          disabled={disabled}
          aria-label={ariaLabel ?? label}
          className={cn(
            fieldClasses(false),
            triggerSizes[size],
            "flex items-center justify-between gap-2 text-left"
          )}
        >
          <span className={cn("truncate", !selected && "text-fg-subtle")}>
            {selected?.label ?? placeholder}
          </span>
          <ChevronDown
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-fg-muted"
          />
        </button>
      }
    >
      {withSearch && (
        <div className="flex items-center gap-2 border-b border-line px-3">
          <Search
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-fg-muted"
          />
          <input
            ref={searchRef}
            role="combobox"
            aria-expanded="true"
            aria-controls={`${baseId}-list`}
            aria-autocomplete="list"
            aria-activedescendant={count ? activeId : undefined}
            aria-label={searchLabel}
            placeholder={searchLabel}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            className="h-10 min-w-0 flex-1 bg-transparent text-body text-fg placeholder:text-fg-subtle focus:outline-none"
          />
        </div>
      )}
      <ul
        ref={listRef}
        id={`${baseId}-list`}
        role="listbox"
        aria-label={ariaLabel ?? label}
        tabIndex={withSearch ? -1 : 0}
        aria-activedescendant={!withSearch && count ? activeId : undefined}
        onKeyDown={withSearch ? undefined : onKeyDown}
        className="max-h-72 overflow-y-auto p-1 focus:outline-none"
      >
        {visible.map((item, index) => (
          <li
            key={item.value}
            id={optionId(index)}
            role="option"
            aria-selected={item.value === value}
            onPointerMove={() => setActive(index)}
            onClick={() => choose(index)}
            className={optionClasses(index)}
          >
            <span className="min-w-0 truncate">{item.label}</span>
            {item.value === value && (
              <Check
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-fg-muted"
              />
            )}
          </li>
        ))}
        {canCreate && (
          <li
            id={optionId(visible.length)}
            role="option"
            aria-selected={false}
            onPointerMove={() => setActive(visible.length)}
            onClick={() => choose(visible.length)}
            className={optionClasses(visible.length)}
          >
            <span className="flex min-w-0 items-center gap-2">
              <Plus
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-fg-muted"
              />
              <span className="truncate">
                {COMPONENT_COPY.CREATE_OPTION(query.trim())}
              </span>
            </span>
          </li>
        )}
        {count === 0 && (
          <li role="presentation" className="px-3 py-2 text-body text-fg-muted">
            {COMPONENT_COPY.NO_OPTIONS}
          </li>
        )}
      </ul>
    </Popover>
  );

  if (!label) return menu();
  return (
    <FormField label={label} hint={hint} className={className}>
      {menu}
    </FormField>
  );
}
