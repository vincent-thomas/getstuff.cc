import { expect, test } from "@jest/globals";
import {
  decryptAsymmetric,
  encryptAsymmetric,
  genKeyPair,
} from "./asym-crypto";

test("test", () => {
  const { privateKey, publicKey } = genKeyPair();
  const data = Buffer.from("data");
  const encrypted = encryptAsymmetric(data, publicKey);
  const decrypted = decryptAsymmetric(encrypted, privateKey);
  expect(decrypted).toEqual(data);
});
