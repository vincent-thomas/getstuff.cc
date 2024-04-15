import { createTRPCProxyClient } from "@trpc/client";
import { type AppRouter } from "..";
import { clientOptions } from "./client-options";

export const vanillaApi = createTRPCProxyClient<AppRouter>(clientOptions);
