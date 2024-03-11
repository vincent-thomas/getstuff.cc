import { build } from "esbuild";
import { resolve } from "path";

await build({
  entryPoints: [resolve("packages/mail-reciever/src/main.ts")],
  bundle: true,
  outdir: resolve("packages/mail-reciever/dist"),
  platform: "node",
  format: "cjs",
  minify: false,
  treeShaking: true,
  sourcemap: true
});
