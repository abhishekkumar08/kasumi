import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.js",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: [
        "framer-motion",
        "lucide-react",
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react-router-dom",
      ],
    },
  },
});
