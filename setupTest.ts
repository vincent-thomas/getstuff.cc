import {
  PostgreSqlContainer,
  type StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { execSync } from "child_process";
import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import { Redis } from "ioredis";
import postgres from "postgres";
import { GenericContainer, type StartedTestContainer } from "testcontainers";

let postgresContainer: StartedPostgreSqlContainer;
let postgresClient: Client;
let testDb: PostgresJsDatabase;
let redisContainer: StartedTestContainer;
let redisClient: Redis;

beforeAll(async () => {
  postgresContainer = await new PostgreSqlContainer().start();
  execSync("pnpm cross-env SKIP_ENV_VALIDATION='1' drizzle-kit push:pg", {
    env: {
      DATABASE_URL: postgresContainer.getConnectionUri(),
      NODE_ENV: "test",
    },
  });
  const postgresSql = postgres(postgresContainer.getConnectionUri());

  testDb = drizzle(postgresSql);

  redisContainer = await new GenericContainer("redis")
    .withExposedPorts(6379)
    .withStartupTimeout(10_000)
    .start();

  redisClient = new Redis({
    host: redisContainer.getHost(),
    port: redisContainer.getFirstMappedPort(),
  });
});

afterAll(async () => {
  if (postgresContainer) {
    await postgresContainer.stop();
  }
  if (redisContainer) {
    await redisContainer.stop();
  }
});
// add some timeout until containers are up and working
export { postgresClient, testDb, redisClient as testRedis };
