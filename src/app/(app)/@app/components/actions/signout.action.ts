"use server";

import { protectedProc } from "@stuff/lib/safe-action";
import { cookies } from "next/headers";
import { z } from "zod";

// biome-ignore lint/suspicious/useAwait: server actions need to be 'async'
export const signOutAction = protectedProc(z.undefined(), async () => {
  cookies().delete("token");
});
