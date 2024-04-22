"use server";

import { action } from "@stuff/lib/safe-action";
import { createUser } from "backend/utils/user";
import { z } from "zod";
import { sendMagicLinkAction } from "../../identify/_components/login-action";

const schema = z.object({
  name: z.string(),
  email: z.string(),
});

export const createUserAction = action(schema, async ({ name, email }) => {
  try {
    await createUser({ email, name });
  } catch {
    throw { message: "Email already exists" };
  }

  await sendMagicLinkAction({ email });
});
