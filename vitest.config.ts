import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import unimport from "unimport/unplugin";
import { unimportPluginConfig } from "./next.config";

export default defineConfig({
  test: {
    globals: true,
    reporters: ["basic"],
  },
  plugins: [tsconfigPaths(), unimport.vite(unimportPluginConfig)],
});
