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
    <div className={`flex h-full bg-background2 flex-col-reverse md:flex-row`}>
      <div className="p-space-md pr-0">
        <Sidebar />
      </div>
      <div className="md:p-space-md grow overflow-y-hidden">
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
