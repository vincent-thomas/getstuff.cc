import { env } from "@/env";
import { encryptAsymmetric } from "@/lib/asym-crypto";
import { encryptSymmetric, genSymmetricKey } from "@/lib/sym-crypto";
import { SendEmailCommand } from "@aws-sdk/client-ses";
import { getDataTable } from "@stuff/infra-constants";
import { protectedProc, router } from "packages/api/trpc";
import { getUser } from "packages/api/utils/getUser";
import {
  createThread,
  createThreadView,
  uploadMessage
} from "packages/mail-reciever/src/util";
import { z } from "zod";

export const sendMailRouter = router({
  sendMail: protectedProc
    .input(
      z.object({
        content: z.object({
          text: z.string(),
          html: z.string()
        }),
        subject: z.string(),
        to: z.array(z.string().email()),
        bcc: z.array(z.string().email()),
        cc: z.array(z.string().email())
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = (await getUser(ctx.dyn, ctx.session.username))!;
      const command = new SendEmailCommand({
        Destination: {
          BccAddresses: input.bcc,
          CcAddresses: input.cc,
          ToAddresses: input.to
        },
        Message: {
          Body: {
            Html: {
              Data: input.content.html
            },
            Text: {
              Data: input.content.text
            }
          },
          Subject: {
            Data: input.subject
          }
        },
        Source: `${ctx.session.username}@${ctx.env.DOMAIN}`
      });

      try {


      const { MessageId } = await ctx.ses.send(command);

      const threadId = await createThread(
        ctx.dyn,
        getDataTable(env.STAGE),
        input.subject
      );

      const encryptionKey = genSymmetricKey();

      const htmlContent = encryptSymmetric(
        input.content.html,
        Buffer.from(encryptionKey)
      );

      const textContent = encryptSymmetric(
        input.content.text,
        Buffer.from(encryptionKey)
      );

      await uploadMessage(
        ctx.s3,
        ctx.dyn,
        z.string().parse(MessageId),
        threadId,
        {
          subject: input.subject,
          to: input.to.map(address => ({ name: "", address })),
          cc: input.cc.map(address => ({ name: "", address })),
          content: {
            html: htmlContent,
            text: textContent
          },
          from: {
            name: user.name,
            address: `${ctx.session.username}@${ctx.env.DOMAIN}`
          }
        }
      );

      const encryptedUserKey = encryptAsymmetric(
        Buffer.from(encryptionKey),
        user.publicKey
      );

      await createThreadView(
        ctx.dyn,
        "sent",
        threadId,
        ctx.session.username,
        encryptedUserKey
      );
      }
      catch (e) {
        console.error(e);
        throw e;
      }
    })
});
