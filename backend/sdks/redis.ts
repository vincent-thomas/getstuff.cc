import { env } from "@/env";
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import { Redis } from "@upstash/redis";
import { z } from "zod";

const getRedisUrl = async (ssm: SSMClient) =>
  z.string().parse(
    await ssm
      .send(
        new GetParameterCommand({
          Name: `/stuff/api/${env.STAGE}/redis-url`,
          WithDecryption: true,
        }),
      )
      .then((v) => v.Parameter?.Value),
  );
const getRedisToken = async (ssm: SSMClient) =>
  z.string().parse(
    await ssm
      .send(
        new GetParameterCommand({
          Name: `/stuff/api/${env.STAGE}/redis-token`,
          WithDecryption: true,
        }),
      )
      .then((v) => v.Parameter?.Value),
  );

export const getRedis = async () => {
  const ssm = new SSMClient({ region: env.AWS_REGION });

  const url = await getRedisUrl(ssm);
  const token = await getRedisToken(ssm);

  return new Redis({
    
    url,
    token,
  });
};
