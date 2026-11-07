"use client";

import { useState } from "react";
import { FileText, Pencil, Plus, Trash2 } from "lucide-react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";
import { IconButton } from "./IconButton.jsx";

/**
 * A flat list of files with the open one marked. Add and rename edit a name
 * in place (Enter saves, Escape cancels); delete hides on the last file.
 * Each action shows only when its handler is passed.
 *
 * @param {Parameters<typeof import("../index").FileTree>[0]} props
 */
export function FileTree({
  files,
  active,
  onSelect,
  onAdd,
  onRename,
  onDelete,
  label = COMPONENT_COPY.FILES,
  addLabel = COMPONENT_COPY.ADD_FILE,
  renameLabel = COMPONENT_COPY.RENAME_FILE,
  deleteLabel = COMPONENT_COPY.DELETE_FILE,
  nameLabel = COMPONENT_COPY.FILE_NAME,
  className,
}) {
  // null: not editing; "": adding a file; a name: renaming that file.
  const [editing, setEditing] = useState(/** @type {string | null} */ (null));
  const [draft, setDraft] = useState("");

  const begin = (/** @type {string} */ name) => {
    setEditing(name);
    setDraft(name);
  };
  const commit = () => {
    const name = draft.trim();
    if (name && editing === "") onAdd?.(name);
    else if (name && editing && name !== editing) onRename?.(editing, name);
    setEditing(null);
  };

  const field = (
    <input
      autoFocus
      onFocus={(e) => e.currentTarget.select()}
      aria-label={nameLabel}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") commit();
        if (e.key === "Escape") setEditing(null);
      }}
      className="h-8 w-full rounded-control border border-focus bg-surface px-2 text-label text-fg focus:outline-none"
    />
  );

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-center justify-between gap-2 px-2">
        <span className="text-caption font-semibold uppercase tracking-wide text-fg-muted">{label}</span>
        {onAdd && <IconButton icon={Plus} label={addLabel} size="xs" onClick={() => begin("")} />}
      </div>
      <ul aria-label={label} className="flex flex-col gap-0.5">
        {files.map((name) => (
          <li key={name} className="group flex items-center gap-1">
            {editing === name ? (
              field
            ) : (
              <>
                <button
                  type="button"
                  aria-current={name === active ? "true" : undefined}
                  onClick={() => onSelect(name)}
                  className={cn(
                    "flex h-8 min-w-0 flex-1 items-center gap-2 rounded-control px-2 text-left text-label transition-colors duration-fast focus-ring",
                    name === active ? "bg-accent-subtle text-fg" : "text-fg-muted hover:bg-surface-subtle hover:text-fg"
                  )}
                >
                  <FileText aria-hidden="true" className="h-4 w-4 shrink-0" />
                  <span className="truncate font-mono">{name}</span>
                </button>
                {onRename && (
                  <IconButton icon={Pencil} label={renameLabel(name)} size="xs" onClick={() => begin(name)} />
                )}
                {onDelete && files.length > 1 && (
                  <IconButton icon={Trash2} label={deleteLabel(name)} size="xs" onClick={() => onDelete(name)} />
                )}
              </>
            )}
          </li>
        ))}
        {editing === "" && <li>{field}</li>}
      </ul>
    </div>
  );
}
