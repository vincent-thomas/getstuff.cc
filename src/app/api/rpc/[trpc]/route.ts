import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";
import { env } from "@/env";
import { appRouter } from "backend";
import { createContext } from "backend/trpc";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/rpc",
    req,

    router: appRouter,
    createContext: () => {
      const cookies = req.cookies.getAll();
      const betterCookies = {};

      for (const item of cookies) {
        // @ts-expect-error test
        betterCookies[item.name] = item.value;
      }

      return createContext({ cookies: betterCookies });
    },
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : ({ path, error }) =>
            logger.error(
              `Unknown error path=${path} cause=${error.cause} error=${error.message}`,
            ),
  });

export { handler as GET, handler as POST };
