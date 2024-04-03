import { Navbar } from "./_components/navbar";
import { CookieTeller } from "./_components/cookie-teller";
import type { LayoutProps } from "src/types/router";
import { stack } from "src/components/recipies";

const Layout = (props: LayoutProps) => (
	<div className={stack({ direction: "col" })}>
		<CookieTeller />
		<Navbar />
		{props.children}
	</div>
);

export default Layout;
