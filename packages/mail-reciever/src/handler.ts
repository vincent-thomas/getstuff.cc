import {
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { parseEmail } from "./emailParser";

const s3 = new S3Client();

export const mailHandler = async (bucketName: string, objectKey: string) => {
  const getRawMailCommand = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });

  const email = await s3
    .send(getRawMailCommand)
    .then(v => v.Body?.transformToString());

  if (email === undefined) {
    return "";
  }

  console.log(email);

  const parsedMail = await parseEmail(email);

  console.log(parsedMail);

  const deleteEmailCommand = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });

  await s3.send(deleteEmailCommand);
};
