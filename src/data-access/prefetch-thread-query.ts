import { decryptAsymmetric, decryptSymmetric } from "@stuff/lib/crypto";
import { type QueryClient } from "@tanstack/react-query";
import type { ProcessMessageInterface } from "src/app/(app)/mail/(folder-view)/[folder]/[thread]/page-client";
import { z } from "zod";

interface Message {
  messageId:string;
  messageEncryptionKey:string;
  contentUrl:string;
  subject: string;
  to: {
    address: string;
    name: string;
  }[];
  from: {
    address: string;
    name: string;
  };
}
const processMessage = async (
  message: ProcessMessageInterface,
  userKey: Buffer
) => {
  const htmlContent = decryptSymmetric(message.content.html, userKey);
  const textContent = decryptSymmetric(message.content.text, userKey);

  return {
    messageId: message.messageId,
    content: {
      text: textContent,
      html: htmlContent
    },
    subject: message.subject,
    from: message.from,
    to: message.to
  };
};

export const prefetchThreadQuery = async ({messages, queryClient,dataKey}: {messages: Message[], queryClient: QueryClient,dataKey:string}) => {
  for (const message of messages) {
    await queryClient.prefetchQuery({
      staleTime: 9999999999,
      queryKey: ["message", { messageId: message.messageId }],
      queryFn: async () => {
        const threadEncryptionKey = z
          .string()
          .parse(message.messageEncryptionKey);
        const content = await fetch(message.contentUrl, {
          cache: "force-cache",
        }).then(async v =>
          z.object({ html: z.string(), text: z.string() }).parse(await v.json())
        );
        const userKey = decryptAsymmetric(
          threadEncryptionKey,
          z.string().parse(dataKey)
        );

        return processMessage(
          {
            content,
            messageId: message.messageId,
            subject: message.subject,
            to: message.to,
            from: message.from
          },
          userKey
        );
      }
    })
  }


  //   const messages = useQueries({
  //   queries: (threadQuery.data?.messages ?? []).map(message => ({
  //     queryKey: ["message", { messageId: message.messageId }],
  //     queryFn: async () => {
  //       const threadEncryptionKey = z
  //         .string()
  //         .parse(message.messageEncryptionKey);
  //       const content = await fetch(message.contentUrl, {
  //         cache: "force-cache"
  //       }).then(async v =>
  //         z.object({ html: z.string(), text: z.string() }).parse(await v.json())
  //       );
  //       const userKey = decryptAsymmetric(
  //         threadEncryptionKey,
  //         z.string().parse(masterKey)
  //       );

  //       return processMessage(
  //         {
  //           content,
  //           messageId: message.messageId,
  //           subject: message.subject,
  //           to: message.to,
  //           from: message.from
  //         },
  //         userKey
  //       );
  //     }
  //   }))
  // });

}