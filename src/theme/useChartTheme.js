"use client";

import { useEffect, useState } from "react";

const SERIES = 8;

// Recharts writes colours into SVG attributes, where var() doesn't resolve,
// so the tokens are read out as concrete rgb()/rgba() strings.
function readChartTheme() {
  if (typeof document === "undefined")
    return { colors: [], grid: "", axis: "", cursor: "" };
  const style = getComputedStyle(document.documentElement);
  const token = (name) => style.getPropertyValue(`--mw-${name}`).trim();
  const rgb = (name, alpha = 1) =>
    `rgba(${token(name).split(/\s+/).join(", ")}, ${alpha})`;
  return {
    colors: Array.from({ length: SERIES }, (_, i) => rgb(`chart-${i + 1}`)),
    // `line` is translucent in glass; its alpha has to come along.
    grid: rgb("line", Number(token("line-alpha") || 1)),
    axis: rgb("fg-muted"),
    cursor: rgb("surface-muted", Number(token("surface-muted-alpha") || 1)),
  };
}

/**
 * Chart colours for the active theme and material: `colors` (series, in
 * order), `grid`, `axis` (tick text) and `cursor` (hover band). Re-reads when
 * the root's theme/material classes change.
 */
export function useChartTheme() {
  const [theme, setTheme] = useState(readChartTheme);

  useEffect(() => {
    // ThemeProvider swaps the classes in its own effect, after this one, so
    // watch the class attribute rather than the context value.
    const observer = new MutationObserver(() => setTheme(readChartTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    setTheme(readChartTheme());
    return () => observer.disconnect();
  }, []);

  return theme;
}
