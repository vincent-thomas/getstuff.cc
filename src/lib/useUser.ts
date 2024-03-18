"use client";

import { api } from "@stuff/api-client/react";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { userAtom } from "./userStore";
import {
  clearDerivedSecretStore,
  getPasswordDerivedSecret
} from "./useUserPrivateKey";
import { decryptSymmetric } from "./crypto";
import { userDataInterface } from "../interfaces";

export const useUser = () => {
  const sessionQuery = api.user.session.useQuery();
  const encryptedDataQuery = api.user.encryptedData.useQuery(undefined, {
    enabled: sessionQuery.data !== undefined && sessionQuery.data !== null
  });
  const count = useRef(false);

  const [user, setUser] = useAtom(userAtom);
  const logoutMutation = api.accounts.logout.useMutation();

  const passwordDerivedSecretHex =
    typeof window !== "undefined" ? getPasswordDerivedSecret() : undefined;

  useEffect(() => {
    if (count.current == false) {
      count.current = true;
      return;
    }

    if (passwordDerivedSecretHex === null) {
      async function logout() {
        try {
          await logoutMutation.mutateAsync();
        }
        catch {}
        clearDerivedSecretStore();
        setUser(null);
      }


      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      logout();
      return;
    }

    if (passwordDerivedSecretHex === undefined) {
      return;
    }

    if (sessionQuery.data === null) {
      setUser(null);
      return;
    }

    // Loading state...
    if (encryptedDataQuery.data === undefined) {
      return;
    }

    if (encryptedDataQuery.data === null) {
      setUser(null);
      return;
    }

    const passwordDerivedSecret = Buffer.from(passwordDerivedSecretHex, "hex");

    const result = decryptSymmetric(
      encryptedDataQuery.data.encryptedUserData,
      passwordDerivedSecret
    );
    setUser(userDataInterface.parse(JSON.parse(result)));
  }, [encryptedDataQuery.data, passwordDerivedSecretHex, sessionQuery.data]);

  return user;
};
