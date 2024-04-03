"use client";

import { api } from "@stuff/api-client/react";
import { cn } from "packages/components/utils";
import { messagesIdSelected } from "../store/messages-id-selected";
import { useAtom } from "jotai";
import { Checked, UnChecked } from "packages/icons/lib/unchecked";
import { formatDistanceToNow } from "date-fns";
import { prefetchThreadQuery } from "@stuff/data-access/prefetch-thread-query";
import { useDataKey } from "@stuff/lib/useUserPrivateKey";
import { useQueryClient } from "@tanstack/react-query";
import { threadOpen } from "../store/thread-open";
import { stack } from "src/components/recipies";
import { Button } from "@stuff/ui/button";

export const MailRow = ({
	thread,
	folderId,
}: {
	folderId: string;
	thread: {
		threadId: string;
		read: boolean;
		title: string;
		lastActive: number;
	};
}) => {
	const [selected, setSelected] = useAtom(messagesIdSelected);
	const utils = api.useUtils();
	const [_, setThreadId] = useAtom(threadOpen);
	const dataKey = useDataKey();
	const qC = useQueryClient();

	return (
		<div
			key={thread.threadId}
			className={cn(
				stack({}),
				css({
					bg: selected.includes(thread.threadId)
						? "highlight"
						: thread.read
							? "bgComponent"
							: "bgApp",
				}),
				"border-b border-border hover:bg-hover",
			)}
		>
			<div className={css({ p: "small" })}>
				<Button
					variant="ghost"
					size="icon"
					rounded="icon"
					onClick={() => {
						if (selected.includes(thread.threadId)) {
							setSelected(selected.filter((id) => id !== thread.threadId));
						} else {
							setSelected([...selected, thread.threadId]);
						}
					}}
				>
					{selected.includes(thread.threadId) ? (
						<Checked size={18} />
					) : (
						<UnChecked size={18} />
					)}
				</Button>
			</div>
			<button
				key={thread.threadId}
				className={cn(
					stack({ grow: 1, align: "center", gap: "lg" }),
					css({ pY: "small", paddingRight: "large", textAlign: "left" }),
				)}
				onClick={() => {
					setThreadId(thread.threadId);
					window.history.replaceState(
						{},
						"",
						`/mail/${folderId}?threadId=${thread.threadId}`,
					);
				}}
				onMouseOver={async () => {
					await utils.mail.threads.getThread.prefetch(
						{
							folderId,
							threadId: thread.threadId,
						},
						{
							staleTime: 10_000,
						},
					);
					const cachedThread = await utils.mail.threads.getThread.ensureData({
						folderId,
						threadId: thread.threadId,
					});

					if (cachedThread === null || dataKey === undefined) {
						return;
					}
					await prefetchThreadQuery({
						messages: cachedThread.messages,
						dataKey,
						queryClient: qC,
					});
				}}
			>
				<p
					className={cn(
						stack({ grow: 1 }),
						css({
							fontWeight: !thread.read ? "semibold" : "normal",
							color: thread.read ? "text2" : "text1",
						}),
						!thread.read ? "font-semibold" : "text-text2",
					)}
				>
					{thread.title}
				</p>
				<div className={cn("text-foreground")}>
					{formatDistanceToNow(new Date(thread.lastActive), {
						addSuffix: true,
					})}
				</div>
				<div className="w-16 text-right text-text2">
					<i>{thread.read ? "read" : "not read"}</i>
				</div>
			</button>
		</div>
	);
};
