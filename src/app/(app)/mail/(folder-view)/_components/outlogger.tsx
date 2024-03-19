"use client";

import { api } from "@stuff/api-client/react";
import { clearDerivedSecretStore } from "@stuff/lib/useUserPrivateKey";
import type { ReactNode } from "react";

export const Outlogger = ({children}: {children: ReactNode}) => {
  const logoutMutation = api.accounts.logout.useMutation();
  return (
    <button onClick={async () => {
      await logoutMutation.mutateAsync();
      clearDerivedSecretStore()
    }}>{children}</button>
  )
}