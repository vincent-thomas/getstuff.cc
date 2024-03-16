import type { LayoutProps } from "@/types/router";
import { api } from "@stuff/api-client/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { ComposeButton } from "./_components/compose-button";
import { UserAvatar } from "./_components/user-avatar";
import { ArchiveIcon, Inbox, SendIcon } from "lucide-react";
import { Flex } from "packages/components/lib/flex";


import { CreateFolderButton } from "./_components/create-folder-button";
import { Folder } from "./_components/folder";
import { unstable_noStore } from "next/cache";
const Thing = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-1 p-1">{children}</div>;
};

const Layout = async (props: LayoutProps) => {
  unstable_noStore()

  const session = await api.user.session.query();
  if (session === null) {
    redirect("/auth/identify");
  }

  const folders = await api.mail.folders.listFolders.query();


  return (
    <div className="flex h-full min-w-[400px] overflow-hidden">
      <aside className="flex h-full w-[240px] flex-col border-r border-border">
        <Thing>
          <Link
            href="/mail/inbox"
            className="hover:text-accent-foreground-2 block rounded p-3 hover:bg-accent"
          >
            <div className="flex items-center gap-4">
              <UserAvatar />
              <div className="flex flex-col text-left">
                <h1 className="text-lg leading-tight text-foreground">
                  Stuff Mail
                </h1>
                <p className="text-muted-foreground">{session.username}</p>
              </div>
            </div>
          </Link>
        </Thing>

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
        <Flex col gap={"0.5rem"} className="p-1">
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
      <main className="grow">{props.children}</main>
    </div>
  );
};

export default Layout;
