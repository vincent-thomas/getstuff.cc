import type { Config } from "drizzle-kit";
import { env } from "./src/env";

export default {
  schema: "./backend/db/schema/index.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
