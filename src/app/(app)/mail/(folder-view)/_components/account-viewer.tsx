// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuGroup,
// 	DropdownMenuItem,
// 	DropdownMenuLabel,
// 	DropdownMenuSeparator,
// 	DropdownMenuShortcut,
// 	DropdownMenuTrigger,
// } from "packages/components/lib/dropdown";
import { UserAvatar } from "./user-avatar";
import { api } from "@stuff/api-client/server";
import { redirect } from "next/navigation";
// import { Outlogger } from "./outlogger";
// import { H3 } from "@stuff/typography";
import { Logo } from "src/components/logo";
import { cn } from "@stuff/components/utils";
import { stack } from "src/components/recipies";
import { Text1, Text2 } from "packages/ui/atoms";
import { hoverUnderline } from "./account-viewer.css";
import {
	Menu,
	MenuButton,
	MenuContent,
	MenuDescription,
	MenuItem,
	MenuSeperator,
} from "packages/ui/components/menu";
import {
	CogIcon,
	CreditCardIcon,
	LogOutIcon,
	PackageOpenIcon,
} from "lucide-react";
import { Button } from "@stuff/ui/button";

export const AccountViewer = async () => {
	const session = await api.user.session.query();

	if (session === null) {
		redirect("/auth/identify");
	}

	return (
		<Menu>
			<MenuButton>
				<div
					className={cn(
						css({
							p: "medium",
							bg: { default: "transparent", hover: "bgHover" },
						}),
						"hover:outline outline-2 outline-border",
						hoverUnderline,
					)}
				>
					<div className={cn(stack({ gap: "md", align: "center" }))}>
						<UserAvatar />
						<div className={cn(stack({ direction: "col", align: "start" }))}>
							<h1
								className={cn(
									css({ fontWeight: "semibold" }),
									stack({ gap: "xs", align: "center" }),
								)}
							>
								<Logo size={24} />
								<Text1 className={cn(css({ fontSize: "large" }))}>Mail</Text1>
							</h1>
							<Text2>{session.username}</Text2>
						</div>
					</div>
				</div>
			</MenuButton>
			<MenuContent
				style={{ width: 240 }}
				className={cn(css({ marginTop: "small" }))}
			>
				<MenuItem>
					<CreditCardIcon /> Billing
				</MenuItem>
				<MenuItem>
					<CogIcon /> Settings
				</MenuItem>
				<MenuItem>
					<PackageOpenIcon /> Manage Storage
				</MenuItem>
				<MenuSeperator />
				<MenuDescription>Account</MenuDescription>
				<MenuItem>Manage account</MenuItem>
				<MenuItem variant="danger">
					<LogOutIcon /> Log out
				</MenuItem>
			</MenuContent>
		</Menu>
	);
};
