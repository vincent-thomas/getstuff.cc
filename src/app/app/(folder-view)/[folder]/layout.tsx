import type { LayoutProps } from "@/types/router";
import { api } from "@stuff/api-client/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { ComposeButton } from "./_components/compose-button";
import { UserAvatar } from "./_components/user-avatar";
import { ArchiveIcon, Inbox, Plus } from "lucide-react";
import { Flex } from "packages/components/lib/flex";
const Thing = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-1 p-1">{children}</div>;
};

const Layout = async (props: LayoutProps) => {
  const session = await api.user.session.query();
  if (session === null) {
    redirect("/auth/identify");
  }
  return (
    <div className="flex max-h-screen w-screen overflow-hidden">
      <aside className="flex h-screen w-[240px] flex-col border-r border-border">
        <Thing>
          <Link
            href="/app/inbox"
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
            href="/app/inbox"
          >
            <Inbox size={24} color="hsl(var(--muted-foreground))" />
            <span>Inbox</span>
          </Link>
        </Thing>
        <Thing>
          <Link
            href="/app/archive"
            className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
          >
            <ArchiveIcon size={24} color="hsl(var(--muted-foreground))" />
            <span>Archive</span>
          </Link>
        </Thing>
        <div className="h-6 w-full"></div>
        <Flex col gap={"0.5rem"} className="p-1">
          <div className="flex w-full items-center justify-between px-2">
            <h1 className="text-muted-foreground">Folders</h1>
            <button className="rounded-full p-1 p-1 hover:bg-accent">
              <Plus />
            </button>
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto">
            <Flex justify="start" className="pl-6 pt-1">
              No Folders!
            </Flex>
          </div>
        </Flex>
      </aside>
      <main className="grow">{props.children}</main>
    </div>
  );
};

export default Layout;
