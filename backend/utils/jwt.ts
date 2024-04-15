import { z } from "zod";
import { customerInterface } from "../interfaces/customer";
import { SignJWT, jwtVerify as joseVerifyJwt } from "jose";
const getJwtKey = () => {
  return env.JWT_SECRET;
};

export const jwtPayloadValidator = z.object({
  customerId: z.string(),
  customerStatus: customerInterface.shape.status,
  username: z.string(),
});

export const createJwt = (
  username: string,
  customerId: string,
  customerStatus: z.infer<typeof customerInterface>["status"],
) => {
  return new SignJWT(
    jwtPayloadValidator.parse({
      username,
      customerId,
      customerStatus,
    }),
  )
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime((Date.now() / 60) * 60 * 24)
    .sign(new TextEncoder().encode(getJwtKey()));
};

export const verifyJwt = async (jwt: string) =>
  jwtPayloadValidator.parse(
    await joseVerifyJwt(jwt, new TextEncoder().encode(getJwtKey())).then(
      (v) => v.payload,
    ),
  );
