import { env } from "@/env";
import { SESClient } from "@aws-sdk/client-ses";

export const getSes = () => new SESClient({ region: env.REGION });
