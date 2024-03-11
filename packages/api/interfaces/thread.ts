import { z } from "zod";

export const threadInterface = z.object({
  pk: z.string(),
  sk: z.string(),
  title: z.string()
});
