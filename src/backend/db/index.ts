import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

const pg = new Client(env.DATABASE_URL);

export const db = drizzle(pg);
