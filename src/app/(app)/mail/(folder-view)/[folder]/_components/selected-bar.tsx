"use client";

import { api } from "@stuff/api-client/react";
import { MailOpen, ArchiveIcon, FolderInput } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "packages/components/lib/popover";
import { useAtom } from "jotai";
import { messagesIdSelected } from "../store/messages-id-selected";
import { useMemo } from "react";
import { z } from "zod";
import { H2 } from "@stuff/typography";
import { Flex } from "@stuff/structure";
import { useThreadsMoveMutation } from "@stuff/data-access/move-threads-mutation";
import { useThreadsReadMutation } from "@stuff/data-access/read-threads-mutation";
import { Button } from "@stuff/ui/button";
import { threadOpen } from "../store/thread-open";
import { stack } from "packages/ui/patterns/stack";
import { palette } from "packages/ui/theme";
import { border } from "src/components/recipies";

export const SelectedBar = ({
	folderId,
	threadIds,
}: {
	folderId: string;
	threadIds: string[];
}) => {
	const utils = api.useUtils();
	const moveThreads = useThreadsMoveMutation();
	const setReadMutation = useThreadsReadMutation();
	const folders = api.mail.folders.listFolders.useQuery();

	const CONSTANT_folders = useMemo(() => {
		return [{ id: "inbox", name: "Inbox" }];
	}, []);

	const otherFolders = useMemo(() => {
		return (folders.data ?? [])
			.map((folder) => ({
				name: folder.gsi2.split("|")[2],
				id: z.string().parse(folder.sk.split("|")[1]),
			}))
			.filter((folder) => folder.id !== folderId);
	}, [folders.data, folderId]);

	const [selected, setSelected] = useAtom(messagesIdSelected);

	const [_, setThreadId] = useAtom(threadOpen);
	return (
		<div className={cn(css({}), stack({ align: "center", gap: "sm" }))}>
			<Popover
				onOpenChange={(test) => {
					if (test === true) return;
					setSelected([]);
				}}
			>
				<PopoverTrigger asChild>
					<Button variant="ghost" size="md">
						<FolderInput size={18} color={palette.text2} />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="p-2">
					<H2>Move to</H2>
					<Flex col gap="5px">
						{CONSTANT_folders.map((folder) => (
							<button
								key={folder.id}
								className="hover:bg-hover p-2 rounded-md"
								onClick={async () => {
									await moveThreads.mutateAsync({
										folderId: folderId,
										newFolderId: folder.id,
										threadIds: selected,
									});
									setSelected([]);
								}}
							>
								{folder.name}
							</button>
						))}
						{otherFolders.length > 0 && (
							<div
								style={{ height: "1px" }}
								className={cn(
									css({ bg: "bgComponent", width: "full", pX: "medium" }),
								)}
							></div>
						)}
						{otherFolders.map((folder) => (
							<button
								key={folder.id}
								className={cn(
									css({ bg: { hover: "bgHover" }, p: "small" }),
									border({ rounded: "radius" }),
								)}
								onClick={async () => {
									await moveThreads.mutateAsync({
										folderId: folderId,
										newFolderId: folder.id,
										threadIds: selected,
									});
									setSelected([]);
								}}
							>
								{folder.name}
							</button>
						))}
					</Flex>
				</PopoverContent>
			</Popover>
			<Button
				variant="ghost"
				size="md"
				onClick={async () => {
					setThreadId(null);
					window.history.replaceState({}, "", `/mail/${folderId}`);

					await setReadMutation.mutateAsync({
						folderId,
						value: false,
						threadIds,
					});
				}}
			>
				<MailOpen size={18} color={palette.text2} />
			</Button>

			{folderId !== "archive" && (
				<Button
					size="sm"
					variant="ghost"
					onClick={async () => {
						const successed = await moveThreads.mutateAsync({
							folderId,
							newFolderId: "archive",
							threadIds,
						});

						if (successed.includes(false)) {
							alert("Some threads failed to move");
						}
						await utils.mail.threads.getThreads.invalidate({ folderId });
					}}
				>
					<ArchiveIcon size={18} color={palette.text2} />
				</Button>
			)}
		</div>
	);
};
