import { cn } from "../utils/cn.js";

/**
 * The frame around a code editor: a toolbar (language picker on the left,
 * `actions` such as Run / Submit on the right), the editor filling the rest,
 * and an optional `output` (a console) under it. The editor itself is the app's
 * (Monaco, CodeMirror); this only lays it out.
 *
 * @param {Parameters<typeof import("../index").EditorShell>[0]} props
 */
export function EditorShell({ toolbar, actions, children, output, className }) {
  return (
    <div className={cn("flex h-full min-h-0 flex-col overflow-hidden rounded-card border border-line bg-surface", className)}>
      {(toolbar || actions) && (
        <div className="flex min-h-12 flex-wrap items-center gap-2 border-b border-line px-3 py-2">
          {toolbar}
          {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="min-h-0 flex-1">{children}</div>
      {output && <div className="max-h-[45%] overflow-auto border-t border-line p-3">{output}</div>}
    </div>
  );
}
