import { button } from "@stuff/ui/button/button.css";
import { cn } from "packages/components/utils";
import { Logo } from "src/components/logo";
import { StuffBranding } from "./stuff";
import { stack } from "src/components/recipies";
import { Link } from "src/components/structure/link";

export const Navbar = () => (
	<header className="animate-in slide-in-from-top-2 duration-700 fade-in">
		<div
			className={cn(
				css({ padding: "medium" }),
				stack({ direction: "row", align: "center", justify: "between" }),
			)}
		>
			<div className={stack({ direction: "row", gap: "md", align: "center" })}>
				<div className={stack({ gap: "sm", align: "center" })}>
					<Logo size={24} color />
					<h1
						className={cn(
							css({
								color: "text1",
								fontWeight: "bold",
								fontSize: "large",
							}),
						)}
					>
						<StuffBranding />
					</h1>
				</div>

				<Link
					href="/pricing"
					className={button({
						variant: "ghost",
						size: "md",
						rounded: "medium",
					})}
				>
					Pricing
				</Link>

				<Link
					href="/blog"
					className={button({
						variant: "ghost",
						size: "md",
						rounded: "medium",
					})}
				>
					Blog
				</Link>
			</div>
			<nav className={stack({ direction: "row", gap: "xl", align: "center" })}>
				<Link
					href="/auth/identify"
					className={cn(
						css({ fontWeight: "semibold" }),
						button({ variant: "outline", size: "md", rounded: "medium" }),
					)}
				>
					Login
				</Link>

				<Link
					href="/auth/init"
					className={cn(
						css({ fontWeight: "semibold" }),
						button({ variant: "accent", size: "lg", rounded: "medium" }),
					)}
				>
					Get Stuff free
				</Link>
			</nav>
		</div>
	</header>
);
