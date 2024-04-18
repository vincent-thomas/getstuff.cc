import { api } from "@stuff/api-client/server";
import { setupPage } from "@stuff/client/utils";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ThreadHeading } from "./components/components";
import { MailMessage } from "./components/message";

export default setupPage({
  params: z.object({
    folder: z.string(),
    thread: z.string(),
  }),
  async Component({ params: { folder: folderId, thread: threadId } }) {
    unstable_noStore();

    const conversation = await api.mail.threads.getThread.query({
      folderId,
      threadId,
    });

    if (conversation === null) {
      redirect(`/mail/${folderId}`);
    }

    if (!conversation.thread.read) {
      await api.mail.threads.setRead.mutate({
        value: true,
        folderId,
        threadIds: [threadId],
      });
    }

    return (
      <>
        <ThreadHeading title={conversation?.thread.title} />
        <div className={cn(css({ overflowY: "auto", p: "medium" }))}>
          <div className={stack({ direction: "col", gap: "md" })}>
            {conversation.messages.map(thread => (
              <>working on it</>
              // <MailMessage key={thread.messageId} thread={} />
            ))}
          </div>
        </div>
      </>
    );
  },
});
