import { symKeyLength } from "@stuff/lib/crypto";

export const generateMasterSecret = async (pass: string, salt: string) => {
  const { hash } = await import("argon2-browser");
  return await hash({
    pass: Buffer.from(pass),
    salt: Buffer.from(salt, "hex"),
  }).then(result => result.encoded);
};

export const deriveSymmetricKey = async (pass: string, salt: string) => {
  const { pbkdf2Sync } = await import("pbkdf2");
  return pbkdf2Sync(pass, salt, 1_000, symKeyLength);
};

export const createSRPPrivateKey = async (pass: string, salt: string) => {
  return await deriveSymmetricKey(pass, salt).then(v => v.toString("hex"));
};
export const createPasswordDerivedSecret = deriveSymmetricKey;
