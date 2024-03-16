"use client";
import { Flex } from "packages/components/lib/flex";
import { FolderHeader } from "./views/header";
import { MailTable } from "./views/mail-table";
import type { api as apiServer } from "@stuff/api-client/server";


export const PageClient = ({
  folderId,
  threads,
  folder
}: {
  folderId: string;
  threads: Awaited<ReturnType<typeof apiServer.mail.threads.getThreads.query>>;
  folder: {name: string; folderId:string;}
}) => (
  <Flex col className="h-full">
    <FolderHeader folderId={folderId} folder={folder} />
    <MailTable folderId={folderId} initialData={threads} />
  </Flex>
);