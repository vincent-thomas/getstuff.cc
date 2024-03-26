import { Navbar } from "./_components/navbar";
import { CookieTeller } from "./_components/cookie-teller";
import type { LayoutProps } from "src/types/router";


const Layout = (props: LayoutProps) => (
  <>
    <CookieTeller />
    <Navbar />
    <main className="flex flex-col">
      {props.children}
    </main>
  </>
)

export default Layout;