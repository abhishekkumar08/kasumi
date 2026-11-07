import { realpathSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { searchForWorkspaceRoot } from "vite";

// Real path of this package, even when an app reaches it through a symlink
// (a `file:` install).
const kasumiRoot = realpathSync(dirname(fileURLToPath(import.meta.url)));

/**
 * Vite plugin for apps that install Kasumi from a local folder.
 *
 * - dedupe: the linked folder has its own node_modules, and two copies of
 *   React (or of react-router's context) break hooks and links. Icons too:
 *   Vite may pre-bundle Kasumi's older lucide-react, which then lacks icons
 *   the app imports.
 * - fs.allow: Vite only serves files under the app's workspace root; the
 *   linked source lives outside it. Setting `allow` turns off Vite's own
 *   workspace detection, so the workspace root is added back explicitly.
 */
export function kasumi() {
  return {
    name: "kasumi",
    config(config) {
      return {
        resolve: { dedupe: ["react", "react-dom", "react-router-dom", "lucide-react"] },
        server: {
          fs: {
            allow: [
              searchForWorkspaceRoot(config.root ?? process.cwd()),
              kasumiRoot,
            ],
          },
        },
      };
    },
  };
}
