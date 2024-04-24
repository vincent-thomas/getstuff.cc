"use server";

import { verifyJwt } from "@backend/utils/jwt";
import { cookies } from "next/headers";

export const getUser = async () => {
  const token = cookies().get("token")?.value;

  if (token === undefined) {
    return null;
  }

  try {
    const session = await verifyJwt(token);
    return session;
  } catch (e) {
    console.error(e);
    return null;
  }
};
