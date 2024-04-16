import {
  type CreateTRPCClientOptions,
  httpBatchLink,
  loggerLink,
} from "@trpc/client";
import type { AppRouter } from "backend";
import { getUrl, transformer } from "./shared";

export const clientOptions: CreateTRPCClientOptions<AppRouter> = {
  links: [
    loggerLink({
      enabled: op =>
        process.env.NODE_ENV === "development" ||
        (op.direction === "down" && op.result instanceof Error),
    }),
    httpBatchLink({
      url: getUrl(),
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
    }),
  ],
  transformer,
};

// export const clientLinks =
