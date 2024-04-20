import { expect, test } from "@jest/globals";
import {
  decryptSymmetric,
  encryptSymmetric,
  genSymmetricKey,
} from "./sym-crypto";

test("Symmetric encryption", () => {
  const key = genSymmetricKey();
  const data = Buffer.from("data");
  const result = encryptSymmetric(data, key);
  const decryptedData = decryptSymmetric(result, key);
  expect(decryptedData).toEqual(data);
});
