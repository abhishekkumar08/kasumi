import { Grid3x3 } from "lucide-react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { cn } from "../utils/cn.js";

function resolveHostAppsUrl() {
  if (typeof window === "undefined") return "/apps";

  const configuredHost = import.meta.env.VITE_HOST_APP_URL;
  if (configuredHost) {
    return new URL("/apps", configuredHost).toString();
  }

  const { protocol, hostname, port, origin } = window.location;
  if (!hostname || hostname === "localhost" || hostname === "127.0.0.1") {
    if (port === "8080" || port === "3000" || port === "50401") {
      return `${origin}/apps`;
    }
    if (/^300[1-6]$/.test(port)) {
      return `${protocol}//${hostname}:3000/apps`;
    }
    return `${origin}/apps`;
  }

  return `${origin}/apps`;
}

/** @param {Parameters<typeof import("../index").AppSwitcher>[0]} props */
export function AppSwitcher({ className, showLabel = false }) {
  const handleClick = () => {
    window.location.href = resolveHostAppsUrl();
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={cn(
        "inline-flex min-h-10 items-center gap-3 rounded-control p-2 transition-colors duration-fast hover:bg-surface-muted focus-ring",
        className
      )}
      title={COMPONENT_COPY.APP_SWITCHER_HINT}
      aria-label={COMPONENT_COPY.APP_SWITCHER}
    >
      <Grid3x3 className="h-5 w-5 text-fg-muted" aria-hidden />
      {showLabel && (
        <span className="text-label text-fg">
          {COMPONENT_COPY.APP_SWITCHER}
        </span>
      )}
    </button>
  );
}
