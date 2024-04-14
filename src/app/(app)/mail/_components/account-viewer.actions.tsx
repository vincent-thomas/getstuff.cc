"use client";

import { vanillaApi } from "@stuff/api-client/vanilla";
import { clearDerivedSecretStore } from "@stuff/lib/useUserPrivateKey";
import { CircleUserIcon, LogOutIcon } from "lucide-react";
import { MenuItem } from "packages/ui/components";

export const ManageAccount = () => {
  return (
    <MenuItem>
      <CircleUserIcon />
      Manage account
    </MenuItem>
  );
};

export const Logout = () => {
  return (
    <MenuItem
      variant="danger"
      onClick={async () => {
        await logoutMutation();
      }}
    >
      <LogOutIcon /> Log out
    </MenuItem>
  );
};

export const logoutMutation = async () => {
  await vanillaApi.accounts.logout.mutate();
  clearDerivedSecretStore();
  window.location.href = "/auth/identify";
};
