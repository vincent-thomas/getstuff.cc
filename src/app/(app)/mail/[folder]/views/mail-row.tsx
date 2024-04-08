"use client";

import { messagesIdSelected } from "../store/messages-id-selected";
import { useAtom } from "jotai";
import { Checked, UnChecked } from "packages/icons/lib/unchecked";
import { formatDistanceToNow } from "date-fns";
import { border, stack } from "src/components/recipies";
import { Button } from "@stuff/ui/button";
import { Text1, Text2 } from "packages/ui/atoms";
import { Link } from "src/components/structure/link";

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

	return (
		<div
			key={thread.threadId}
			className={cn(
				stack({}),
				css({
					bg: {
						default: selected.includes(thread.threadId)
							? "highlight"
							: thread.read
								? "bgComponent"
								: "bgApp",
						hover: "bgHover",
					},
				}),
				border({ side: "b", color: "interactive" }),
			)}
		>
			<div className={css({ p: "small" })}>
				<Button
					variant="icon"
					size="md"
					className={cn(css({ bg: { hover: "bgHover" } }))}
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
			<Link
				href={`/mail/${folderId}/${thread.threadId}`}
				key={thread.threadId}
				className={cn(
					stack({ grow: 1, align: "center", gap: "lg" }),
					css({ pY: "small", paddingRight: "large", textAlign: "left" }),
				)}
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
				<Text2>
					{formatDistanceToNow(new Date(thread.lastActive), {
						addSuffix: true,
					})}
				</Text2>
				<Text1 style={{ width: "4rem", textAlign: "end" }}>
					<i>{thread.read ? "read" : "not read"}</i>
				</Text1>
			</Link>
		</div>
	);
};
