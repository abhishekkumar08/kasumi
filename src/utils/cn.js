import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { semanticSpacing } from "../theme/spacing.js";
import { typography } from "../theme/typography.js";

// tailwind-merge has to be told our type roles are font sizes; otherwise it
// reads `text-title` as a colour and drops it when a caller adds `text-fg`.
const merge = extendTailwindMerge({
  extend: {
    theme: { spacing: Object.keys(semanticSpacing) },
    classGroups: {
      "font-size": [{ text: Object.keys(typography) }],
      shadow: [{ shadow: ["raised", "overlay", "modal"] }],
      rounded: [{ rounded: ["control", "card", "overlay", "pill"] }],
    },
  },
});

// Later classes win, so a caller's `className` overrides component defaults.
export const cn = (...inputs) => merge(clsx(inputs));
