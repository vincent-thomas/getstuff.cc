import type { FC } from "react";

import { MailRow } from "./mail-row";
import { Flex } from "@stuff/structure";
import { H2, P } from "@stuff/typography";
import { api } from "@stuff/api-client/server";

export interface FolderHeader {
	folderId: string;
}

export const MailTable: FC<FolderHeader> = async ({ folderId }) => {
	const threads = await api.mail.threads.getThreads.query({
		folderId: folderId,
	});

	// await new Promise(res => {setTimeout(() => res("test"), 2000)})

	if (threads.length === 0) {
		return (
			<Flex
				col
				gap="0.25rem"
				justify="center"
				align="center"
				className="w-full py-10"
			>
				<H2>No threads!</H2>
				<P>Totally empty here</P>
			</Flex>
		);
	}

	return (
		<div
			style={{ flexGrow: "grow" }}
			className={cn(css({ height: "full", overflowY: "auto" }))}
		>
			{threads.map((thread) => (
				<MailRow key={thread.threadId} thread={thread} folderId={folderId} />
			))}
		</div>
	);
};
