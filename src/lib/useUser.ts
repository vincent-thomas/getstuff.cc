"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";

import { userAtom } from "./userStore";

export const useUser = () => {
  const [user, _setUser] = useAtom(userAtom);

  useEffect(() => {
    // if (count.current === false) {
    //   count.current = true;
    //   return;
    // }
    // const passwordDerivedSecretHex = getPasswordDerivedSecret();
    // if (passwordDerivedSecretHex === null) {
    //   try {
    //     vanillaApi.accounts.logout.mutate().catch(() => ({}));
    //   } finally {
    //     clearDerivedSecretStore();
    //     setUser(null);
    //   }
    //   return;
    // }
    // if (passwordDerivedSecretHex === undefined) {
    //   return;
    // }
    // if (sessionQuery.data === null) {
    //   setUser(null);
    //   return;
    // }
    // // Loading state...
    // if (encryptedDataQuery.data === undefined) {
    //   return;
    // }
    // if (encryptedDataQuery.data === null) {
    //   setUser(null);
    //   return;
    // }
    // const passwordDerivedSecret = Buffer.from(passwordDerivedSecretHex, "hex");
    // const result = decryptSymmetric(
    //   Buffer.from(encryptedDataQuery.data.encryptedUserData, "hex"),
    //   passwordDerivedSecret,
    // ).toString("utf-8");
    // setUser(userDataInterface.parse(JSON.parse(result)));
  }, []);
  return user;
};
