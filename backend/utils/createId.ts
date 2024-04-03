import { randomBytes } from "crypto";

export const createId = () => {
	return randomBytes(16).toString("hex");
};
