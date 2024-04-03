import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";

import { createContext } from "backend/trpc";
import { appRouter } from "backend";

const handler = (req: NextRequest) =>
	fetchRequestHandler({
		endpoint: "/api/rpc",
		req,

		router: appRouter,
		createContext: () => createContext({ req }),
		onError:
			env.NODE_ENV === "development"
				? ({ path, error }) => {
						console.error(
							`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
						);
					}
				: undefined,
	});

export { handler as GET, handler as POST };
