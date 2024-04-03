import { z } from "zod";

export const userDataInterface = z.object({
	theme: z.enum(["light", "dark"]),
	avatar_url: z.string().url().optional(),
});
