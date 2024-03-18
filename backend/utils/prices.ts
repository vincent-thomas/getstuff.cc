import { env } from "@/env";
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import { z } from "zod";

export const getStuffPlusPriceId = async () => {
  const ssm = new SSMClient({ region: env.AWS_REGION });
  const command = new GetParameterCommand({
    Name: "/stuff/api/dev/prices/stuff-plus",
    WithDecryption: false,
  });

  const result = await ssm.send(command);

  return z.string().parse(result.Parameter?.Value);
}