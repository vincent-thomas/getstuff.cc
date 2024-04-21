import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { verifyJwt } from "backend/utils/jwt";

export default async function RootLayout(props: { homepage: ReactNode; app: ReactNode }) {
  const token = cookies().get("token")?.value || "";
  try {
    await verifyJwt(token);

    return <>{props.app}</>;
  } catch {
    // not empy
  }
  return props.homepage;
}

