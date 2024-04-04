"use client";

import { Card } from "./card";
import { border, stack } from "src/components/recipies";
import { Button } from "@stuff/ui/button";
import { H2 } from "@stuff/typography";
import { cn } from "@stuff/components/utils";
import { Text1 } from "packages/ui/atoms";
import { Link } from "src/components/structure/link";

export const NiceCard = ({
	title,
	desc,
	href,
}: { title: string; desc: string; href: string }) => {
	return (
		<Link href={href}>
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
						background: { hover: "bgHover", default: "bgSubtle" },
					}),
				)}
			>
				<H2 className={css({ fontSize: "large" })}>{title}</H2>
				<Text1 className="max-w-[45ch]">{desc}</Text1>
				<Button className="ml-auto mt-2" variant="link" size="sm">
					Read more
				</Button>
			</Card>
		</Link>
	);
};
