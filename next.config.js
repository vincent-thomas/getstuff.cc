// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

import {createVanillaExtractPlugin} from "@vanilla-extract/next-plugin";
import { withContentlayer } from "next-contentlayer"

const withVE = createVanillaExtractPlugin();

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  webpack: config => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    config?.module?.rules?.push({
      test: /\.wasm$/,
      // Tells WebPack that this module should be included as
      // raw-encoded binary file and not as code
      loader: "base64-loader",
      // Disables WebPack's opinion where WebAssembly should be,
      // makes it think that it's not WebAssembly
      //
      // Error: WebAssembly module is included in initial chunk.
      type: "javascript/auto"
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    config.resolve.fallback = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...config.resolve.fallback,
      fs: false
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  }
};

export default withContentlayer(withVE(config));
