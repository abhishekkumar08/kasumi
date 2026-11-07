"use client";

import { createContext } from "react";

export const ThemeContext = createContext({
  theme: "light",
  isDark: false,
  /** @param {"light" | "dark"} _theme */
  setTheme: (_theme) => {},
  toggleTheme: () => {},
  /** @type {"glass" | "solid"} */
  material: "glass",
  /** @param {"glass" | "solid"} _material */
  setMaterial: (_material) => {},
  /** @type {string | null} */
  palette: null,
  /** @param {string | null} _palette */
  setPalette: (_palette) => {},
});
