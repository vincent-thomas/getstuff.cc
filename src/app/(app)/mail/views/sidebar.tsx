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
import { unstable_noStore } from "next/cache";

export const Sidebar = ({ className }: { className?: string }) => {
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
				style={{
					minWidth: "240px",
				}}
				className={cn(
					stack({ direction: "col", gap: "lg" }),
					css({ height: "full" }),
					className,
				)}
			>
				<div className={stack({ gap: "sm", direction: "col" })}>
					<ComposeButton />
					<Extensions />
				</div>
				<div className={stack({ direction: "col" })}>
					<div
						className={cn(
							stack({ align: "center", justify: "start" }),
							css({ p: "small" }),
						)}
					>
						<h1 className={cn(css({ color: "text2", fontWeight: "semibold" }))}>
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
					{/* <Suspense fallback={<ListFoldersSkeleton />}> */}
					<ListFolders />
					{/* </Suspense> */}
				</div>
			</aside>
		</>
	);
};

// const ListFoldersSkeleton = async () => {
// 	return (
// 		<div
// 			className={cn(
// 				stack({ direction: "col", gap: "sm" }),
// 				css({ overflowY: "auto" }),
// 			)}
// 		>
// 			<div
// 				className={cn(
// 					stack({ align: "center", justify: "between" }),
// 					css({ width: "full", pX: "small" }),
// 				)}
// 			>
// 				<div
// 					style={{
// 						height: "28px",
// 						width: "82px",
// 						animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
// 					}}
// 					className={cn(
// 						css({ bg: "bgComponent" }),
// 						border({ rounded: "radius" }),
// 					)}
// 				></div>
// 				<CreateFolderButton />
// 			</div>
// 		</div>
// 	);
// };

const ListFolders = async () => {
	unstable_noStore();
	const folders = await api.mail.folders.listFolders.query();

	return (
		<div
			className={cn(
				stack({ direction: "col", gap: "sm" }),
				css({ overflowY: "auto" }),
			)}
		>
			<div
				className={cn(
					stack({ align: "center", justify: "between" }),
					css({ width: "full", pX: "small" }),
				)}
			>
				<h2 className={css({ color: "text2", fontWeight: "semibold" })}>
					FOLDERS
				</h2>
				<CreateFolderButton />
			</div>
			{folders.length === 0 ? (
				<>No Folders!</>
			) : (
				folders.map((folder) => <Folder folder={folder} key={folder.sk} />)
			)}
		</div>
	);
};
