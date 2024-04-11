import { z } from "zod";
import { setupPage } from "@stuff/client/utils";
import { ThreadHeading } from "./components/components";
import { api } from "@stuff/api-client/server";
import { redirect } from "next/navigation";
import { MailMessage } from "./components/message";
import { unstable_noStore } from "next/cache";

export default setupPage({
	params: z.object({
		folder: z.string(),
		thread: z.string(),
	}),
	async Component({ params: { folder: folderId, thread: threadId } }) {
		unstable_noStore()

		const conversation =
		await api.mail.threads.getThread.query({
			folderId,
			threadId,
		});

		if (conversation === null) {
			redirect(`/mail/${folderId}`);
		}

		if (!conversation?.thread.read) {
			await api.mail.threads.setRead.mutate({value: true, folderId, threadIds: [threadId]})
		}

		return (
			<>
				<ThreadHeading title={conversation?.thread.title} />
				<div className={cn(css({ overflowY: "auto", p: "medium" }))}>
					<div className={stack({ direction: "col", gap: "md" })}>
						{conversation.messages.map((thread) => (
							<MailMessage key={thread.messageId} thread={thread} />
						))}
					</div>
				</div>
			</>
		);
	},
});