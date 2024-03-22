import { sign as tweetSign } from "tweetnacl";

export const serialize = (privateKey: Uint8Array) =>
  Buffer.from(privateKey).toString("base64");

export const deserialize = (privateKey: string) =>
  Buffer.from(privateKey, "base64");

export const genAsymSignKeyPair = () => {
  const { publicKey, secretKey } = tweetSign.keyPair();

  return {
    publicKey: serialize(publicKey),
    privateKey: serialize(secretKey)
  };
};

export const sign = async (message: Buffer, privateKey: string) => {
  const rawPrivateKey = deserialize(privateKey);
  return serialize(tweetSign(message, rawPrivateKey));
};

export const verify = (signature: string, publicKey: string) => {
  const rawPublicKey = deserialize(publicKey);
  const decodedSignature = deserialize(signature);
  return tweetSign.open(decodedSignature, rawPublicKey);
};
