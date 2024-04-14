import type { QueryClient } from "@tanstack/react-query";
import type { MailMessage } from "src/app/(app)/mail/[folder]/[thread]/components/message";
import { z } from "zod";

export const prefetchThreadQuery = async ({
  messages,
  queryClient,
}: { messages: MailMessage[]; queryClient: QueryClient }) => {
  for (const message of messages) {
    await queryClient.prefetchQuery({
      staleTime: 9999999999,
      queryKey: ["mailMessage", message.messageId],
      queryFn: async () => {
        const json = await fetch(message.contentUrl, { cache: "force-cache" })
          .then((props) => props.json())
          .then((props) =>
            z.object({ text: z.string(), html: z.string() }).parse(props),
          );

        return json;
      },
    });
  }
};
