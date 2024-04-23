"use server";

import { publicProc } from "@stuff/lib/safe-action";
import { createUser } from "@backend/utils/user";
import { z } from "zod";
import { sendMagicLinkAction } from "../../identify/_components/login-action";

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const createUserAction = publicProc(schema, async ({ name, email }) => {

  if (email.endsWith(`@${env.NEXT_PUBLIC_DOMAIN}`)) {
    throw { message: "Can't register with getstuff.cc domain" }
  }

  try {
    await createUser({ email, name });
  } catch {
    throw { message: "Email already exists" };
  }

  await sendMagicLinkAction({ email });
});
