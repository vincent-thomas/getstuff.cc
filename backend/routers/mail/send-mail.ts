import {
  encryptAsymmetric,
  encryptSymmetric,
  genSymmetricKey,
} from "@stuff/lib/crypto";
import { SendEmailCommand } from "@aws-sdk/client-ses";
import { getDataTable } from "@stuff/infra-constants";
import { protectedProc, router } from "backend/trpc";
import { getUser } from "backend/utils/getUser";
import {
  createMessageView,
  createThread,
  createThreadView,
  uploadMessage,
} from "packages/mail-reciever/src/util";
import { z } from "zod";

export const sendMailRouter = router({
  sendMail: protectedProc
    .input(
      z.object({
        content: z.object({
          text: z.string(),
          html: z.string(),
        }),
        subject: z.string(),
        to: z.array(z.string().email()),
        bcc: z.array(z.string().email()),
        cc: z.array(z.string().email()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = (await getUser(
        ctx.dyn,
        env.STAGE,
        ctx.session.username,
      ))!;
      const command = new SendEmailCommand({
        Destination: {
          BccAddresses: input.bcc,
          CcAddresses: input.cc,
          ToAddresses: input.to,
        },
        Message: {
          Body: {
            Html: {
              Data: input.content.html,
            },
            Text: {
              Data: input.content.text,
            },
          },
          Subject: {
            Data: input.subject,
          },
        },
        Source: `${ctx.session.username}@${env.DOMAIN}`,
      });

      try {
        const { MessageId: DO_NOT_USE_BEYOND_ONE_LINE_DOWN } =
          await ctx.ses.send(command);
        const messageId = `<${DO_NOT_USE_BEYOND_ONE_LINE_DOWN}@${env.AWS_REGION}.amazonses.com>`;

        const threadId = await createThread(
          ctx.dyn,
          getDataTable(env.STAGE),
          input.subject,
        );

        const encryptionKey = genSymmetricKey();

        const htmlContent = encryptSymmetric(
          input.content.html,
          Buffer.from(encryptionKey),
        );

        const textContent = encryptSymmetric(
          input.content.text,
          Buffer.from(encryptionKey),
        );

        await uploadMessage(
          ctx.s3,
          ctx.dyn,
          env.STAGE,
          z.string().parse(messageId),
          threadId,
          {
            subject: input.subject,
            to: input.to.map((address) => ({ name: "", address })),
            cc: input.cc.map((address) => ({ name: "", address })),
            content: {
              html: htmlContent,
              text: textContent,
            },
            from: {
              name: user.name,
              address: `${ctx.session.username}@${env.DOMAIN}`,
            },
          },
        );

        const encryptedUserKey = encryptAsymmetric(
          Buffer.from(encryptionKey),
          user.publicKey,
        );

        await createMessageView(ctx.dyn, env.STAGE, {
          messageId: z.string().parse(messageId),
          encryptedMessageEncryptionKey: encryptedUserKey,
        });

        await createThreadView(
          ctx.dyn,
          env.STAGE,
          "sent",
          threadId,
          ctx.session.username,
        );
      } catch (e) {
        console.error(e);
        throw e;
      }
    }),
});
