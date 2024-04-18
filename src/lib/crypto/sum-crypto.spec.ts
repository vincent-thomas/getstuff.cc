import { expect, test } from "@jest/globals";
import {
  decryptSymmetric,
  encryptSymmetric,
  genSymmetricKey,
} from "./sym-crypto";

const key = genSymmetricKey();

test("Symmetric encryption", () => {
  const data = Buffer.from("data");
  const result = encryptSymmetric(data, key);
  const decryptedData = decryptSymmetric(result, key);
  expect(decryptedData).toEqual(data);
});
