/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import { withContentlayer } from "next-contentlayer";
import unimport from "unimport/unplugin";

const withVE = createVanillaExtractPlugin();

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,
	poweredByHeader: false,
	experimental: {
		useLightningcss: true,
	},
	webpack: (config) => {
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
			type: "javascript/auto",
		});

		config.plugins.push(
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
	images: {
		domains: ["api.dicebear.com"],
	},
};

export default withContentlayer(withVE(config));
