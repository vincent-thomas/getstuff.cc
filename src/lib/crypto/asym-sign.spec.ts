import { expect, test } from "@jest/globals";
import { genAsymSignKeyPair, sign, verify } from "./asym-sign";

test("Signing", () => {
  const { privateKey, publicKey } = genAsymSignKeyPair();
  const data = "data";
  const encrypted = sign(Buffer.from(data), privateKey);
  const decrypted = verify(encrypted, publicKey);

  expect(decrypted).not.toBe(null);
});
