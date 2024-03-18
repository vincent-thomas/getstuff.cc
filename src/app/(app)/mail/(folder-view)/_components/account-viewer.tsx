import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "packages/components/lib/dropdown"
import { UserAvatar } from "./user-avatar"
import { api } from "@stuff/api-client/server"
import { redirect } from "next/navigation"
import { Thing } from "./things"


export const AccountViewer = async () => {
  const session = await api.user.session.query();

  if (session === null) {
    redirect("/auth/identify");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Thing>
          <div className="hover:bg-accent p-3 rounded-md">
            <div className="flex items-center gap-4 ">
              <UserAvatar />
              <div className="flex flex-col text-left">
                <h1 className="text-lg leading-tight text-foreground">
                  Stuff Mail{session.customerStatus === "active" ? "+" : ""}
                </h1>
                <p className="text-muted-foreground">{session.username}</p>
              </div>
            </div>
          </div>
        </Thing>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Manage account
            <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}