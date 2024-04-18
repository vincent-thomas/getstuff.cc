import { randomBytes, secretbox } from "tweetnacl";

export const symKeyLength = secretbox.keyLength;

export const serializeData = (data: string) => Buffer.from(data, "utf-8");
export const deserializeData = (data: Buffer | Uint8Array) =>
  Buffer.from(data).toString("utf-8");

export const encryptSymmetric = (data: Buffer, key: Buffer) => {
  const nonce = randomBytes(secretbox.nonceLength);
  const box = secretbox(data, nonce, key);

  const fullMessage = new Uint8Array(nonce.length + box.length);
  fullMessage.set(nonce);
  fullMessage.set(box, nonce.length);

  return Buffer.from(fullMessage);
};

export const decryptSymmetric = (data: Buffer, key: Buffer) => {
  const nonce = data.slice(0, secretbox.nonceLength);
  const message = data.slice(secretbox.nonceLength, data.length);

  const decrypted = secretbox.open(message, nonce, key);

  if (!decrypted) {
    throw new Error("Could not decrypt message");
  }

  return Buffer.from(decrypted);
};

export const genSymmetricKey = () =>
  Buffer.from(randomBytes(secretbox.keyLength));
