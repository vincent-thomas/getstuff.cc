"use client";

import { Flex } from "@stuff/structure/flex";
import { FolderHeader } from "./views/header";
import { MailTable } from "./views/mail-table";

export const PageClient = ({
  folderId,
  folder
}: {
  folderId: string;
  folder: {name: string; folderId:string;}
}) => (
  <Flex col className="h-full">
    <FolderHeader folderId={folderId} folder={folder} />
    <MailTable folderId={folderId} />
  </Flex>
);