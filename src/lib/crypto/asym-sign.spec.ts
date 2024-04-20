import { expect, test } from "@jest/globals";
import { genAsymSignKeyPair, sign, verify } from "./asym-sign";

test("Signing", async () => {
  const { privateKey, publicKey } = genAsymSignKeyPair();
  const data = "data";
  const encrypted = await sign(Buffer.from(data), privateKey);
  const decrypted = verify(encrypted, publicKey);

  expect(decrypted).not.toBe(null);
});
