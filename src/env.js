import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    AWS_REGION: z.string(),
    STAGE: z.string(),
    AWS_ACCOUNT_ID: z.string(),
    DOMAIN: z.string(),
    APP_URL: z.string().url(),
    JWT_SECRET: z.string().length(64),
    DATABASE_URL: z.string().url(),
    REDIS_URL: z.string().url(),
    STRIPE_KEY: z.string(),
    STRIPE_PER_ALIAS_PRICE_ID: z.string(),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    AWS_REGION: process.env.AWS_REGION,
    STAGE: process.env.STAGE,
    AWS_ACCOUNT_ID: process.env.AWS_ACCOUNT_ID,
    DOMAIN: process.env.DOMAIN,
    APP_URL: process.env.APP_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    REDIS_URL: process.env.REDIS_URL,
    STRIPE_KEY: process.env.STRIPE_KEY,
    STRIPE_PER_ALIAS_PRICE_ID: process.env.STRIPE_PER_ALIAS_PRICE_ID,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
