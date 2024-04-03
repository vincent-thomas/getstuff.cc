import { test, expect } from "@jest/globals";
import { genAsymSignKeyPair, sign, verify } from "./asym-sign";

const { privateKey, publicKey } = genAsymSignKeyPair();

test("Signing", async () => {
	const data = "data";
	const encrypted = await sign(Buffer.from(data), privateKey);
	const decrypted = verify(encrypted, publicKey);

	expect(decrypted).not.toBe(null);
});
