"use client";

import { userDataInterface } from "@/interfaces/userData";
import { decryptSymmetric } from "@/lib/sym-crypto";
import { api } from "@stuff/api-client/react";
import { useMemo, useRef, useState } from "react";
import type { z } from "zod";

export const useUser = () => {
  const encryptedDataQuery = api.user.encryptedData.useQuery();
  const count = useRef(false);

  const [user, setUser] = useState<null | z.infer<typeof userDataInterface>>(
    null
  );

  const passwordDerivedSecretHex =
    typeof window !== "undefined"
      ? sessionStorage.getItem("password_derived_secret")
      : null;

  useMemo(() => {
    if (count.current == false) {
      count.current = true;
      return;
    }
    if (passwordDerivedSecretHex === null) {
      throw new Error("PasswordDerivedSecret not found in session storage");
    }
    if (encryptedDataQuery.data?.encryptedUserData === undefined) {
      return;
    }
    const passwordDerivedSecret = Buffer.from(passwordDerivedSecretHex, "hex");

    const result = decryptSymmetric(
      encryptedDataQuery.data?.encryptedUserData,
      passwordDerivedSecret
    );
    console.log(result);
    setUser(userDataInterface.parse(JSON.parse(result)));
  }, [encryptedDataQuery.data, passwordDerivedSecretHex]);

  return user;
};
