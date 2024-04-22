"use server";

import { action } from "@stuff/lib/safe-action";
import { cookies } from "next/headers";
import { z } from "zod";

// biome-ignore lint/suspicious/useAwait: server actions need to be 'async'
export const signOutAction = action(z.undefined(), async () => {
  cookies().delete("token");
});
