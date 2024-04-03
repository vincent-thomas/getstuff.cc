import { z } from "zod";

const person = z.object({
	name: z.string(),
	address: z.string(),
});

export const messageInterface = z.object({
	/**
	 * Primary Key
	 * Format: mail|{threadId}
	 */
	pk: z.string(),
	/**
	 * sort Key
	 * Format: message|{messageId}
	 */
	sk: z.string(),
	subject: z.string(),
	cc: z.array(person),
	to: z.array(person),
	from: person,
	created_at: z.number(),
	repliedToId: z.string().nullable(),
});
