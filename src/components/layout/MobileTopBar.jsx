"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LifeBuoy, Menu, Moon, Sun, X } from "lucide-react";
import { COMPONENT_COPY, SUPPORT_COPY } from "../../constants/componentCopy.js";
import { cn } from "../../utils/cn.js";
import { AppSwitcher } from "../AppSwitcher.jsx";
import { IconButton } from "../IconButton.jsx";
import { chromeClasses, isActivePath, navItemClasses } from "../navStyles.js";

/**
 * The mobile counterpart to the desktop sidebar.
 *
 * `AppLayout` hides the desktop sidebar below 1024px, and everything that
 * lived inside it went with it: the logout control, the theme toggle and the app
 * switcher. The bottom bar only carries `navigation.slice(0, 5)`, so on a phone
 * seven of Expense Tracker's twelve pages had no route to them at all, and no
 * account could be signed out of — which is also why signing in as somebody else
 * was impossible.
 *
 * This restores all of it behind a menu button: every route the bottom bar
 * (`tabs`) does not already show, plus the account and appearance controls.
 *
 * @param {Parameters<typeof import("../../index").MobileTopBar>[0]} props
 */
export function MobileTopBar({
  appName,
  logo = null,
  navigation = [],
  currentUser = null,
  onLogout = null,
  onThemeToggle = null,
  isDark = false,
  showAppSwitcher = true,
  tabs = [],
  onHelp = null,
}) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);

  // Route changes come from tapping a link inside the drawer, so the drawer
  // should get out of the way rather than sit over the page it just opened.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
        triggerRef.current?.focus();
      }
    };

    // Move focus into the drawer so a keyboard or screen-reader user is not left
    // behind on the page underneath, and stop that page scrolling.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  const accountName = currentUser?.displayName || currentUser?.email || "";
  const tabHrefs = new Set(tabs.map((item) => item.href));
  const menuItems = navigation.filter((item) => !tabHrefs.has(item.href));

  return (
    <>
      <div
        className={cn(
          "sticky top-0 z-sticky border-b lg:hidden",
          chromeClasses
        )}
      >
        <div className="flex items-center justify-between gap-2 px-4 py-2">
          <span className="flex min-w-0 items-center gap-2">
            {logo}
            <span className="truncate text-body-lg font-semibold text-fg">
              {appName}
            </span>
          </span>
          <IconButton
            ref={triggerRef}
            icon={Menu}
            label={COMPONENT_COPY.OPEN_MENU}
            aria-expanded={open}
            onClick={() => setOpen(true)}
          />
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-modal lg:hidden">
          <button
            type="button"
            aria-label={COMPONENT_COPY.CLOSE_MENU}
            onClick={close}
            className="absolute inset-0 h-full w-full cursor-default bg-scrim/60"
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={COMPONENT_COPY.MENU_LABEL(appName)}
            tabIndex={-1}
            className="material-overlay absolute inset-y-0 right-0 flex w-[85%] max-w-xs flex-col overflow-y-auto shadow-modal outline-none animate-enter"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-2">
              <span className="text-label font-semibold text-fg">
                {COMPONENT_COPY.MENU}
              </span>
              <IconButton
                icon={X}
                label={COMPONENT_COPY.CLOSE_MENU}
                onClick={close}
              />
            </div>

            <nav
              aria-label={COMPONENT_COPY.NAVIGATION(appName)}
              className="flex-1 p-3"
            >
              <ul className="space-y-1">
                {menuItems.map((item) => {
                  const ItemIcon = item.icon;
                  const active = isActivePath(location.pathname, item.href);
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        aria-current={active ? "page" : undefined}
                        className={navItemClasses(active)}
                      >
                        {ItemIcon && (
                          <ItemIcon
                            className="h-5 w-5 flex-shrink-0"
                            aria-hidden
                          />
                        )}
                        <span className="truncate">{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {(onThemeToggle || onHelp) && (
              <div className="space-y-1 border-t border-line p-3">
                {onHelp && (
                  <button
                    type="button"
                    onClick={() => {
                      close();
                      onHelp();
                    }}
                    className={cn(navItemClasses(false), "w-full text-left")}
                  >
                    <LifeBuoy className="h-5 w-5 flex-shrink-0" aria-hidden />
                    <span className="truncate">{SUPPORT_COPY.LAUNCHER}</span>
                  </button>
                )}
                {onThemeToggle && (
                  <button
                    type="button"
                    onClick={onThemeToggle}
                    className={cn(navItemClasses(false), "w-full text-left")}
                  >
                    {isDark ? (
                      <Sun className="h-5 w-5 flex-shrink-0" aria-hidden />
                    ) : (
                      <Moon className="h-5 w-5 flex-shrink-0" aria-hidden />
                    )}
                    <span className="truncate">
                      {isDark
                        ? COMPONENT_COPY.SWITCH_TO_LIGHT
                        : COMPONENT_COPY.SWITCH_TO_DARK}
                    </span>
                  </button>
                )}
              </div>
            )}

            {showAppSwitcher && (
              <div className="border-t border-line p-3">
                <AppSwitcher className="w-full justify-start" showLabel />
              </div>
            )}

            {currentUser && onLogout && (
              <div className="border-t border-line p-3">
                {accountName && (
                  <p className="truncate px-3 pb-2 text-caption text-fg-muted">
                    {COMPONENT_COPY.SIGNED_IN_AS(accountName)}
                  </p>
                )}
                <button
                  type="button"
                  onClick={onLogout}
                  className="min-h-10 w-full rounded-control px-3 py-2 text-left text-label text-error-fg transition-colors duration-fast hover:bg-error-subtle focus-ring"
                >
                  {COMPONENT_COPY.SIGN_OUT}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
