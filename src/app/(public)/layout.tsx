import { Navbar } from "./_components/navbar";
import { CookieTeller } from "./_components/cookie-teller";
import type { LayoutProps } from "src/types/router";
import { stack } from "src/components/recipies";
import { Footer } from "./_components/footer";

const Layout = (props: LayoutProps) => (
	<div
		className={cn(
			css({ overflowX: "hidden", minHeight: "screen" }),
			stack({ direction: "col" }),
		)}
	>
		<CookieTeller />
		<Navbar />
		{props.children}
		<div className={css({ marginBottom: "2xlarge", marginTop: "auto" })}>
			<div className={css({ marginTop: "2xlarge" })}>
				<Footer />
			</div>
		</div>
	</div>
);

export default Layout;
