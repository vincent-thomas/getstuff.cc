"use client";

import { Button } from "@stuff/ui/button";
import { Plus, SearchIcon } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "packages/ui/components/tooltip/tooltip";
import { useState } from "react";
import { border } from "src/components/recipies";

export const Searchbar = () => {
	const [search, setSearch] = useState("");

	return (
		<div className={cn(stack({}))}>
			<form
				style={{ width: "720px" }}
				className={cn(
					stack({ align: "center" }),
					border({ rounded: "xl" }),
					css({ bg: "bgComponent" }),
				)}
			>
				<div className={css({ p: "xsmall" })}>
					<Tooltip placement="bottom-start">
						<TooltipTrigger
							render={<Button variant="icon" size="sm" type="submit" />}
						>
							<SearchIcon color={palette.text1} size={24} />
						</TooltipTrigger>
						<TooltipContent className={css({ color: "text2" })}>
							Search
						</TooltipContent>
					</Tooltip>
				</div>
				<input
					type="text"
					placeholder="Search anything..."
					name="q"
					className={css({
						color: "text2",
						width: "full",
						fontSize: "medium",
						pY: "large",
					})}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				{search !== "" && (
					<div className={css({ p: "xsmall" })}>
						<Tooltip placement="bottom-end">
							<TooltipTrigger
								render={
									<Button
										variant="icon"
										size="sm"
										onClick={() => setSearch("")}
									/>
								}
							>
								<Plus
									color={palette.text1}
									size={24}
									style={{ rotate: "45deg" }}
								/>{" "}
							</TooltipTrigger>
							<TooltipContent className={css({ color: "text2" })}>
								Remove query
							</TooltipContent>
						</Tooltip>
					</div>
				)}
			</form>
		</div>
	);
};
