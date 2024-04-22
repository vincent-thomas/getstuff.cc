"use client";

import { useRouter } from "next/navigation";
import {
  Menu,
  MenuButton,
  MenuContent,
  MenuItem,
  MenuSeparator,
} from "packages/ui/components";
import { toast } from "sonner";
import { signOutAction } from "./actions/signout.action";
import { useAction } from "next-safe-action/hooks";

export const Profile = ({ url }: { url: string }) => {
  const router = useRouter();
  const { execute } = useAction(signOutAction, {
    onSuccess() {
      toast("Signed out");
      router.refresh();
    },
  });

  return (
    <Menu>
      <MenuButton>
        <img src={url} width={50} height={50} alt="user profile" />
      </MenuButton>
      <MenuContent>
        <MenuItem>Billing</MenuItem>
        <MenuSeparator />
        <MenuItem onClick={() => execute(undefined)}>Sign out</MenuItem>
      </MenuContent>
    </Menu>
  );
};
