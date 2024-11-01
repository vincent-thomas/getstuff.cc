// @ts-ignore

import { mailHandler } from "./handler";
import { messageValidator } from "./validators";

interface MailRecord {
  messageId: string;
  receiptHandle: string;
  body: string;
  attributes: {
    ApproximateReceiveCount: string;
    SentTimestamp: string;
    SenderId: string;
    ApproximateFirstReceiveTimestamp: string;
  };
  eventSource: string;
  eventSourceARN: string;
  awsRegion: string;
}

export const handler = async (event: { Records: MailRecord[] }) => {
  for (const { body } of event.Records) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    // biome-ignore lint/suspicious/noExplicitAny: Det parsas ändå
    const mail = JSON.parse((JSON.parse(body) as any).Message) as any;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (mail?.mail?.messageId === "AMAZON_SES_SETUP_NOTIFICATION") {
      return "";
    }

    const pmail = messageValidator.parse(mail);

    await mailHandler(
      pmail.receipt.action.bucketName,
      pmail.receipt.action.objectKey,
      pmail.mail.messageId,
    );
  }

  return "";
};
