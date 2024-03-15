import { z } from "zod";


export const folderInterface = z.object({
  /**
   * Primary key: "mail|{userId}""
   */
  pk: z.string(),
  /**
   * secondary key: "folder|{folderId}"
   */
  sk: z.string(),
    /**
   * gsi2: "folder|{userId}|{name}"
   */
  gsi2: z.string()
})