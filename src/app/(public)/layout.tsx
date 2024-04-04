import { Navbar } from "./_components/navbar";
import { CookieTeller } from "./_components/cookie-teller";
import type { LayoutProps } from "src/types/router";
import { stack } from "src/components/recipies";
import { Footer } from "./_components/footer";

const Layout = (props: LayoutProps) => (
	<div className={stack({ direction: "col" })}>
		<CookieTeller />
		<Navbar />
		{props.children}
		<div className={css({ marginBottom: "2xlarge", marginTop: "xlarge" })}>
			<Footer />
		</div>
	</div>
);

export default Layout;
