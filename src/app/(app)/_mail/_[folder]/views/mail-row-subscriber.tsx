"use client";

import { useEffect, useState } from "react";
import { MailRow } from "./mail-row";
import { z } from "zod";
import { api } from "@stuff/api-client/react";

export const NewMailListener = ({ folderId }: { folderId: string }) => {
  const [newEmails, setNewEmails] = useState<
    { created_at: Date; threadId: string; read: boolean }[]
  >([]);
  // const folder = api.mail.folders.getFolder.useQuery({
  //   folderId,
  // });

  // const thread = api.mail.threads.getThread.useQuery({
  //   folderId
  // })

  // useEffect(() => {
  // if (folder.data === undefined) {
  //   return;
  // }

  // const sse = new EventSource(`/mail/${folderId}/pipeline`, {
  //   withCredentials: true,
  // });

  // sse.onopen = () => {
  //   // console.log("opening...");
  // };

  // sse.onmessage = async data => {
  //   const threadId = data.lastEventId;

  //   const payload = z
  //     .object({ created_at: z.string(), read: z.boolean() })
  //     .parse(JSON.parse(data.data));

  //   // const thread = await vanillaApi.mail.threads.getThread.query({
  //   //   folderId,
  //   //   threadId,
  //   // });

  //   setNewEmails(old => [
  //     ...old,
  //     {
  //       threadId,
  //       created_at: new Date(payload.created_at),
  //       read: payload.read,
  //     },
  //   ]);
  // };

  // return () => sse.close();
  // }, [folderId, folder.data]);

  return newEmails.map(v => (
    <MailRow
      folderId={folderId}
      thread={{
        read: v.read,
        threadId: v.threadId,
        title: "testing",
        lastActive: v.created_at,
      }}
      key={v.threadId}
    />
  ));
};
