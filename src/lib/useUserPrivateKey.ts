import { useMemo } from "react";
import { decryptSymmetric } from "./crypto/sym-crypto";
import { api } from "@stuff/api-client/react";
import SessionKeystore from "session-keystore";

let session: SessionKeystore | undefined = undefined;
const KEY = "password_derived_secret";

export const getSessionKeyStore = (): SessionKeystore => {
  if (session === undefined) {
    session = new SessionKeystore();
  }
  return session;
};

export const setPasswordDerivedSecret = (passwordDerivedSecret: string) => {
  getSessionKeyStore().set(KEY, passwordDerivedSecret);
};

export const getPasswordDerivedSecret = () => {
  return getSessionKeyStore().get(KEY);
};

export const clearDerivedSecretStore = () => {
  return getSessionKeyStore().clear();
};

export const useDataKey = () => {
  const raw = api.user.encryptedData.useQuery();
  const keyStore = useMemo(() => getSessionKeyStore(), []);
  const derivedMasterPassword =
    typeof window !== "undefined" ? keyStore.get(KEY) : null;

  return useMemo(() => {
    if (
      raw.data === undefined ||
      raw.data === null ||
      derivedMasterPassword === null
    ) {
      return;
    }
    return decryptSymmetric(
      raw.data.encryptedDataKey,
      Buffer.from(derivedMasterPassword, "hex")
    );
  }, [derivedMasterPassword, raw]);
};
