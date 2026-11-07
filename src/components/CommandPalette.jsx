"use client";

import { Search } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";
import { Kbd } from "./Code.jsx";

const matches = (command, words) => {
  const haystack = [command.label, command.group, ...(command.keywords ?? [])]
    .join(" ")
    .toLowerCase();
  return words.every((word) => haystack.includes(word));
};

function PaletteBody({ commands, search, onClose, placeholder, emptyLabel, footer }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const baseId = useId();
  const optionId = (i) => `${baseId}-option-${i}`;

  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results = search ? search(query) : commands.filter((command) => matches(command, words));
  const groups = [];
  results.forEach((command, index) => {
    const name = command.group ?? "";
    const last = groups[groups.length - 1];
    if (last?.name === name) last.items.push({ command, index });
    else groups.push({ name, items: [{ command, index }] });
  });

  const activeOptionId = optionId(active);
  useEffect(() => {
    document
      .getElementById(activeOptionId)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeOptionId]);

  const run = (command) => {
    onClose();
    command.onSelect();
  };

  const onKeyDown = (event) => {
    if (!results.length) return;
    const moves = { ArrowDown: active + 1, ArrowUp: active - 1 };
    if (event.key in moves) {
      event.preventDefault();
      setActive((moves[event.key] + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(results[Math.min(active, results.length - 1)]);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-fg-muted" />
        <input
          role="combobox"
          aria-expanded="true"
          aria-controls={`${baseId}-list`}
          aria-autocomplete="list"
          aria-activedescendant={results.length ? optionId(active) : undefined}
          aria-label={COMPONENT_COPY.COMMAND_PALETTE}
          placeholder={placeholder}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          data-autofocus
          className="h-14 min-w-0 flex-1 bg-transparent text-body-lg text-fg placeholder:text-fg-subtle focus:outline-none"
        />
      </div>
      <div
        id={`${baseId}-list`}
        role="listbox"
        aria-label={COMPONENT_COPY.COMMAND_RESULTS}
        className="max-h-[min(24rem,60vh)] overflow-y-auto p-2"
      >
        {results.length === 0 && (query.trim() || !search) && (
          <p className="px-3 py-6 text-center text-body text-fg-muted">
            {emptyLabel}
          </p>
        )}
        {groups.map((group) => (
          <div
            key={`${group.name}-${group.items[0].index}`}
            role="group"
            aria-labelledby={
              group.name ? `${baseId}-group-${group.items[0].index}` : undefined
            }
          >
            {group.name && (
              <p
                id={`${baseId}-group-${group.items[0].index}`}
                className="px-3 pb-1 pt-3 text-caption font-semibold text-fg-muted"
              >
                {group.name}
              </p>
            )}
            {group.items.map(({ command, index }) => {
              const Icon = command.icon;
              return (
                <div
                  key={command.id}
                  id={optionId(index)}
                  role="option"
                  aria-selected={index === active}
                  onPointerMove={() => setActive(index)}
                  onClick={() => run(command)}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-control px-3 py-2 text-label text-fg",
                    index === active && "bg-accent-subtle"
                  )}
                >
                  {Icon && (
                    <Icon
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-fg-muted"
                    />
                  )}
                  {command.tag && (
                    <span className="w-16 shrink-0 truncate text-caption font-semibold uppercase tracking-wide text-fg-muted">
                      {command.tag}
                    </span>
                  )}
                  <span className="min-w-0 flex-1 truncate">
                    {command.label}
                  </span>
                  {command.meta && (
                    <span className="max-w-[40%] shrink-0 truncate text-caption text-fg-muted">
                      {command.meta}
                    </span>
                  )}
                  {command.shortcut && (
                    <span className="flex shrink-0 gap-1">
                      {command.shortcut.map((key) => (
                        <Kbd key={key}>{key}</Kbd>
                      ))}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {footer && (
        <div className="border-t border-line px-4 py-2 text-caption text-fg-muted">
          {footer}
        </div>
      )}
    </>
  );
}

/**
 * Search-and-run for every action and page in an app (⌘K). `commands`: [{
 * id, label, onSelect, group, icon, keywords, shortcut: ["⌘", "S"] }]. The
 * app owns the shortcut that opens it. `search(query)` replaces the built-in
 * word match with the app's own ranking (it returns the commands to show). Native `<dialog>` like Modal; the
 * input is a combobox over a listbox, so arrow keys move through results and
 * Enter runs one. Query and selection reset every time it opens.
 *
 * @param {Parameters<typeof import("../index").CommandPalette>[0]} props
 */
export function CommandPalette({
  open,
  onClose,
  commands = [],
  search,
  placeholder = COMPONENT_COPY.COMMAND_PLACEHOLDER,
  emptyLabel = COMPONENT_COPY.COMMAND_EMPTY,
  footer,
  className,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      dialog.querySelector("[data-autofocus]")?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const dialog = (
    <dialog
      ref={ref}
      aria-label={COMPONENT_COPY.COMMAND_PALETTE}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      className={cn(
        "material-overlay mx-auto mt-[12vh] w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-overlay border border-line p-0 text-fg shadow-modal animate-enter",
        className
      )}
    >
      {open && (
        <PaletteBody
          commands={commands}
          search={search}
          onClose={onClose}
          placeholder={placeholder}
          emptyLabel={emptyLabel}
          footer={footer}
        />
      )}
    </dialog>
  );

  return typeof document === "undefined"
    ? dialog
    : createPortal(dialog, document.body);
}
