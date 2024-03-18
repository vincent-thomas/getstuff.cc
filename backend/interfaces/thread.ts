import { z } from "zod";

export const threadInterface = z.object({
  /**
   * The primary key of the thread
   * Format: `mail|{threadId}`
   */
  pk: z.string(),
  /**
   * The secondary key of the thread
   * Format: `thread|{timestamp}`
   */
  sk: z.string(),
  title: z.string()
});
