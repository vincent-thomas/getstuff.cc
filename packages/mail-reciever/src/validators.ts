import { z } from "zod";

export const verdictValidator = z.enum(["PASS", "FAIL", "GRAY"]);

export type Verdict = z.infer<typeof verdictValidator>;
export const messageValidator = z.object({
  mail: z.object({
    messageId: z.string(),
    commonHeaders: z.object({
      messageId: z.string(),
      date: z.string(),
      subject: z.string(),
    }),
  }),
  receipt: z.object({
    action: z.object({
      bucketName: z.string(),
      objectKey: z.string(),
    }),
    spfVerdict: z.object({ status: verdictValidator }),
    dkimVerdict: z.object({ status: verdictValidator }),
    dmarcVerdict: z.object({ status: verdictValidator }),
  }),
});
