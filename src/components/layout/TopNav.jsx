import { ChevronDown, Menu as MenuIcon } from "lucide-react";
import { COMPONENT_COPY } from "../../constants/componentCopy.js";
import { cn } from "../../utils/cn.js";
import { Button } from "../Button.jsx";
import { buttonClasses } from "../classes.js";
import { IconButton } from "../IconButton.jsx";
import { Menu } from "../Menu.jsx";
import { chromeClasses } from "../navStyles.js";

const target = (item) => (item.href ? { href: item.href } : { to: item.to });

// Static strings so Tailwind sees them: [inline nav, folded menu].
const collapse = {
  md: ["md:flex", "md:hidden"],
  lg: ["lg:flex", "lg:hidden"],
  xl: ["xl:flex", "xl:hidden"],
};

/**
 * A top bar for apps that navigate across the top rather than from a
 * sidebar: `brand` on the left, then `items`, then `actions` on the right.
 * An item is a link, `{ label, href | to, active }`, or a group, `{ label,
 * items: [links] }`, which opens as a dropdown Menu. Below `collapseBelow`
 * (default `md`) every link folds into one menu. `fluid` spans the window
 * instead of the 7xl column. `linkAs` is the router's Link when items use `to`.
 *
 * @param {Parameters<typeof import("../../index").TopNav>[0]} props
 */
export function TopNav({
  brand,
  items,
  actions,
  label = COMPONENT_COPY.MAIN_NAVIGATION,
  linkAs: LinkTag = "a",
  collapseBelow = "md",
  fluid = false,
  className,
}) {
  const [inline, folded] = collapse[collapseBelow] ?? collapse.md;
  const asMenuItem = (item) => ({
    label: item.label,
    group: item.group,
    as: item.to ? LinkTag : undefined,
    ...target(item),
  });
  const allLinks = items.flatMap((item) =>
    item.items ? item.items.map((link) => ({ ...link, group: item.label })) : [item]
  );

  return (
    <header
      className={cn("sticky top-0 z-sticky border-b", chromeClasses, className)}
    >
      <div className={cn("mx-auto flex h-14 items-center gap-6 px-gutter", !fluid && "max-w-7xl")}>
        <div className="flex min-w-0 shrink items-center truncate">{brand}</div>
        <nav
          aria-label={label}
          className={cn("hidden min-w-0 flex-1 items-center gap-1", inline)}
        >
          {items.map((item) => {
            if (item.items) {
              const active = item.items.some((link) => link.active);
              return (
                <Menu
                  key={item.label}
                  label={item.label}
                  align="start"
                  items={item.items.map(asMenuItem)}
                  trigger={
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(active && "bg-accent-subtle text-fg")}
                    >
                      {item.label}
                      <ChevronDown aria-hidden="true" className="h-4 w-4" />
                    </Button>
                  }
                />
              );
            }
            return (
              <LinkTag
                key={item.label}
                {...target(item)}
                aria-current={item.active ? "page" : undefined}
                className={buttonClasses({
                  variant: "ghost",
                  size: "sm",
                  className: item.active && "bg-accent-subtle text-fg",
                })}
              >
                {item.label}
              </LinkTag>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {actions}
          {allLinks.length > 0 && (
            <div className={folded}>
              <Menu
                label={COMPONENT_COPY.MENU}
                items={allLinks.map(asMenuItem)}
                trigger={
                  <IconButton
                    icon={MenuIcon}
                    label={COMPONENT_COPY.OPEN_MENU}
                  />
                }
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
