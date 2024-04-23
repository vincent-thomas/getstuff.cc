import { S3Client } from "@aws-sdk/client-s3";

export const getS3 = () => new S3Client();
