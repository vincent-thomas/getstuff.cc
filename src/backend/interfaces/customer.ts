import { z } from "zod";

export const customerInterface = z.object({
  customer_id: z.string(),
  created_at: z.number(),
  status: z.enum(["inactive", "active", "past_due", "canceled"]),
  canceled_at: z.number().nullable(),
  cancel_at: z.number().nullable(),
});
