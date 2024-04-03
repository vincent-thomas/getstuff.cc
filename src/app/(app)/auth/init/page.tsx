import { button } from "@stuff/ui/button/button.css";
import { Form } from "./_components/form";
import Link from "next/link";
import { cn } from "packages/components/utils";

const Page = () => {
	return (
		<>
			<div className="flex w-full justify-between">
				<h1 className="text-2xl font-semibold">Welcome to Stuff!</h1>
				<Link
					href="/auth/identify"
					className={cn(
						"text-sm font-medium leading-none",
						button({ variant: "link" }),
					)}
				>
					Login
				</Link>
			</div>
			<Form />
		</>
	);
};

export default Page;
