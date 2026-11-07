"use client";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { COMPONENT_COPY } from "../../constants/componentCopy.js";
import { useTheme } from "../../theme";
import { cn } from "../../utils/cn.js";
import { AppSwitcher } from "../AppSwitcher.jsx";
import { isActivePath } from "../navStyles.js";
import { Sidebar } from "../Sidebar.jsx";
import { SupportChatbot } from "../SupportChatbot.jsx";
import { UserMenu } from "../UserMenu.jsx";
import { BottomBar } from "./BottomBar.jsx";
import { MobileTopBar } from "./MobileTopBar.jsx";

/** @param {Parameters<typeof import("../../index").AppLayout>[0]} props */
export function AppLayout({
  appName,
  logo = null,
  navigation,
  children,
  className,
  showAppSwitcher = true,
  customTopBar = null,
  customBottomBar = null,
  bottomNavigation,
  currentUser = null,
  onLogout = null,
  sidebarAction = null,
}) {
  const { isDark, toggleTheme } = useTheme();
  const [helpOpen, setHelpOpen] = useState(false);
  // The support form files tickets into the admin queue, so only admins get it.
  const canFileSupport = currentUser?.role === "ADMIN";
  const { pathname } = useLocation();
  // The bottom bar has room for five destinations; the mobile menu carries
  // the rest.
  const bottomNavItems = bottomNavigation ?? navigation.slice(0, 5);

  // Every route used to share one static <title>, so history, bookmarks and
  // screen readers heard the same name on every navigation.
  useEffect(() => {
    const active = navigation.find((item) => isActivePath(pathname, item.href));
    document.title = active ? `${active.name} · ${appName}` : appName;
  }, [pathname, navigation, appName]);

  return (
    <div className={cn("material-canvas min-h-screen", className)}>
      {/* The sidebar comes before the content in tab order; without this a
          keyboard user tabs through every nav link on every page first. */}
      <a
        href="#main-content"
        className="sr-only rounded-control bg-accent px-4 py-2 text-label text-fg-on-accent focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-skip"
      >
        {COMPONENT_COPY.SKIP_TO_CONTENT}
      </a>

      <div className="fixed inset-y-0 left-0 z-sticky hidden w-64 lg:block">
        <Sidebar
          appName={appName}
          logo={logo}
          navigation={navigation}
          action={sidebarAction}
        >
          {currentUser && onLogout && (
            <UserMenu
              currentUser={currentUser}
              onLogout={onLogout}
              onThemeToggle={toggleTheme}
              isDark={isDark}
            />
          )}
          {showAppSwitcher && (
            <div className="mt-4 border-t border-line pt-4">
              <AppSwitcher className="w-full justify-start" showLabel />
            </div>
          )}
        </Sidebar>
      </div>

      {/* The bottom padding lets the last row scroll clear of the floating
          feedback launcher instead of sitting under it. */}
      <main className="min-w-0 pb-20 lg:ml-64 lg:pb-24">
        {/* Below 1024px the sidebar is hidden, so this is the only route to
            the full navigation, account controls and app switcher. */}
        <MobileTopBar
          appName={appName}
          logo={logo}
          navigation={navigation}
          currentUser={currentUser}
          onLogout={onLogout}
          onThemeToggle={toggleTheme}
          isDark={isDark}
          showAppSwitcher={showAppSwitcher}
          tabs={customBottomBar ? [] : bottomNavItems}
          onHelp={canFileSupport ? () => setHelpOpen(true) : null}
        />
        {/* No default desktop top bar: an app-name-only bar duplicates the
            sidebar's wordmark. Pass customTopBar to opt in to a real one. */}
        {customTopBar && <div className="hidden lg:block">{customTopBar}</div>}
        <div id="main-content" tabIndex={-1} className="p-4 lg:p-6">
          {children}
        </div>
      </main>

      {customBottomBar || (
        <div className="lg:hidden">
          <BottomBar
            navigation={bottomNavItems}
            label={COMPONENT_COPY.NAVIGATION(appName)}
          />
        </div>
      )}
      {canFileSupport && (
        <>
          {/* Below 1024px the floating launcher covers content; Help sits in the
              mobile menu instead. */}
          <SupportChatbot
            appName={appName}
            currentUser={currentUser}
            open={helpOpen}
            onOpenChange={setHelpOpen}
          />
        </>
      )}
    </div>
  );
}
