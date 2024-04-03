"use client";

import { useState } from "react";
import { Refresh } from "../icons/refresh";
import { useRouter } from "next/navigation";
import { Loading } from "@stuff/icons/loading";
import { cn } from "@stuff/components/utils";
import { stack } from "src/components/recipies";
import { Button } from "@stuff/ui/button";
import { theme } from "src/styles/themes.css";

export const RefreshButton = () => {
	const [isFetching, setFetching] = useState(false);
	const router = useRouter();

	return (
		<div className={cn(stack({ align: "center", gap: "sm" }))}>
			<Button
				variant="ghost"
				disabled={isFetching}
				rounded="medium"
				size="sm"
				onClick={async () => {
					router.refresh();
					setFetching(true);
					setTimeout(() => {
						setFetching(false);
					}, 2300);
				}}
			>
				{isFetching ? <Loading size={24} color={theme.text2} /> : <Refresh />}
			</Button>
		</div>
	);
};
