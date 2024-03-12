import { useMemo } from "react";
import { decryptSymmetric } from "./sym-crypto";
import { api } from "@stuff/api-client/react";

export const useMasterPrivateKey = () => {
  const raw = api.user.encryptedData.useQuery();
  const derivedMasterPassword =
    typeof window !== "undefined"
      ? sessionStorage.getItem("password_derived_secret")
      : null;

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
