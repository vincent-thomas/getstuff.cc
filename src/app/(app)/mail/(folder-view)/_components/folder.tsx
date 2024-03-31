"use client";

import { api } from "@stuff/api-client/react";
import type { api as apiServer } from "@stuff/api-client/server"
import Link from "next/link"
import { css, cx } from "styled-system/css";
import { z } from "zod";


export const Folder = ({folder}: {folder: Awaited<ReturnType<typeof apiServer.mail.folders.listFolders.query>>[number]}) => {
  
  const utils = api.useUtils();

  const mouseOver = async () => {
    await utils.mail.threads.getThreads.prefetch({
      folderId: z.string().parse(folder.sk.split("|")[1])
    }, {
      staleTime: 1000 * 10
    })
  }
  
  return (
    <Link
      href={`./${folder.sk.split("|")[1]}`}
      key={folder.sk.split("|")[1]}
      className={cx(css({px: "md", py: "sm", _hover: {bg: "hover"}, rounded: "radius"}))}
      onMouseOver={mouseOver}
    >
      {folder.gsi2.split("|")[2]}
    </Link>
  )
}