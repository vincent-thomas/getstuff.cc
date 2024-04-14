import { randomBytes, secretbox } from "tweetnacl";

export const symKeyLength = secretbox.keyLength;

export const serializeData = (data: string) => Buffer.from(data, "utf-8");
export const deserializeData = (data: Buffer | Uint8Array) =>
  Buffer.from(data).toString("utf-8");

export const encryptSymmetric = (data: string, key: Buffer) => {
  const nonce = randomBytes(secretbox.nonceLength);
  const box = secretbox(serializeData(data), nonce, key);

  const fullMessage = new Uint8Array(nonce.length + box.length);
  fullMessage.set(nonce);
  fullMessage.set(box, nonce.length);

  return Buffer.from(fullMessage).toString("hex");
};

export const decryptSymmetric = (data: string, key: Buffer) => {
  const decodedData = Buffer.from(data, "hex");
  const nonce = decodedData.slice(0, secretbox.nonceLength);
  const message = decodedData.slice(secretbox.nonceLength, decodedData.length);

  const decrypted = secretbox.open(message, nonce, key);

  if (!decrypted) {
    throw new Error("Could not decrypt message");
  }

  return deserializeData(decrypted);
};

export const genSymmetricKey = () => randomBytes(secretbox.keyLength);
