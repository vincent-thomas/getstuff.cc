"use server";

import { protectedProc } from "@stuff/lib/safe-action";
import { db } from "@backend/db";
import { z } from "zod";
import { changeAliasStatusActionHandler } from "./toggle-alias-action-handler";

const schema = z.object({ aliasId: z.string(), enabled: z.boolean() });

export const changeAliasStatusAction = protectedProc(
  schema,
  async ({ aliasId, enabled }, { session }) =>
    changeAliasStatusActionHandler({
      clients: { db },
      data: { aliasId, enabled, userId: session.userId },
    }),
);
