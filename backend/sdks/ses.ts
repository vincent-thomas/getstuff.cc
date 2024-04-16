import { SESClient } from "@aws-sdk/client-ses";

export const getSes = (region: string) => new SESClient({ region });
