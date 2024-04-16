import { S3Client } from "@aws-sdk/client-s3";

export const getS3 = (region: string) => new S3Client({ region });
