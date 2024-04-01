import { SESClient } from "@aws-sdk/client-ses";

export const getSes = () => new SESClient({ region: env.AWS_REGION });
