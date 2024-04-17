import "server-only";

import { TRPCClientError, createTRPCProxyClient } from "@trpc/client";
import { callProcedure } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import type { TRPCErrorResponse } from "@trpc/server/rpc";
import { cookies, headers } from "next/headers";
import { cache } from "react";

import { getUserFromHeader } from "backend/utils/getUserFromHeaders";
import { type AppRouter, appRouter } from "..";
import { createContextInner } from "../trpc";
import { transformer } from "./shared";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  const username = cookies().get("stuff-active")?.value ?? "";

  const session = await getUserFromHeader({
    "stuff-active": username ?? "",
    [`stuff-token-${username}`]:
      cookies().get(`stuff-token-${username}`)?.value ?? "",
  });

  const contextInner = await createContextInner({
    session,
  });

  return {
    ...contextInner,
  };
});

export const api = createTRPCProxyClient<AppRouter>({
  transformer,
  links: [
    /**
     * Custom RSC link that lets us invoke procedures without using http requests. Since Server
     * Components always run on the server, we can just call the procedure as a function.
     */
    () =>
      ({ op }) =>
        observable(observer => {
          createContext()
            .then(ctx => {
              return callProcedure({
                procedures: appRouter._def.procedures,
                path: op.path,
                rawInput: op.input,
                ctx: ctx,
                type: op.type,
              });
            })
            .then(data => {
              observer.next({ result: { data } });
              observer.complete();
            })
            .catch((cause: TRPCErrorResponse) => {
              console.error("ERROR", cause);
              observer.error(TRPCClientError.from(cause));
            });
        }),
  ],
});
