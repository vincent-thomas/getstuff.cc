import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const pg = postgres(env.DATABASE_URL);

export const db = drizzle(pg);
