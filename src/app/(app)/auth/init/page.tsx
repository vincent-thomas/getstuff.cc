import { button } from "@stuff/ui/button/button.css";
import { FormInput } from "./_components/form";
import { cn } from "packages/components/utils";
import { Link } from "src/components/structure/link";

const Page = () => {
	return (
		<>
			<div
				className={cn(
					stack({
						justify: "between",
					}),
				)}
			>
				<h1
					className={cn(
						css({ fontWeight: "semibold", fontSize: "large", color: "text2" }),
					)}
				>
					Welcome to Stuff!
				</h1>
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
			<FormInput />
		</>
	);
};

export default Page;
