import { randomUUID } from "crypto";
import { decode, sign, verify } from "jsonwebtoken";
import { z } from "zod";
import { customerInterface } from "../interfaces/customer";

export const jwtPayloadValidator = z.object({
  jti: z.string(),
  customerId: z.string(),
  customerStatus: customerInterface.shape.status,
  username: z.string(),
  exp: z.number()
});

export const createJwt = (
  username: string,
  customerId: string,
  customerStatus: z.infer<typeof customerInterface>["status"],
  serverEpheremalSecret: string
) => {
  const jti = randomUUID();

  return {
    jwt: sign(
      jwtPayloadValidator.parse({
        username,
        customerId,
        jti,
        customerStatus,
        exp: (Date.now() / 60) * 60 * 24
      }),
      serverEpheremalSecret,
      {
        algorithm: "HS512"
      }
    ),
    jti
  };
};

export const getJwtId = (jwt: string) =>
  jwtPayloadValidator.parse(decode(jwt)).jti;

export const verifyJwt = (jwt: string, serverEpheremalSecret: string) =>
  jwtPayloadValidator.parse(
    verify(jwt, serverEpheremalSecret, {
      algorithms: ["HS512"]
    })
  );
