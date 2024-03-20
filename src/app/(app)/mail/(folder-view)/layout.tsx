import type { LayoutProps } from "src/types/router";
import { unstable_noStore } from "next/cache";
import { Sidebar } from "./views/sidebar";

const Layout = async (props: LayoutProps) => {
  unstable_noStore();

  return (
    <div className={`flex h-full overflow-hidden gap-space-md bg-accent`}>
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
