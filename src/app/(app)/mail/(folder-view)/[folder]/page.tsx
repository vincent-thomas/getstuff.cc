import { api } from "@stuff/api-client/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { setupPage } from "@stuff/client/utils";
import { ThreadView } from "./views/threads";
import { MainMailView } from "./views/main-mail-file";
import { cn } from "@stuff/components/utils";
import { border, stack } from "src/components/recipies";

export default setupPage({
	query: z.object({ threadId: z.string().optional() }),
	params: z.object({ folder: z.string() }),
	async Component({ params, query }) {
		const folderResult = await api.mail.folders.getFolder.query({
			folderId: params.folder,
		});

		if (folderResult === undefined) {
			redirect("/mail/inbox");
		}

		const folder = {
			name: z
				.string()
				.parse(
					folderResult === null
						? params.folder
						: folderResult.gsi2.split("|")[2],
				),
			folderId: params.folder,
		};

		return (
			<main
				className={cn(
					stack({}),
					css({
						width: "full",
						height: "full",
						bg: "bgApp",
						overflowY: "hidden",
					}),
					border({ rounded: "lg", side: "all", color: "subtle" }),
				)}
			>
				<MainMailView folder={folder} threadId={query.threadId} />
				<ThreadView folderId={folder.folderId} />
			</main>
		);
	},
});
