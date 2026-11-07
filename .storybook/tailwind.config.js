import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { sharedTailwindConfig } from "../tailwind.config.js";

// Plain paths, not new URL(): URL percent-encodes the {js,jsx} glob braces.
const here = dirname(fileURLToPath(import.meta.url));

export default {
  ...sharedTailwindConfig,
  content: [
    resolve(here, "../src/**/*.{js,jsx}"),
    resolve(here, "../stories/**/*.{js,jsx,mdx}"),
    resolve(here, "./**/*.{js,jsx}"),
  ],
  // Foundations/Tokens renders every type role by name.
  safelist: [
    ...sharedTailwindConfig.safelist,
    { pattern: /^text-(display|headline|title-lg|title|body-lg|body|label|caption)$/ },
    { pattern: /^text-code-(keyword|string|number|comment|function|type)$/ },
  ],
};
