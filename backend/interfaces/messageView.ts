import { z } from "zod";


export const messageViewInterface = z.object({
  /**
   * Primary key:
   * format: mail|{messageId}
   */
  pk: z.string(),
  /**
   * Primary key:
   * format: mail|{timestamp}
   */
  sk: z.string(),
  encryptedMessageEncryptionKey: z.string()
})