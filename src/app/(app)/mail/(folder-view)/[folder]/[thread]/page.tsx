import { z } from "zod";
import { setupPage } from "@stuff/client/utils";
import { ThreadView } from "../views/threads";

export default setupPage({
	params: z.object({
		folder: z.string(),
		thread: z.string(),
	}),
	async Component({ params }) {
		return <ThreadView folderId={params.folder} />;
	},
});
