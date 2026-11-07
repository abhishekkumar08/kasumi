import "@fontsource-variable/inter";
import "./preview.css";
import { MemoryRouter } from "react-router-dom";
import { NotificationProvider, ThemeProvider } from "../src/index.js";
import { palettes } from "../src/theme/tokens.js";

// Toolbar globals drive the same classes the apps use: `dark` and `glass` on
// <html>, and `data-palette` when a palette is picked (it fixes the theme).
// ThemeProvider reads its storage first, so it is seeded and re-keyed
// whenever a global changes.
function withKasumi(Story, context) {
  const { theme, material, palette } = context.globals;
  const named = palette && palette !== "none" ? palette : null;
  try {
    localStorage.setItem("kasumi-theme", theme);
    localStorage.setItem("kasumi-theme-material", material);
    if (named) localStorage.setItem("kasumi-theme-palette", named);
    else localStorage.removeItem("kasumi-theme-palette");
  } catch {
    // Storage blocked: the provider falls back to its defaults below.
  }
  return (
    <ThemeProvider
      key={`${theme}-${material}-${palette}`}
      defaultTheme={theme}
      defaultMaterial={material}
      defaultPalette={named}
    >
      <MemoryRouter>
        <NotificationProvider>
          <div className="material-canvas min-h-screen p-6 text-fg">
            <Story />
          </div>
        </NotificationProvider>
      </MemoryRouter>
    </ThemeProvider>
  );
}

/** @type {import("@storybook/react-vite").Preview} */
export default {
  decorators: [withKasumi],
  globalTypes: {
    theme: {
      description: "Colour theme",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
    material: {
      description: "Surface material",
      toolbar: {
        title: "Material",
        icon: "paintbrush",
        items: [
          { value: "glass", title: "Glass" },
          { value: "solid", title: "Solid" },
        ],
        dynamicTitle: true,
      },
    },
    palette: {
      description: "Named palette (sets the theme)",
      toolbar: {
        title: "Palette",
        icon: "grid",
        items: [
          { value: "none", title: "None" },
          ...Object.entries(palettes).map(([value, p]) => ({ value, title: p.label })),
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light", material: "glass", palette: "none" },
  parameters: {
    docs: {
      // Component JSDoc carries type-only tags (@param {Parameters<typeof
      // import(...)>[0]}) for the type checker; they aren't prose, and the
      // Markdown renderer reads "<typeof ...>" as an HTML tag.
      extractComponentDescription: (component) =>
        (component?.__docgenInfo?.description ?? "")
          .split("\n")
          .filter((line) => !line.trim().startsWith("@"))
          .join("\n")
          .trim(),
    },
    layout: "fullscreen",
    controls: { expanded: true },
    options: {
      storySort: {
        order: ["Introduction", "Foundations", "Actions", "Forms", "Navigation", "Data display", "Feedback", "Overlays", "Layout", "Practice"],
      },
    },
  },
  tags: ["autodocs"],
};
