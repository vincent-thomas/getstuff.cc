import { cn } from "@stuff/components/utils";
import { Button, button } from "@stuff/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import { themeMode } from "packages/ui/theme";
import { stack } from "src/components/recipies";

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
			style={{ top: 0, borderBottom: "1px solid " + themeMode.borderSubtle }}
		>
			<div>
				Stuff Mail use cookies only to make sure you are you. Please click here
				to accept our cookies policy.{" "}
				<Link href="/cookies" className={button({ variant: "link" })}>
					Read more here
				</Link>
				.
			</div>
			<form action={test}>
				<Button variant="ghost" size="sm" rounded="medium">
					Accept
				</Button>
			</form>
		</div>
	);
};
