import type { LayoutProps } from "src/types/router";
import { Sidebar } from "./views/sidebar";
import { api } from "@stuff/api-client/server";
import { redirect } from "next/navigation";

const Layout = async (props: LayoutProps) => {
  const session = await api.user.session.query();
  if (session === null) {
    redirect("/auth/identify");
  }

  return (
    <div className={`flex h-full overflow-hidden bg-accent`}>
      <div className="p-space-md">
        <Sidebar />
      </div>
      <div className="pt-space-md pr-space-md w-full">
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
