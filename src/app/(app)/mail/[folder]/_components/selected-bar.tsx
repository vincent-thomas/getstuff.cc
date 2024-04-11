"use client";

import { api } from "@stuff/api-client/react";
import { MailOpen, ArchiveIcon, FolderInput } from "lucide-react";

import { useAtom } from "jotai";
import { messagesIdSelected } from "../store/messages-id-selected";
import { useMemo } from "react";
import { z } from "zod";
import { useThreadsMoveMutation } from "@stuff/data-access/move-threads-mutation";
import { useThreadsReadMutation } from "@stuff/data-access/read-threads-mutation";
import { Button } from "@stuff/ui/button";
import { stack } from "packages/ui/patterns/stack";
import { palette } from "packages/ui/theme";
import { useRouter } from "next/navigation";

import {
	Menu,
	MenuButton,
	MenuContent,
	MenuDescription,
	MenuItem,
	MenuSeparator,
} from "packages/ui/components";
import type { TRPCError } from "@trpc/server";
import { toast } from "sonner";

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
		return [{ id: "inbox", name: "Inbox" }].filter(
			(folder) => folder.id !== folderId,
		);
	}, [folderId]);

	const otherFolders = useMemo(() => {
		return (folders.data ?? [])
			.map((folder) => ({
				name: folder.gsi2.split("|")[2],
				id: z.string().parse(folder.sk.split("|")[1]),
			}))
			.filter((folder) => folder.id !== folderId);
	}, [folders.data, folderId]);

	const [selected] = useAtom(messagesIdSelected);
	const router = useRouter();

	return (
		<div className={cn(stack({ align: "center", gap: "sm" }))}>
			<Menu>
				<MenuButton
					render={<Button variant="ghost" size="md" rounded="medium" />}
				>
					<FolderInput size={18} color={palette.text2} />
				</MenuButton>
				<MenuContent>
					<MenuDescription>Move to</MenuDescription>
					<MenuSeparator />

					{CONSTANT_folders.map((folder) => (
						<MenuItem
							key={folder.id}
							onClick={async () => {
								try {
									await moveThreads.mutateAsync({
										folderId: folderId,
										newFolderId: folder.id,
										threadIds: selected,
									});
									router.push(`/mail/${folderId}`);
								} catch (error) {
									const e = error as TRPCError;
									toast.error(e.message)
								}
							}}
						>
							{folder.name}
						</MenuItem>
					))}

					{otherFolders.length > 0 && CONSTANT_folders.length !== 0 && (
						<MenuDescription>Your folders</MenuDescription>
					)}
					{otherFolders.map((folder) => (
						<MenuItem
							key={folder.id}
							onClick={async () => {
								await moveThreads.mutateAsync({
									folderId: folderId,
									newFolderId: folder.id,
									threadIds: selected,
								});
								router.push(`/mail/${folderId}`);
							}}
						>
							{folder.name}
						</MenuItem>
					))}
				</MenuContent>
			</Menu>
			<Button
				variant="ghost"
				size="md"
				rounded="medium"
				onClick={async () => {
					await setReadMutation.mutateAsync({
						folderId,
						value: false,
						threadIds,
					});

					router.push(`/mail/${folderId}`);
				}}
			>
				<MailOpen size={18} color={palette.text2} />
			</Button>
			{folderId !== "archive" && (
				<Button
					size="md"
					variant="ghost"
					rounded="medium"
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
