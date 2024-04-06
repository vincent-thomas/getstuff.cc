"use client";

import { Card } from "./card";
import { border, stack } from "src/components/recipies";
import { button } from "@stuff/ui/button";
import { H2 } from "@stuff/typography";
import { cn } from "@stuff/components/utils";
import { Text1 } from "packages/ui/atoms";
import { Link } from "src/components/structure/link";
import { palette } from "packages/ui/theme";

export const NiceCard = ({
	title,
	desc,
	href,
}: { title: string; desc: string; href: string }) => {
	return (
		<Link href={href} style={{ outlineColor: palette.borderFocus }}>
			<Card
				p="xlarge"
				className={cn(
					border({
						color: "interactive",
						side: "all",
						rounded: "radius",
					}),
					stack({ direction: "col", gap: "md", align: "start" }),
					css({
						cursor: "pointer",
						height: "full",
						width: "full",
						background: { hover: "bgHover", default: "bgSubtle" },
					}),
				)}
			>
				<H2 className={css({ fontSize: "large" })}>{title}</H2>
				<Text1 className="max-w-[45ch]">{desc}</Text1>
				<div
					className={cn(
						css({ marginTop: "auto" }),
						button({ variant: "link", size: "sm" }),
					)}
				>
					Read more
				</div>
			</Card>
		</Link>
	);
};
