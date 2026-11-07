"use client";

import { useContext } from "react";
import { NotificationContext } from "./NotificationContext.js";

/**
 * The context is created with `null`, so TypeScript call sites cannot see the
 * shape through inference alone — this annotation is what makes `notify` and
 * friends callable from the .tsx apps.
 *
 * @returns {{
 *   notify: (message: string, variant?: "success" | "error" | "warning" | "info") => void,
 *   confirmAction: (options: object) => Promise<boolean>,
 *   promptAction: (options: object) => Promise<string | null>,
 * }}
 */
export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within NotificationProvider"
    );
  }
  return context;
}
