import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { type AppRouter } from "..";
import { getUrl, transformer } from "./shared";

export const vanillaApi = createTRPCProxyClient<AppRouter>({
  transformer: transformer,
  links: [
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
});
