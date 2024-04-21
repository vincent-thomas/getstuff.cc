"use client";

import { vanillaApi } from "@stuff/api-client/vanilla";
import { useRouter } from "next/navigation";
import {
  Menu,
  MenuButton,
  MenuContent,
  MenuItem,
  MenuSeparator,
} from "packages/ui/components";
import { toast } from "sonner";

export const Profile = ({ url }: { url: string }) => {
  const router = useRouter();
  return (
    <Menu>
      <MenuButton>
        <img src={url} width={50} height={50} alt="user profile" />
      </MenuButton>
      <MenuContent>
        <MenuItem>Billing</MenuItem>
        <MenuSeparator />
        <MenuItem
          onClick={async () => {
            await vanillaApi.accounts.logout.mutate();
            router.replace("/");
            router.refresh();
            toast.info("Signed out");
          }}
        >
          Sign out
        </MenuItem>
      </MenuContent>
    </Menu>
  );
};
