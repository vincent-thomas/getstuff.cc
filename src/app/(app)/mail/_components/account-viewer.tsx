import { UserAvatar } from "./user-avatar";
import { api } from "@stuff/api-client/server";
import { redirect } from "next/navigation";
import { cn } from "@stuff/components/utils";
import {
	Menu,
	MenuButton,
	MenuContent,
	MenuDescription,
	MenuItem,
	MenuSeparator,
} from "packages/ui/components/menu";
import { CogIcon, CreditCardIcon } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "packages/ui/components/tooltip/tooltip";
import { unstable_noStore } from "next/cache";
import { Logout, ManageAccount } from "./account-viewer.actions";

export const AccountViewer = async () => {
	unstable_noStore();
	const session = await api.user.session.query();

	if (session === null) {
		redirect("/auth/identify");
	}

	return (
		<Menu>
			<MenuButton
				render={
					<button
						style={{
							borderRadius: "50%",
							aspectRatio: 1,
							height: "52px",
						}}
						className={cn(
							css({
								p: "xsmall",
								bg: { default: "transparent", hover: "bgHover" },
							}),
						)}
					/>
				}
			>
				<Tooltip>
					<TooltipTrigger>
						<UserAvatar />
					</TooltipTrigger>
					<TooltipContent className={css({ color: "text2" })}>
						User profile settings
					</TooltipContent>
				</Tooltip>
			</MenuButton>
			<MenuContent>
				<MenuDescription className={css({ paddingBottom: "small" })}>
					Account: {session.username}@getstuff.cc
				</MenuDescription>
				<MenuSeparator />
				<MenuItem>
					<CreditCardIcon /> Billing
				</MenuItem>
				<MenuItem>
					<CogIcon /> Settings
				</MenuItem>
				<ManageAccount />
				<MenuSeparator />

				<Logout />
			</MenuContent>
		</Menu>
	);
};