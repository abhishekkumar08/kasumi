import { fileURLToPath } from "node:url";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

const here = (path) => fileURLToPath(new URL(path, import.meta.url));

/** @type {import("@storybook/react-vite").StorybookConfig} */
export default {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.jsx"],
  addons: ["@storybook/addon-docs"],
  framework: { name: "@storybook/react-vite", options: {} },
  // Everything in this repo stays local: no usage telemetry, no update pings.
  core: { disableTelemetry: true, disableWhatsNewNotifications: true },
  // The package's vite.config.js is a library build; stories need an app
  // build with Tailwind, so the PostCSS chain is set here instead.
  viteFinal: async (config) => {
    config.build = { ...config.build, lib: undefined };
    config.css = {
      postcss: {
        plugins: [tailwindcss({ config: here("./tailwind.config.js") }), autoprefixer()],
      },
    };
    return config;
  },
};
