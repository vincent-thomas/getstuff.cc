
import {
  loggerLink,
  httpBatchLink,
  type CreateTRPCClientOptions
} from "@trpc/client";
import { getUrl, transformer } from "./shared";
import type { AppRouter } from "backend";

export const clientOptions: CreateTRPCClientOptions<AppRouter> = {
  links: [
    loggerLink({
      enabled: (op) =>
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
  transformer
}

// export const clientLinks = 