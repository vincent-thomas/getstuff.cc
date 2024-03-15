"use client";

import { decryptAsymmetric } from "@/lib/asym-crypto";
import { decryptSymmetric } from "@/lib/sym-crypto";
import { useDataKey } from "@/lib/useUserPrivateKey";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { SelectedBar } from "../_components/selected-bar";
import { Loading } from "packages/icons";
import { ArrowLeftCircleIcon, LockIcon, ShieldCheckIcon } from "lucide-react";
import { Flex } from "packages/components/lib/flex";
import { useRouter } from "next/navigation";
import { Button } from "packages/components/lib";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "packages/components/lib/tooltip";
import { useThreadsReadMutation } from "@/data-access/read-threads-mutation";
import { useThreadQuery } from "@/data-access/get-threads-query";

const paramsInterface = z.object({
  threadId: z.string(),
  folderId: z.string()
});

const MainPage = ({ threadId, folderId }: z.infer<typeof paramsInterface>) => {
  const threadQuery = useThreadQuery({
    folderId,
    threadId
  });
  const threadReadMutation = useThreadsReadMutation();
  const masterKey = useDataKey();

  const [formattedMails, setFormattedMails] = useState<
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
      messageId: string;
      to: { address: string; name?: string }[];
    }[]
  >([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (threadQuery.data?.thread.read === false) {
      threadReadMutation.mutate({
        value: true,
        folderId,
        threadIds: [threadId]
      });
    }
  }, [folderId, threadId, threadQuery.data?.thread.read]);
  const isRunning = useRef(false);

  useEffect(() => {
    if (!isRunning.current) {
      isRunning.current = true;
      return;
    }

    async function main() {
      if (
        threadQuery.data === undefined ||
        threadQuery.data === null ||
        masterKey === undefined
      ) {
        return;
      }
      setLoading(true);

      setFormattedMails([]);
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

        setFormattedMails(e => [
          ...e,
          {
            messageId: z.string().parse(item.messageId),
            content: {
              text: decryptedText,
              html: decryptedHtml
            },
            subject: item.subject,
            from: item.from,
            to: item.to
          }
        ]);

        setLoading(false);
      }
    }
    main(); // eslint-disable-line

    return () => setFormattedMails([]);
  }, [threadQuery.data, masterKey, threadId]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loading size={24} color="hsl(var(--muted-foreground))" />
      </div>
    );
  }
  return (
    <Flex col className="px-4">
      <Flex gap="0.75rem" className="py-5" align="center" justify="between">
        <h1 className="text-3xl text-foreground">
          {threadQuery.data?.thread.title}
        </h1>
        <div>
          <div className="rounded-full p-2 hover:bg-accent">
            <Tooltip>
              <TooltipTrigger>
                <ShieldCheckIcon
                  size={18}
                  color="hsl(var(--muted-foreground))"
                />
              </TooltipTrigger>
              <TooltipContent className="bg-muted shadow-lg">
                <p className="text-sm text-muted-foreground">
                  This thread is encrypted by Stuff, only you can read this
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </Flex>

      {formattedMails.map(mail => (
        <Flex
          col
          className="overflow-hidden rounded-md border border-border"
          key={mail.messageId}
        >
          <Flex col gap="1px" className="bg-muted p-4">
            <h2 className="text-xl">{mail.from.name}</h2>
            <p className="text-md text-muted-foreground">{mail.from.address}</p>
          </Flex>
          <div className="min-h-[170px] p-4">{mail.content.text}</div>
          <Flex className="border-t border-border p-4">
            <Button className="font-semibold">Svara</Button>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export function Page({
  folderId,
  threadId
}: {
  folderId: string;
  threadId: string;
}) {
  const router = useRouter();

  return (
    <>
      <Flex className="p-1" align="center" gap="0.5rem">
        <button
          className="rounded-full p-[calc(0.5rem+2px)] hover:bg-accent"
          onClick={() => router.push(".")}
        >
          <ArrowLeftCircleIcon size={22} />
        </button>

        <div className="block h-[calc(50px/1.6)] border-r border-border"></div>

        <SelectedBar threadIds={[threadId]} folderId={folderId} />
        <div className="block h-[calc(50px/1.6)] border-r border-border"></div>
      </Flex>
      <div className="mx-auto block h-[1px] w-full border-t border-border"></div>
      <MainPage folderId={folderId} threadId={threadId} />
    </>
  );
}
