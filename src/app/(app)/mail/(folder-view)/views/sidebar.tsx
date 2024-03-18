import { ArchiveIcon, Inbox, SendIcon } from "lucide-react"
import { AccountViewer } from "../_components/account-viewer"
import { ComposeButton } from "../_components/compose-button"
import { Thing } from "../_components/things"
import Link from "next/link"
import { CreateFolderButton } from "../_components/create-folder-button"
import { api } from "@stuff/api-client/server"
import { Folder } from "../_components/folder"
import { Flex } from "@stuff/structure/flex"

export const Sidebar = async () => {

  const folders = await api.mail.folders.listFolders.query();

  return (
    <aside className="flex h-full w-[240px] flex-col border-r border-border">
      <AccountViewer />
      <div className="border-t border-border"></div>
      <Thing>
        <ComposeButton />
      </Thing>
      <Thing>
        <Link
          className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
          href="/mail/inbox"
        >
          <Inbox size={24} color="hsl(var(--muted-foreground))" />
          <span>Inbox</span>
        </Link>
      </Thing>
      <Thing>
        <Link
          href="/mail/archive"
          className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
        >
          <ArchiveIcon size={24} color="hsl(var(--muted-foreground))" />
          <span>Archive</span>
        </Link>
      </Thing>
      <Thing>
        <Link
          href="/mail/sent"
          className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
        >
          <SendIcon size={24} color="hsl(var(--muted-foreground))" />
          <span>Sent</span>
        </Link>
      </Thing>
      <div className="h-6 w-full"></div>
      <Flex col gap="0.5rem" className="p-1">
        <div className="flex w-full items-center justify-between px-2">
          <h1 className="text-muted-foreground">Folders</h1>
          <CreateFolderButton />
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto">
          {folders.length === 0 ? (<Flex justify="start" className="pl-6 pt-1">
            No Folders!
          </Flex>) : (folders.map(folder => <Folder folder={folder} key={folder.sk}/>))}
        </div>
      </Flex>
    </aside>
  )
}