"use client";

import { api } from "@stuff/api-client/react";
import { vanillaApi } from "@stuff/api-client/vanilla";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { userDataInterface } from "../interfaces";
import { decryptSymmetric } from "./crypto";
import {
  clearDerivedSecretStore,
  getPasswordDerivedSecret,
} from "./useUserPrivateKey";
import { userAtom } from "./userStore";

export const useUser = () => {
  const sessionQuery = api.user.session.useQuery();
  const encryptedDataQuery = api.user.encryptedData.useQuery(undefined, {
    enabled: sessionQuery.data !== undefined && sessionQuery.data !== null,
  });
  const count = useRef(false);

  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (count.current === false) {
      count.current = true;
      return;
    }
    const passwordDerivedSecretHex = getPasswordDerivedSecret();
    if (passwordDerivedSecretHex === null) {
      try {
        vanillaApi.accounts.logout.mutate().catch(() => ({}));
      } finally {
        clearDerivedSecretStore();
        setUser(null);
      }
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
      Buffer.from(encryptedDataQuery.data.encryptedUserData, "hex"),
      passwordDerivedSecret,
    ).toString("utf-8");
    setUser(userDataInterface.parse(JSON.parse(result)));
  }, [encryptedDataQuery.data, sessionQuery.data, setUser]);
  return user;
};
