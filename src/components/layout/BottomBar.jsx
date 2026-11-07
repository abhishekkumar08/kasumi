import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn.js";
import { chromeClasses, isActivePath } from "../navStyles.js";

const item =
  "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-control py-2 text-caption transition-colors duration-fast focus-ring";

/** Phone navigation: the first five destinations, one tap away. */
/** @param {Parameters<typeof import("../../index").BottomBar>[0]} props */
export function BottomBar({ navigation, label, className }) {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label={label}
      className={cn(
        "fixed inset-x-0 bottom-0 z-sticky border-t pb-[env(safe-area-inset-bottom)] shadow-overlay",
        chromeClasses,
        className
      )}
    >
      <ul className="flex h-16 items-stretch justify-around px-1">
        {navigation.map(({ name, href, icon: Icon, onClick, primary }) => {
          const active = !onClick && isActivePath(pathname, href);
          // The one main action: a raised round button, its name kept for
          // screen readers.
          if (primary)
            return (
              <li key={name} className="flex min-w-0 flex-1 justify-center">
                <button
                  type="button"
                  onClick={onClick}
                  aria-label={name}
                  className="-mt-5 flex h-14 w-14 items-center justify-center rounded-pill bg-accent text-fg-on-accent shadow-overlay transition-transform duration-fast active:scale-95 focus-ring"
                >
                  {Icon && <Icon aria-hidden="true" className="h-6 w-6" />}
                </button>
              </li>
            );
          const content = (
            <>
              {Icon && <Icon aria-hidden="true" className="h-5 w-5 shrink-0" />}
              <span className="max-w-full truncate">{name}</span>
            </>
          );
          return (
            <li key={name} className="flex min-w-0 flex-1">
              {onClick ? (
                <button
                  type="button"
                  onClick={onClick}
                  className={cn(item, "text-fg-muted")}
                >
                  {content}
                </button>
              ) : (
                <Link
                  to={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    item,
                    active ? "font-semibold text-fg" : "text-fg-muted"
                  )}
                >
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
