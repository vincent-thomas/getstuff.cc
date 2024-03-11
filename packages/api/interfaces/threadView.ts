import { z } from "zod";

export const threadViewInterface = z.object({
  /**
   * mail|{messageId}
   */
  pk: z.string(),
  sk: z.string(),

  last_active: z.number(),
  encryptedKey: z.string(),
  read: z.boolean()
});
