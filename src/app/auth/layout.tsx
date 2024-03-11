import { api } from "@stuff/api-client/server";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  unstable_noStore();
  if (await api.user.session.query()) {
    redirect("/app");
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col gap-4 rounded p-6 text-center">
        {children}
        <p className="text-muted-foreground">
          By clicking submit you agree to the <br />
          terms and conditions
        </p>
      </div>
    </div>
  );
};

export default Layout;
