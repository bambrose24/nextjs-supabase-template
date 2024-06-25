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
import { ZodError } from "zod";

import { db } from "~/server/db";
import { supabaseServer } from "~/util/supabase/server";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const supabase = supabaseServer();
  const {
    data: { user: supabaseUser },
  } = await supabase.auth.getUser();

  // NOTE: you can query a `user` table here if you want to based on the supabase email

  return {
    db,
    supabaseUser,
    ...opts,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

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
export const createTRPCRouter = t.router;

const LOG_PREFIX = `[trpc]`;

/**
 * Global procedure with top-level logging middleware.
 */
const procedure = t.procedure.use(async ({ path, type, next }) => {
  const start = Date.now();
  const typeAndPath = { trpcPath: path, trpcType: type };

  // NOTE: you can add a different logger here if you want, like Winston.
  console.info(`${LOG_PREFIX} starting trpc request handling`, {
    ...typeAndPath,
  });
  const result = await next();
  const durationMs = Date.now() - start;

  console.info(`${LOG_PREFIX} tRPC request ended`, {
    ...typeAndPath,
    trpcRequestDurationMs: durationMs,
    ok: result.ok,
    ...(result.ok === false
      ? {
          trpcError: result.error.message,
          trpcErrorCode: result.error.code,
          ...(result.error.stack ? { trpcErrorStack: result.error.stack } : {}),
        }
      : {}),
  });
  return result;
});

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = procedure;

/**
 * A procedure that enforces that a Supabase user is present.
 */
export const authroizedProcedure = procedure.use(async ({ ctx, next }) => {
  if (!ctx.supabaseUser) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to do that.",
    });
  }
  const result = await next();
  return result;
});
