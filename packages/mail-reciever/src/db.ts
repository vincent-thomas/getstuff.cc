import { drizzle } from "drizzle-orm/neon-http";
import { getEnv } from "./env";
import * as schema from "@backend/db/schema";
import { neon } from "@neondatabase/serverless";

const env = getEnv();

export const db = drizzle(neon(env.DATABASE_URL), { schema, logger: true });
