import { stack } from "src/components/recipies";
import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";
import type { ReactNode } from "react";
import { CookieTeller } from "./_components/cookie-teller";

const Layout = ({children}: {children: ReactNode}) => (
  <div
    className={cn(
      css({ overflowX: "hidden", minHeight: "screen" }),
      stack({ direction: "col" }),
    )}
  >
    <CookieTeller />
    <Navbar />
    {children}
    <div className={css({ marginBottom: "2xlarge", marginTop: "auto" })}>
      <div className={css({ marginTop: "2xlarge" })}>
        <Footer />
      </div>
    </div>
  </div>
);

export default Layout;
