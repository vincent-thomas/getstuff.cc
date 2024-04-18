import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import { z } from "zod";

const ssm = new SSMClient({ region: env.AWS_REGION });

const command = z.string().parse(
  await ssm
    .send(
      new GetParameterCommand({
        Name: `/stuff/api/${env.STAGE}/database-url`,
        WithDecryption: true,
      }),
    )
    .then(v => v.Parameter!.Value),
);

export const dbPgClient = neon(command);
export const db = drizzle(dbPgClient, { schema, logger: true });
