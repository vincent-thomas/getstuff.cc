/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import { withContentlayer } from "next-contentlayer";
import unimport from "unimport/unplugin";
import million from "million/compiler";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true,
});

const withVE = createVanillaExtractPlugin();

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "standalone",
  experimental: {
    useLightningcss: true,
    ppr: true,
  },
  webpack: config => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    config?.module?.rules?.push({
      test: /\.wasm$/,
      loader: "base64-loader",
      type: "javascript/auto",
    });
    config.stats = "errors-only";

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    config?.plugins?.push(
      unimport.webpack({
        dts: true,
        imports: [
          {
            from: "@/env",
            name: "env",
          },
          {
            from: "@style-system/css",
            name: "css",
          },
          {
            from: "@style-system/utils",
            name: "cn",
          },
          {
            from: "@style-system/patterns",
            name: "stack",
          },
          {
            from: "@style-system/palette",
            name: "palette",
          },
          {
            from: "packages/logger",
            name: "logger",
          },
        ],
      }),
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    config.resolve.fallback = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...config.resolve.fallback,
      fs: false,
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  },
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: "api.dicebear.com",
      },
      {
        hostname: "www.google.com",
        pathname: "/s2/favicons",
      },
    ],
  },
};

export default million.next(
  // @ts-expect-error jag vet
  withBundleAnalyzer(withContentlayer(withVE(config))),
);
