"use client";

import { decryptAsymmetric } from "@/lib/asym-crypto";
import { decryptSymmetric } from "@/lib/sym-crypto";
import { useDataKey } from "@/lib/useUserPrivateKey";
import { useEffect } from "react";
import { z } from "zod";
import { SelectedBar } from "../_components/selected-bar";
import { ArrowLeftCircleIcon, ShieldCheckIcon } from "lucide-react";
import { Flex } from "packages/components/lib/flex";
import { useRouter } from "next/navigation";
import { useThreadsReadMutation } from "@/data-access/read-threads-mutation";
import { useThreadQuery } from "@/data-access/get-threads-query";
import { useQueries } from "@tanstack/react-query";
import { Tooltip, TooltipContent, TooltipTrigger } from "packages/components/lib/tooltip";
import { Loading } from "packages/icons";
import { Button } from "packages/components/lib";
import { api } from "@stuff/api-client/react";

const paramsInterface = z.object({
  threadId: z.string(),
  folderId: z.string()
});

interface ProcessMessageInterface {
  messageId: string;
  subject:string;
  content: {
    text:string;
    html:string
  };
  to: {
    address:string;
    name:string;
  }[];
  from: {
    address:string;
    name:string
  }
}

const processMessage = async (message: ProcessMessageInterface, userKey: Buffer) => {

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
  }
}


const MainPage = ({ threadId, folderId }: z.infer<typeof paramsInterface>) => {
  const threadQuery = useThreadQuery({
    folderId,
    threadId
  });
  const threadReadMutation = useThreadsReadMutation();
  const masterKey = useDataKey();

  const messages = useQueries({
    queries: (threadQuery.data?.messages ?? []).map(message => ({
      queryKey: ["message", {messageId: message.messageId}],
      queryFn: async () => {
        const threadEncryptionKey = z.string().parse(threadQuery.data?.thread.encryptionKey);
        const content = await fetch(message.contentUrl, {
          cache: "force-cache",
          
        }).then(async v => z.object({ html: z.string(), text: z.string() }).parse(await v.json()));
        const userKey = decryptAsymmetric(
          threadEncryptionKey,
          z.string().parse(masterKey)
        );

        return processMessage({
          content,
          messageId: message.messageId,
          subject: message.subject,
          to: message.to,
          from: message.from
        }, userKey);
      }
    }))
  });

  useEffect(() => {
    if (threadQuery.data?.thread.read === false) {
      threadReadMutation.mutate({
        value: true,
        folderId,
        threadIds: [threadId]
      });
    }
  }, [folderId, threadId, threadQuery.data?.thread.read]);

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

      {messages.map(({data: mail}, index) => {
        if (mail === undefined) {
          return <Loading size={24} color="text-primary" key={index} />
        }

        return (
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
        )
      })}
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
  const utils = api.useUtils();

  return (
    <>
      <Flex className="p-1" align="center" gap="0.5rem">
        <button
          className="rounded-full p-[calc(0.5rem+2px)] hover:bg-accent"
          onClick={() => router.push(".")}
          onMouseOver={async () => 
            await utils.mail.threads.getThreads.prefetch({folderId}, {
              cacheTime: 1000 * 10
            })
          }
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
