import { build } from "esbuild";
import { resolve } from "path";

await build({
  entryPoints: [resolve("packages/mail-reciever/src/main.ts")],
  bundle: true,
  outdir: resolve("packages/mail-reciever/dist"),
  platform: "node",
  format: "esm",
  external: ["@/env"],
  minify: false,
  treeShaking: false,
  sourcemap: true,
});
