import { cn } from "@stuff/components/utils";
import { Button, button } from "@stuff/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import { palette } from "packages/ui/theme";
import { stack } from "src/components/recipies";
import { P } from "@stuff/typography"
export const CookieTeller = () => {
	const hasDoneIt = cookies().get("agnolished-cookies")?.value ?? null;

	if (hasDoneIt === "true") {
		return null;
	}

	const test = async () => {
		"use server";

		cookies().set("agnolished-cookies", "true", {
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
		});
	};

	return (
		<div
			className={cn(
				css({ position: "sticky", bg: "bgSubtle", p: "medium" }),
				stack({ gap: "md", align: "center" }),
			)}
			style={{ top: 0, borderBottom: "1px solid " + palette.borderSubtle }}
		>
			<div className={cn(stack({}))}>
				<P className={cn(css({color: "text2", marginRight: "small"}))}>
					Stuff Mail use cookies only to make sure you are you. Please click here
					to accept our cookies policy,
				</P>
				<Link href="/cookies" className={button({ variant: "link" })}>
					Read more here
				</Link>
				<P className={cn(css({color: "text2"}))}>
					.
				</P>

			</div>
			<form action={test}>
				<Button variant="primary" size="sm" rounded="medium" type="submit">
					Accept
				</Button>
			</form>
		</div>
	);
};
