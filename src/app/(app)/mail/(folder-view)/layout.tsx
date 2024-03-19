import type { LayoutProps } from "src/types/router";
import { unstable_noStore } from "next/cache";
import { Sidebar } from "./views/sidebar";

const Layout = async (props: LayoutProps) => {
  unstable_noStore();

  return (
    <div className="flex h-full min-w-[400px] overflow-hidden">
      <Sidebar />
      <main className="grow">{props.children}</main>
    </div>
  );
};

export default Layout;
