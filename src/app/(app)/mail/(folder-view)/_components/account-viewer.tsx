import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "packages/components/lib/dropdown"
import { UserAvatar } from "./user-avatar"
import { api } from "@stuff/api-client/server"
import { redirect } from "next/navigation"
import { Outlogger } from "./outlogger"
import { H3 } from "@stuff/typography"
import { Logo } from "src/components/logo"


export const AccountViewer = async () => {
  const session = await api.user.session.query();

  if (session === null) {
    redirect("/auth/identify");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
          <div className="hover:bg-hover p-3 rounded-md hover:outline outline-2 outline-border">
            <div className="flex items-center gap-4">
              <UserAvatar />
              <div className="flex flex-col text-left">
                <h1 className="font-semibold flex gap-1 items-center">
                  <Logo size={24} /><p className="text-text text-3xl">Mail</p>
                </h1>
                <p className="text-muted-foreground">{session.username}</p>
              </div>
            </div>
          </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 !border-border">
        <DropdownMenuLabel className="pb-1">
          <H3>
            My Account
          </H3>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-3">
            Manage account
            <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-3">
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-3">
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Outlogger>
            <p>Log out</p>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </Outlogger>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}