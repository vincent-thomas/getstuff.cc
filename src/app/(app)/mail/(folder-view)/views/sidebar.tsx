import { ArchiveIcon, Inbox, SendIcon } from "lucide-react"
import { AccountViewer } from "../_components/account-viewer"
import { ComposeButton } from "../_components/compose-button"
import { CreateFolderButton } from "../_components/create-folder-button"
import { api } from "@stuff/api-client/server"
import { Folder } from "../_components/folder"
import { Flex } from "@stuff/structure";
import { cn } from "@stuff/components/utils"
import { Extensions } from "../_components/extensions"
import { SidebarLink } from "./sidebar_component"
import { Stack } from "styled-system/jsx"

export const Sidebar = async ({className}: {className?: string}) => {
  const folders = await api.mail.folders.listFolders.query();
  return (
    <>
      <div className="grid grid-cols-3" data-mobile>
        <Flex justify="center">
          <SidebarLink href="/mail/inbox">
            <Inbox size={24} color="var(--text2)" />
            <span>Inbox</span>
          </SidebarLink>
        </Flex>
        <Flex justify="center">
          <SidebarLink href="/mail/archive">
            <ArchiveIcon size={24} color="var(--muted-foreground)" />
            <span>Archive</span>
          </SidebarLink>
        </Flex>
        <Flex justify="center">
          <SidebarLink href="/mail/sent">
            <SendIcon size={24} color="var(--text)" />
            <span>Sent</span>
          </SidebarLink>
        </Flex>
      </div>
      <aside data-desktop className={cn("flex h-full w-[240px] flex-col", className)}>
        <Stack gap="lg">
          <Stack gap="sm">
            <div className="pb-3 w-full flex flex-col">
              <AccountViewer />
            </div>
            <ComposeButton />
            <Extensions />
          </Stack>
          <Stack gap="sm">
            <div className="flex w-full items-center justify-start px-1">
              <h1 className="text-muted-foreground font-semibold">INBOXES</h1>
            </div>
            <SidebarLink href="/mail/inbox">
              <Inbox size={24} color="var(--text2)" />
              <span>Inbox</span>
            </SidebarLink>
            <SidebarLink href="/mail/archive">
              <ArchiveIcon size={24} color="var(--text2)" />
              <span>Archive</span>
            </SidebarLink>
            <SidebarLink href="/mail/sent">
              <SendIcon size={24} color="var(--text2)" />
              <span>Sent</span>
            </SidebarLink>
          </Stack>
          <Stack gap="sm">
            <div className="flex w-full items-center justify-between px-1">
              <h1 className="text-muted-foreground font-semibold">FOLDERS</h1>
              <CreateFolderButton />
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto">
              {folders.length === 0
                ? (
                    <Flex justify="start" className="pl-6 pt-1">
                      No Folders!
                    </Flex>
                  )
                : folders.map(folder => <Folder folder={folder} key={folder.sk}/>)}
            </div>
          </Stack>
        </Stack>
      </aside>
    </>
  )
}