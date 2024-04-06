import { cn } from "@stuff/components/utils";
import { H1, H2, P } from "@stuff/typography";
import { button } from "@stuff/ui/button/button.css";
import Link from "next/link";
import { stack } from "packages/ui/patterns/stack";

const Page = () => {
	return (
		<div
			className={cn(
				css({ width: "full", height: "screen" }),
				stack({ justify: "center", align: "center" }),
			)}
		>
			<div className={stack({ direction: "col", gap: "md", align: "start" })}>
				<h2
					className={css({
						color: "text1",
						fontSize: "4xlarge",
						fontWeight: "bolder",
					})}
				>
					404
				</h2>
				<H1 className={css({ color: "text2", fontSize: "xlarge" })}>
					Stuff Mail
				</H1>
				<H2 className={css({ color: "text1", fontSize: "large" })}>
					Page or resouce not found
				</H2>
				<P>
					This page doesn&apos;t seem to exist, or maybe you don&apos;t have
					access to it?
				</P>
				<div className={stack({ gap: "md" })}>
					<Link
						href="/"
						className={cn(
							"mt-4",
							button({ variant: "outline", size: "md", rounded: "medium" }),
						)}
					>
						Go to home
					</Link>
					<Link
						href="/mail/inbox"
						className={cn(
							"mt-4",
							button({ variant: "primary", size: "lg", rounded: "medium" }),
						)}
					>
						Go to inbox
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Page;
