"use client";

import { useUser } from "@stuff/lib/useUser";
import { border } from "src/components/recipies";

export const UserAvatar = () => {
	const user = useUser();

	if (user?.avatar_url === undefined) {
		return null;
	}

	return (
		<img
			src={user?.avatar_url}
			height={40}
			width={40}
			className={border({ rounded: "circle" })}
			alt="User selected avatar"
		/>
	);
};
