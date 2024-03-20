import { ArchiveIcon, Inbox, SendIcon } from "lucide-react"
import { AccountViewer } from "../_components/account-viewer"
import { ComposeButton } from "../_components/compose-button"
import Link from "next/link"
import { CreateFolderButton } from "../_components/create-folder-button"
import { api } from "@stuff/api-client/server"
import { Folder } from "../_components/folder"
import { Flex } from "@stuff/structure";
import type { ReactNode } from "react"

const SidebarLink = ({children, href}: {children: ReactNode, href: string}) => (
  <Link
    className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted text-lg font-semibold"
    href={href}
  >
  {children}
</Link>
)

export const Sidebar = async () => {

  const folders = await api.mail.folders.listFolders.query();

  return (
    <aside className="flex h-full w-[240px] flex-col bg-accent">
      <Flex col gap="0.5rem">
        <AccountViewer />
        <ComposeButton />
        <SidebarLink href="/mail/inbox">
          <Inbox size={24} color="hsl(var(--muted-foreground))" />
          <span>Inbox</span>
        </SidebarLink>
        <SidebarLink href="/mail/archive">
          <ArchiveIcon size={24} color="hsl(var(--muted-foreground))" />
          <span>Archive</span>
        </SidebarLink>
        <SidebarLink href="/mail/sent">
          <SendIcon size={24} color="hsl(var(--muted-foreground))" />
          <span>Sent</span>
        </SidebarLink>
      </Flex>
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