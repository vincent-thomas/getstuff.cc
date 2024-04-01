import type { LayoutProps } from "src/types/router";
import { Sidebar } from "./views/sidebar";
import { api } from "@stuff/api-client/server";
import { redirect } from "next/navigation";
import { stack } from "src/components/recipies";
import { cn } from "@stuff/components/utils";
import { css } from "src/components/styler.css";

const Layout = async (props: LayoutProps) => {
  const session = await api.user.session.query();
  if (session === null) {
    redirect("/auth/identify");
  }

  return (
    <div
      style={{height: "100%"}}
      className={cn(
        css({bg: "bg2"}),
        stack({direction: {mobile: "reverse-col", tablet: "row"}})
      )}
    >
      <div className={css({p: "medium", paddingRight: "none"})}>
        <Sidebar />
      </div>
      <div className={css({p: "small"})} style={{flexGrow: "1", overflowBlock: "hidden"}}>
        {props.children}
      </div>
    </div>
  );
};

export default Layout;