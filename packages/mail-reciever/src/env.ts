import { z } from "zod";

export const envInterface = z.object({
  STAGE: z.string(),
  AWS_REGION: z.string(),
  EMAIL_DOMAIN: z.string()
});

export const getEnv = () => envInterface.parse(process.env)