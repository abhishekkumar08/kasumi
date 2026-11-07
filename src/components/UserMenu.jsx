import { LogOut, Moon, Sun } from "lucide-react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";
import { Avatar } from "./Avatar.jsx";

const row =
  "flex min-h-10 w-full items-center justify-between gap-3 rounded-control px-3 py-2 text-label transition-colors duration-fast focus-ring";

/** @param {Parameters<typeof import("../index").UserMenu>[0]} props */
export function UserMenu({
  currentUser,
  onLogout,
  onThemeToggle,
  isDark,
  className,
}) {
  const name = currentUser?.displayName || currentUser?.email || "";

  return (
    <div
      className={cn("mt-auto space-y-1 border-t border-line pt-4", className)}
    >
      <div className="mb-2 flex items-center gap-3 rounded-control bg-surface-subtle px-3 py-3">
        <Avatar name={name} src={currentUser?.photoURL} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-label text-fg">{name}</p>
          {currentUser?.displayName && (
            <p className="truncate text-caption text-fg-muted">
              {currentUser.email}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onThemeToggle}
        className={cn(
          row,
          "text-fg-muted hover:bg-surface-muted hover:text-fg"
        )}
      >
        <span className="flex items-center gap-3">
          {isDark ? (
            <Moon aria-hidden="true" className="h-5 w-5 shrink-0" />
          ) : (
            <Sun aria-hidden="true" className="h-5 w-5 shrink-0" />
          )}
          {COMPONENT_COPY.THEME}
        </span>
        <span className="text-caption text-fg-muted">
          {isDark ? COMPONENT_COPY.THEME_DARK : COMPONENT_COPY.THEME_LIGHT}
        </span>
      </button>

      <button
        type="button"
        onClick={onLogout}
        className={cn(row, "justify-start text-error-fg hover:bg-error-subtle")}
      >
        <LogOut aria-hidden="true" className="h-5 w-5 shrink-0" />
        {COMPONENT_COPY.SIGN_OUT}
      </button>
    </div>
  );
}
