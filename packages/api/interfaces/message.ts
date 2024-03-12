import { z } from "zod";

const person = z.object({
  name: z.string(),
  address: z.string()
});

export const messageInterface = z.object({
  subject: z.string(),
  cc: z.array(person),
  sk: z.string(),
  pk: z.string(),
  to: z.array(person),
  from: person,
  repliedToId: z.string().nullable()
});
