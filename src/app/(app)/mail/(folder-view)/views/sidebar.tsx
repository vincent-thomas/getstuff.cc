import { ArchiveIcon, Inbox, SendIcon } from "lucide-react";
import { ComposeButton } from "../_components/compose-button";
import { CreateFolderButton } from "../_components/create-folder-button";
import { api } from "@stuff/api-client/server";
import { Folder } from "../_components/folder";
import { Flex } from "@stuff/structure";
import { cn } from "@stuff/components/utils";
import { Extensions } from "../_components/extensions";
import { SidebarLink } from "./sidebar_component";
import { stack } from "src/components/recipies";

export const Sidebar = async ({ className }: { className?: string }) => {
	const folders = await api.mail.folders.listFolders.query();
	return (
		<>
			<div className="grid grid-cols-3" data-mobile>
				<Flex justify="center">
					<SidebarLink href="/mail/inbox">
						<Inbox size={24} color="var(--text2)" />
						<span>Inbox</span>
					</SidebarLink>
				</Flex>
				<Flex justify="center">
					<SidebarLink href="/mail/archive">
						<ArchiveIcon size={24} color="var(--muted-foreground)" />
						<span>Archive</span>
					</SidebarLink>
				</Flex>
				<Flex justify="center">
					<SidebarLink href="/mail/sent">
						<SendIcon size={24} color="var(--text)" />
						<span>Sent</span>
					</SidebarLink>
				</Flex>
			</div>
			<aside
				data-desktop
				className={cn(
					stack({ direction: "col" }),
					css({ height: "full" }),
					className,
				)}
			>
				<div className={stack({ direction: "col", gap: "lg" })}>
					<div className={stack({ gap: "sm", direction: "col" })}>
						<ComposeButton />
						<Extensions />
					</div>
					<div className={stack({ gap: "sm", direction: "col" })}>
						<div
							className={cn(
								stack({ align: "center", justify: "start" }),
								css({ p: "medium" }),
							)}
						>
							<h1
								className={cn(css({ color: "text2", fontWeight: "semibold" }))}
							>
								INBOXES
							</h1>
						</div>
						<SidebarLink href="/mail/inbox">
							<Inbox size={24} />
							<span>Inbox</span>
						</SidebarLink>
						<SidebarLink href="/mail/archive">
							<ArchiveIcon size={24} />
							<span>Archive</span>
						</SidebarLink>
						<SidebarLink href="/mail/sent">
							<SendIcon size={24} />
							<span>Sent</span>
						</SidebarLink>
					</div>
					<div className={stack({ gap: "sm", direction: "col" })}>
						<div
							className={cn(
								stack({ align: "center", justify: "between" }),
								css({ width: "full", pX: "small" }),
							)}
						>
							<h1 className={css({ color: "text2", fontWeight: "semibold" })}>
								FOLDERS
							</h1>
							<CreateFolderButton />
						</div>
						<div className="flex flex-col gap-2 overflow-y-auto">
							{folders.length === 0 ? (
								<Flex justify="start" className="pl-6 pt-1">
									No Folders!
								</Flex>
							) : (
								folders.map((folder) => (
									<Folder folder={folder} key={folder.sk} />
								))
							)}
						</div>
					</div>
				</div>
			</aside>
		</>
	);
};
