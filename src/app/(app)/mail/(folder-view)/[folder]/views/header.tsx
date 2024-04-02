"use client";

import { useAtom } from "jotai";
import { cn } from "packages/components/utils";
import { messagesIdSelected } from "../store/messages-id-selected";
import { api } from "@stuff/api-client/react";
import type { FC } from "react";
import { Checked, UnChecked } from "packages/icons/lib/unchecked";
import { RefreshButton } from "../_components/refresh-button";
import { SelectedBar } from "../_components/selected-bar";
import { stack } from "src/components/recipies";
import { themeMode } from "packages/ui/theme";

interface FolderHeader {
	folder: { name: string; folderId: string };
}

export const FolderHeader: FC<FolderHeader> = ({ folder }) => {
	const threadsQuery = api.mail.threads.getThreads.useQuery({
		folderId: folder.folderId,
	});
	const [selected, setSelected] = useAtom(messagesIdSelected);

	return (
		<div
			style={{
				borderBottom: "1px solid " + themeMode.borderSubtle,
			}}
			className={cn(
				stack({ direction: "row", align: "center" }),
				css({ width: "full" }),
			)}
		>
			<div className={css({ p: "small" })}>
				<button
					className={cn(css({ color: "text1", p: "medium" }))}
					onClick={() => {
						setSelected([]);
						if (selected.length !== threadsQuery.data?.length) {
							for (const thread of threadsQuery.data ?? []) {
								setSelected((value) => [...value, thread.threadId]);
							}
						}
					}}
				>
					{selected.length === threadsQuery.data?.length &&
					threadsQuery.data.length !== 0 ? (
						<Checked size={18} />
					) : (
						<UnChecked size={18} />
					)}
				</button>
			</div>

			<h1 className={cn(css({ fontSize: "medium", color: "text1" }))}>
				{folder.name}
			</h1>
			<div
				className={cn(
					stack({ justify: "end" }),
					css({ width: "full", height: "full", pX: "small" }),
				)}
			>
				{selected.length === 0 ? (
					<RefreshButton />
				) : (
					<SelectedBar threadIds={selected} folderId={folder.folderId} />
				)}
			</div>
		</div>
	);
};
