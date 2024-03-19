import { z } from "zod";

export const userInterface = z.object({
  user_id: z.string(),
  created_at: z.number(),
  encryptedUserData: z.string(),
  encryptedDataKey: z.string(),
  salt: z.string(),
  name: z.string(),
  totpToken: z.string().optional(),
  customerId: z.string(),
  verifier: z.string(),
  publicKey: z.string(),
});
