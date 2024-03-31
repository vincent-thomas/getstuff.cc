import type { LayoutProps } from "src/types/router";
import { Sidebar } from "./views/sidebar";
import { api } from "@stuff/api-client/server";
import { redirect } from "next/navigation";
import { css } from "styled-system/css";
import { flex } from "styled-system/patterns";

const Layout = async (props: LayoutProps) => {
  const session = await api.user.session.query();
  if (session === null) {
    redirect("/auth/identify");
  }

  return (
    <div className={flex({h: "full", bg: "background.2", flexDirection: "column-reverse", md: {flexDir: "row"}})}>
      <div className={css({p: "md", pr: "none"})}>
        <Sidebar />
      </div>
      <div className={css({md: {p: "md"}, flexGrow: "1", overflowY: "hidden"})}>
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
