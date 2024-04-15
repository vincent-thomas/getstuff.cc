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
		KAFKA_BROKER: z.string(),
		KAFKA_USERNAME: z.string(),
		KAFKA_PASSWORD: z.string()
	},
	client: {},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		AWS_REGION: process.env.AWS_REGION,
		STAGE: process.env.STAGE,
		AWS_ACCOUNT_ID: process.env.AWS_ACCOUNT_ID,
		DOMAIN: process.env.DOMAIN,
		APP_URL: process.env.APP_URL,
		JWT_SECRET: process.env.JWT_SECRET,
		
		KAFKA_BROKER: process.env.KAFKA_BROKER,
		KAFKA_USERNAME: process.env.KAFKA_USERNAME,
		KAFKA_PASSWORD: process.env.KAFKA_PASSWORD
	},
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true,
});
