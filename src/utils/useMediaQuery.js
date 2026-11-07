"use client";

import { useEffect, useState } from "react";

const matches = (query) =>
  typeof window !== "undefined" && window.matchMedia(query).matches;

/**
 * Whether a CSS media query matches, kept current as the window changes —
 * for rendering one layout instead of hiding the other with CSS (a hidden
 * copy still sits in the DOM, doubling text for tests and tools).
 * `useMediaQuery("(min-width: 768px)")` follows Tailwind's `md`.
 */
export function useMediaQuery(query) {
  const [match, setMatch] = useState(() => matches(query));
  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMatch(list.matches);
    update();
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, [query]);
  return match;
}
