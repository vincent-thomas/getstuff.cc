import { Section } from "./section";
import Link from "next/link";
import { button } from "@stuff/ui/button/button.css";
import { stack } from "packages/ui/patterns/stack";

export const Footer = () => {
	return (
		<footer
			className={css({ width: "full", p: "large", paddingBottom: "2xlarge" })}
		>
			<Section maxWidth="lg">
				<div className={stack({ justify: "between" })}>
					<div className={stack({ align: "center", gap: "sm" })}>
						<p>Stuff © {new Date().getFullYear()}</p>
						<span>•</span>
						<a
							href="https://github.com/vincent-thomas"
							target="_blank"
							className={button({ variant: "link" })}
							rel="noreferrer"
						>
							Vincent Thomas
						</a>
					</div>
					<div className={stack({ gap: "lg" })}>
						<Link href="/cookies" className={button({ variant: "link" })}>
							Cookies
						</Link>
						<Link
							href="/privacy-policy"
							className={button({ variant: "link" })}
						>
							Privacy policy
						</Link>
					</div>
				</div>
			</Section>
		</footer>
	);
};
