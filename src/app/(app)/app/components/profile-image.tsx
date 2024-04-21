"use client";

import { vanillaApi } from "@stuff/api-client/vanilla";
import { useRouter } from "next/navigation";
import {
  Menu,
  MenuButton,
  MenuContent,
  MenuItem,
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
        <MenuItem
          onClick={async () => {
            await vanillaApi.accounts.logout.mutate();
            toast.info("Signed out");
            router.push("/");
          }}
        >
          Sign out
        </MenuItem>
      </MenuContent>
    </Menu>
  );
};
