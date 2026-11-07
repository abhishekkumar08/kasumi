import { Link, useLocation } from "react-router-dom";
import { cn } from "../utils/cn.js";
import { chromeClasses, isActivePath, navItemClasses } from "./navStyles.js";

/** @param {Parameters<typeof import("../index").Sidebar>[0]} props */
export function Sidebar({
  appName,
  logo,
  navigation,
  action = null,
  children,
  className,
}) {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label={appName}
      className={cn(
        "sticky top-0 flex h-screen w-64 flex-col border-r",
        chromeClasses,
        className
      )}
    >
      <div className="flex h-full min-h-0 flex-col p-6">
        {/* The app wordmark, not the page title — each page renders its own
            h1. As an h1 itself it gave every page two competing h1s, breaking
            "jump to h1" navigation for screen reader users. */}
        <div className="mb-8 flex shrink-0 items-center gap-3">
          {logo}
          <p className="min-w-0 text-title-lg text-fg">{appName}</p>
        </div>

        {action && <div className="mb-4 shrink-0">{action}</div>}

        <ul className="flex flex-1 flex-col gap-1 overflow-y-auto">
          {navigation.map((item, index) => {
            const Icon = item.icon;
            const active = isActivePath(pathname, item.href);
            // An item opening a new `section` gets its heading above it.
            const heading =
              item.section && item.section !== navigation[index - 1]?.section;
            return (
              <li key={item.name}>
                {heading && (
                  <p className="mb-1 mt-4 px-3 text-caption font-semibold text-fg-muted">
                    {item.section}
                  </p>
                )}
                <Link
                  to={item.href}
                  aria-current={active ? "page" : undefined}
                  className={navItemClasses(active)}
                >
                  {Icon && (
                    <Icon aria-hidden="true" className="h-5 w-5 shrink-0" />
                  )}
                  <span className="truncate">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 shrink-0">{children}</div>
      </div>
    </nav>
  );
}
