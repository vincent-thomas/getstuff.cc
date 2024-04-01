/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import  { ZodError, type z } from "zod";
import { jwtPayloadValidator } from "./utils/jwt";
import { getRedis, getDyn, getS3,getSes } from "./sdks";
import type { NextRequest } from "next/server";
import { getUserFromHeader } from "./utils/getUserFromHeaders";

const sessionType = jwtPayloadValidator.nullable();

interface CreateInnerContextOptions {
  session: z.infer<typeof sessionType>;
}

/**
 * Inner context. Will always be available in your procedures, in contrast to the outer context.
 *
 * Also useful for:
 * - testing, so you don't have to mock Next.js' `req`/`res`
 * - tRPC's `createServerSideHelpers` where we don't have `req`/`res`
 *
 * @link https://trpc.io/docs/v11/context#inner-and-outer-context
 */
export const createContextInner = async (opts: CreateInnerContextOptions) => {
  const dyn = getDyn();
  const redis = await getRedis();
  const s3 = getS3();
  const ses = getSes();
  return {
    session: opts.session,
    dyn,
    redis,
    s3,
    ses,
    env
  };
};
/**
 * Outer context. Used in the routers and will e.g. bring `req` & `res` to the context as "not `undefined`".
 *
 * @link https://trpc.io/docs/v11/context#inner-and-outer-context
 */
export async function createContext(opts: { req: NextRequest }) {
  const redis = await getRedis();
  const active = opts.req.cookies.get("stuff-active")?.value ?? "";
  const token = opts.req.cookies.get(`stuff-token-${active}`)?.value ?? "";
  const session = await getUserFromHeader(
    {
      "stuff-active": active,
      [`stuff-token-${active}`]: token
    },
    redis
  );
  const contextInner = await createContextInner({ session });
  return {
    ...contextInner
  };
}

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
      }
    };
  }
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const router = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const pubProc = t.procedure;

export const protectedProc = t.procedure.use(async function isAuthed(opts) {
  const { ctx } = opts;

  // `ctx.user` is nullable
  if (!ctx.session) {
    //     ^?
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({
    ctx: {
      // ✅ user value is known to be non-null now
      ...ctx,
      session: ctx.session
      // ^?
    }
  });
});

