import { unstable_noStore as noStore } from "next/cache";

import { api } from "@stuff/api-client/server";
import { redirect } from "next/navigation";

export default async function Home() {
  noStore();
  const user = await api.user.encryptedData.query().catch(() => {
    redirect("/auth/identify");
  });
  return <>{JSON.stringify(user)}</>;
}
