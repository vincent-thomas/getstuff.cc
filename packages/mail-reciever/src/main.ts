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
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
		const mail = JSON.parse(JSON.parse(body).Message);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (mail?.mail?.messageId === "AMAZON_SES_SETUP_NOTIFICATION") {
			return "";
		}

		await mailHandler(messageValidator.parse(mail));
	}

	return "";
};
