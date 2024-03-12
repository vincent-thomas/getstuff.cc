"use client";

import { decryptAsymmetric } from "@/lib/asym-crypto";
import { decryptSymmetric } from "@/lib/sym-crypto";
import { useMasterPrivateKey } from "@/lib/useUserPrivateKey";
import { api } from "@stuff/api-client/react";
import { useEffect, useState } from "react";
import { z } from "zod";

export const Page = ({
  folderId,
  threadId
}: {
  folderId: string;
  threadId: string;
}) => {
  const threadQuery = api.mail.threads.getThread.useQuery({
    folderId,
    threadId
  });
  const masterKey = useMasterPrivateKey();

  const formattedMails = useState<
    {
      content: {
        text: string;
        html: string;
      };
      subject: string;
      from: {
        address: string;
        name?: string;
      };
      to: { address: string; name?: string }[];
    }[]
  >([]);

  useEffect(() => {
    async function main() {
      if (
        threadQuery.data === undefined ||
        threadQuery.data === null ||
        masterKey === undefined
      ) {
        return;
      }
      for (const item of threadQuery.data.messages) {
        const result = await fetch(item.contentUrl).then(async v =>
          z.object({ html: z.string(), text: z.string() }).parse(await v.json())
        );

        const userKey = decryptAsymmetric(
          threadQuery.data.thread.encryptionKey,
          masterKey
        );

        const decryptedHtml = decryptSymmetric(result.html, userKey);
        const decryptedText = decryptSymmetric(result.text, userKey);

        formattedMails[1](e => [
          ...e,
          {
            content: {
              text: decryptedText,
              html: decryptedHtml
            },
            subject: item.subject,
            from: item.from,
            to: item.to
          }
        ]);
      }
    }
    main(); // eslint-disable-line
  }, [threadQuery.data]);

  return (
    <pre className="h-full max-w-[calc(100vw-240px)] overflow-x-auto text-wrap text-foreground">
      {JSON.stringify(formattedMails[0], undefined, 2)}
    </pre>
  );
};
