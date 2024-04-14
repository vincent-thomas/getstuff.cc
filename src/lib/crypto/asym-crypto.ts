import {pki} from "node-forge";
const rsa = pki.rsa;

export const genKeyPair = () => {
  const keypair = rsa.generateKeyPair(2048);
  return {
    publicKey: pki.publicKeyToPem(keypair.publicKey),
    privateKey: pki.privateKeyToPem(keypair.privateKey),
  };
};
export const encryptAsymmetric = (data: Buffer, pubKey: string) => {
  const publicKey = pki.publicKeyFromPem(pubKey);
  return publicKey.encrypt(data.toString("hex"));
};

export const decryptAsymmetric = (data: string, pemPrivateKey: string) => {
  const privateKey = pki.privateKeyFromPem(pemPrivateKey);
  return Buffer.from(privateKey.decrypt(data), "hex");
};
