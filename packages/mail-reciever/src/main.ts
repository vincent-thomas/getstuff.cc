import { env } from "@/env";

import { getDataTable, getUserTable } from "@stuff/infra-constants";
import { messageValidator } from "./validators";
import { mailHandler } from "./handler";

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    console.log(JSON.parse(JSON.parse(body).Message));

    await mailHandler(
      getDataTable(env.STAGE),
      getUserTable(env.STAGE),
      messageValidator.parse(JSON.parse(JSON.parse(body).Message))
    );
  }

  return "";
};
