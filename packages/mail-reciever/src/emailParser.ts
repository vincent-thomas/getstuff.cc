import { type AddressObject, simpleParser } from "mailparser";
import { z } from "zod";

export const parseEmail = async (mimeEmail: string) => {
  const parsedEmailContent = await simpleParser(mimeEmail);

  const attachments = parsedEmailContent.attachments.map(v => ({
    filename: v.filename,
    contentId: v.cid,
    content: v.content,
    mimeType: v.contentType,
    shouldBeDownloaded: !v.related,
    /** In Bytes */
    size: v.size
  }));

  let toPersons_UNFORMATTED: AddressObject | undefined;

  const fromPerson = parsedEmailContent.from?.value.map(person => ({
    name: person.name,
    address: person.address
  }))[0];

  if (Array.isArray(parsedEmailContent.to)) {
    toPersons_UNFORMATTED = parsedEmailContent.to[0];
  } else if (parsedEmailContent.to) {
    toPersons_UNFORMATTED = parsedEmailContent.to;
  } else {
    return;
  }

  const toPersons = toPersons_UNFORMATTED?.value.map(toValue => ({
    address: z.string().parse(toValue.address),
    name: toValue.name
  }));

  let cc: { name: string; address?: string }[] = [];

  if (Array.isArray(parsedEmailContent?.cc)) {
    cc =
      parsedEmailContent.cc[0]?.value.map(cc => ({
        address: cc.address,
        name: cc.name
      })) ?? [];
  } else if (parsedEmailContent?.cc) {
    cc = parsedEmailContent.cc.value.map(cc => ({
      name: cc.name,
      address: cc.address
    }));
  }
  console.log(parsedEmailContent.headers);

  const returnPath = parsedEmailContent.headers.get(
    "return-path"
  ) as AddressObject;

  return {
    messageId: parsedEmailContent.messageId,
    sentFromAddress: fromPerson,
    recievedByAddresses: toPersons,
    subject: parsedEmailContent.subject,

    attachments,
    messageIdReplyingTo: parsedEmailContent.inReplyTo,
    cc,
    returnPath: returnPath.value[0]?.address,
    body: {
      text: parsedEmailContent.text,
      html: parsedEmailContent.html
    }
  };
};
