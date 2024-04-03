import { z } from "zod";

export const addressAliasInterface = z.object({
	pk: z.string(),
	sk: z.string(),
	label: z.string(),
	description: z.string(),
	enabled: z.boolean(),
	created_at: z.number(),
});
