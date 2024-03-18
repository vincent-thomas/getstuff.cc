import { z } from "zod";

export const threadViewInterface = z.object({
  /**
   * mail|{threadId}
   */
  pk: z.string(),
  /**
   * mail|{username}|{threadId}
   */
  sk: z.string(),

  last_active: z.number(),
  read: z.boolean()
});
