import type { LayoutProps } from "src/types/router";
import { unstable_noStore } from "next/cache";
import { Sidebar } from "./views/sidebar";

const Layout = async (props: LayoutProps) => {
  unstable_noStore()

  return (
    <div className={`flex h-full min-w-[400px] overflow-hidden gap-space-md bg-accent p-space-md`}>
      <Sidebar />
      <main className="grow bg-background rounded-lg h-full border-border border">
        {props.children}
      </main>
    </div>
  );
};

export default Layout;
