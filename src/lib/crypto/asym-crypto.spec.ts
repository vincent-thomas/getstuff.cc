import { test, expect } from "@jest/globals";
import {
	decryptAsymmetric,
	encryptAsymmetric,
	genKeyPair,
} from "./asym-crypto";

const { privateKey, publicKey } = genKeyPair();

test("test", () => {
	const data = "data";
	const encrypted = encryptAsymmetric(Buffer.from(data), publicKey);
	const decrypted = decryptAsymmetric(encrypted, privateKey);
	expect(decrypted.toString("utf-8")).toEqual(data);
});
