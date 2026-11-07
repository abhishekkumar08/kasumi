import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "../theme/useTheme.js";
import { cn } from "../utils/cn.js";
import { Card } from "./Card.jsx";

/**
 * Explicit light/dark choice for a profile or settings page.
 *
 * A segmented control rather than the sidebar's toggle: on a settings surface
 * the user should see which mode is active and pick one directly, instead of
 * flipping a switch and inferring the result. Both themes are first-class
 * here — neither is "the default" visually.
 *
 * Copy arrives as props so user-visible strings stay at the call site.
 *
 * @param {Parameters<typeof import("../index").ThemeChoice>[0]} props
 */
export function ThemeChoice({ title, description, lightLabel, darkLabel }) {
  const { theme, setTheme } = useTheme();

  /** @type {Array<{ value: "light" | "dark", label: import("react").ReactNode, Icon: typeof Sun }>} */
  const options = [
    { value: "light", label: lightLabel, Icon: Sun },
    { value: "dark", label: darkLabel, Icon: Moon },
  ];

  return (
    <Card padding="md">
      <div className="mb-4 flex items-start gap-3">
        <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-control bg-surface-muted">
          <Monitor className="h-4 w-4 text-fg-muted" aria-hidden />
        </span>
        <div>
          <h3 className="text-label font-semibold text-fg">{title}</h3>
          <p className="mt-1 text-body text-fg-muted">{description}</p>
        </div>
      </div>

      <div
        role="radiogroup"
        aria-label={title}
        className="grid grid-cols-2 gap-2"
      >
        {options.map(({ value, label, Icon }) => {
          const active = theme === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setTheme(value)}
              className={cn(
                "flex h-10 items-center justify-center gap-2 rounded-control border px-3 text-label transition-colors duration-fast focus-ring",
                active
                  ? "border-accent bg-accent text-fg-on-accent"
                  : "border-line-strong bg-surface text-fg-muted hover:bg-surface-subtle hover:text-fg"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
