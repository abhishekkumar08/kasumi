"use client";

import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext.js";
import { palettes } from "./tokens.js";

const MATERIALS = ["glass", "solid"];

/** @param {string} key @returns {"glass" | "solid" | null} */
const readStoredMaterial = (key) => {
  try {
    const stored = localStorage.getItem(key);
    return stored === "glass" || stored === "solid" ? stored : null;
  } catch {
    return null;
  }
};

/** @param {string} key @returns {string | null} */
const readStoredPalette = (key) => {
  try {
    const stored = localStorage.getItem(key);
    return stored && stored in palettes ? stored : null;
  } catch {
    return null;
  }
};

/** @param {unknown} id @returns {id is keyof typeof palettes} */
const isPalette = (id) => typeof id === "string" && id in palettes;

/** @param {keyof typeof palettes} id */
const paletteMode = (id) => /** @type {"light" | "dark"} */ (palettes[id].mode);

/** @param {Parameters<typeof import("../index").ThemeProvider>[0]} props */
export const ThemeProvider = ({
  children,
  defaultTheme = "light",
  defaultMaterial = "glass",
  defaultPalette = null,
  storageKey = "kasumi-theme",
}) => {
  const materialKey = `${storageKey}-material`;
  const paletteKey = `${storageKey}-palette`;
  // Read synchronously: an effect would paint one frame in the wrong colours.
  const [palette, setPaletteState] = useState(
    /** @returns {string | null} */
    () => readStoredPalette(paletteKey) ?? (isPalette(defaultPalette) ? defaultPalette : null)
  );
  const [theme, setThemeState] = useState(
    /** @returns {"light" | "dark"} */
    () => (isPalette(palette) ? paletteMode(palette) : defaultTheme)
  );
  const [material, setMaterialState] = useState(
    /** @returns {"glass" | "solid"} */
    () => readStoredMaterial(materialKey) ?? defaultMaterial
  );

  useEffect(() => {
    // A palette fixes the mode; a stored light/dark only applies without one.
    if (palette) return;
    const stored = localStorage.getItem(storageKey);
    if (stored && (stored === "light" || stored === "dark")) {
      setThemeState(stored);
    }
  }, [storageKey, palette]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("kasumi-theme-light", "kasumi-theme-dark");
    root.classList.remove("light", "dark");
    root.classList.add(`kasumi-theme-${theme}`);
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (palette) root.setAttribute("data-palette", palette);
    else root.removeAttribute("data-palette");
  }, [palette]);

  const setTheme = (newTheme) => {
    if (newTheme === "light" || newTheme === "dark") {
      // Choosing light or dark leaves any palette: the mode's own colours apply.
      setPaletteState(null);
      localStorage.removeItem(paletteKey);
      setThemeState(newTheme);
      localStorage.setItem(storageKey, newTheme);
    }
  };

  /** @param {string | null} id */
  const setPalette = (id) => {
    if (id === null) {
      setPaletteState(null);
      localStorage.removeItem(paletteKey);
      return;
    }
    if (!isPalette(id)) return;
    setPaletteState(id);
    localStorage.setItem(paletteKey, id);
    setThemeState(paletteMode(id));
  };

  useEffect(() => {
    document.documentElement.classList.toggle("glass", material === "glass");
  }, [material]);

  const setMaterial = (newMaterial) => {
    if (!MATERIALS.includes(newMaterial)) return;
    setMaterialState(newMaterial);
    localStorage.setItem(materialKey, newMaterial);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === "dark",
        setTheme,
        toggleTheme,
        material,
        setMaterial,
        palette,
        setPalette,
      }}
    >
      <div className={`kasumi-theme-${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
