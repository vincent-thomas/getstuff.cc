import { button } from "@stuff/ui/button/button.css";
import Link from "next/link";
import { cn } from "packages/components/utils";
import { Logo } from "src/components/logo";
import { StuffBranding } from "./stuff";
import { ThemeBtn } from "./theme-icon";
import { stack } from "src/components/recipies";

export const Navbar = () => (
	<header className="animate-in slide-in-from-top-2 duration-700 fade-in">
		<div
			className={cn(
				css({ padding: "medium" }),
				stack({ direction: "row", align: "center", justify: "between" }),
			)}
		>
			<div className={stack({ direction: "row", gap: "md", align: "center" })}>
				<Link
					href="/"
					className={button({
						variant: "ghost",
						size: "md",
						rounded: "medium",
					})}
				>
					<Logo size={24} color />
					<h1
						className={cn(
							css({ color: "text1", fontWeight: "bold", fontSize: "large" }),
						)}
					>
						<StuffBranding />
					</h1>
				</Link>
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
				<ThemeBtn />
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
