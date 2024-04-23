import { drizzle } from "drizzle-orm/neon-http";
import { getEnv } from "./env";
import * as schema from "@backend/db/schema";
import { neon } from "@neondatabase/serverless";

const env = getEnv();
const pg = neon(env.DATABASE_URL);

export const db = drizzle(pg, { schema, logger: true });
