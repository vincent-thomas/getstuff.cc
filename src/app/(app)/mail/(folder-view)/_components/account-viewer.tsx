import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "packages/components/lib/dropdown";
import { UserAvatar } from "./user-avatar";
import { api } from "@stuff/api-client/server";
import { redirect } from "next/navigation";
import { Outlogger } from "./outlogger";
import { H3 } from "@stuff/typography";
import { Logo } from "src/components/logo";
import { cn } from "@stuff/components/utils";
import { stack } from "src/components/recipies";
import { Text1, Text2 } from "packages/ui/atoms";
import { hoverUnderline } from "./account-viewer.css";

export const AccountViewer = async () => {
	const session = await api.user.session.query();

	if (session === null) {
		redirect("/auth/identify");
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
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
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-64 !border-border">
				<DropdownMenuLabel className="pb-1">
					<H3>My Account</H3>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className="p-3">
						Manage account
						<DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem className="p-3">
						Billing
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem className="p-3">
						Settings
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuItem>Support</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Outlogger>
						<p>Log out</p>
						<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
					</Outlogger>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
