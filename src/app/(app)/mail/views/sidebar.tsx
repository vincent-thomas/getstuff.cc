import { api } from "@stuff/api-client/server";
import { cn } from "@stuff/components/utils";
import { Flex } from "@stuff/structure";
import { ArchiveIcon, Inbox, SendIcon } from "lucide-react";
import { unstable_noStore } from "next/cache";
import { stack } from "src/components/recipies";
import { ComposeButton } from "../_components/compose-button";
import { CreateFolderButton } from "../_components/create-folder-button";
import { Extensions } from "../_components/extensions";
import { Folder } from "../_components/folder";
import { SidebarLink } from "./sidebar_component";

export const Sidebar = ({ className }: { className?: string }) => {
  return (
    <>
      <div className="grid grid-cols-3" data-mobile>
        <Flex justify="center">
          <SidebarLink folderId="inbox">
            <Inbox size={24} color="var(--text2)" />
            <span>Inbox</span>
          </SidebarLink>
        </Flex>
        <Flex justify="center">
          <SidebarLink folderId="archive">
            <ArchiveIcon size={24} color="var(--muted-foreground)" />
            <span>Archive</span>
          </SidebarLink>
        </Flex>
        <Flex justify="center">
          <SidebarLink folderId="sent" disableDroppable>
            <SendIcon size={24} color="var(--text)" />
            <span>Sent</span>
          </SidebarLink>
        </Flex>
      </div>
      <aside
        data-desktop
        style={{
          minWidth: "240px",
        }}
        className={cn(
          stack({ direction: "col", gap: "lg" }),
          css({ height: "full" }),
          className,
        )}
      >
        <div className={stack({ gap: "sm", direction: "col" })}>
          <ComposeButton />
          <Extensions />
        </div>
        <div className={stack({ direction: "col" })}>
          <div
            className={cn(
              stack({ align: "center", justify: "start" }),
              css({ p: "small" }),
            )}
          >
            <h1 className={cn(css({ color: "text2", fontWeight: "semibold" }))}>
              INBOXES
            </h1>
          </div>
          <SidebarLink folderId="inbox">
            <Inbox size={24} />
            <span>Inbox</span>
          </SidebarLink>
          <SidebarLink folderId="archive">
            <ArchiveIcon size={24} />
            <span>Archive</span>
          </SidebarLink>
          <SidebarLink folderId="sent" disableDroppable>
            <SendIcon size={24} />
            <span>Sent</span>
          </SidebarLink>
        </div>
        <div className={stack({ gap: "sm", direction: "col" })}>
          <ListFolders />
        </div>
      </aside>
    </>
  );
};

const ListFolders = async () => {
  unstable_noStore();
  const folders = await api.mail.folders.listFolders.query();

  return (
    <div
      className={cn(
        stack({ direction: "col", gap: "sm" }),
        css({ overflowY: "auto" }),
      )}
    >
      <div
        className={cn(
          stack({ align: "center", justify: "between" }),
          css({ width: "full", pX: "small" }),
        )}
      >
        <h2 className={css({ color: "text2", fontWeight: "semibold" })}>
          FOLDERS
        </h2>
        <CreateFolderButton />
      </div>
      {folders.length === 0 ? (
        <>No Folders!</>
      ) : (
        folders.map(folder => <Folder folder={folder} key={folder.sk} />)
      )}
    </div>
  );
};
