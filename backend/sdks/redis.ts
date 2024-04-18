import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import { Redis } from "ioredis";
import { z } from "zod";

const getRedisUrl = async (ssm: SSMClient, stage: string) =>
  z.string().parse(
    await ssm
      .send(
        new GetParameterCommand({
          Name: `/stuff/api/${stage}/redis-url`,
          WithDecryption: true,
        }),
      )
      .then(v => v.Parameter?.Value),
  );

export const getRedis = async (region: string, stage: string) => {
  const ssm = new SSMClient({ region });

  const url = await getRedisUrl(ssm, stage);
  return new Redis(url);
};
