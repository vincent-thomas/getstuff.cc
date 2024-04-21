import { SignJWT, jwtVerify as joseVerifyJwt } from "jose";
import { z } from "zod";
import { customerInterface } from "../interfaces/customer";
const getJwtKey = () => {
  return env.JWT_SECRET;
};

export const jwtPayloadValidator = z.object({
  customerId: z.string(),
  customerStatus: customerInterface.shape.status,
  userId: z.string(),
});

export const createJwt = (
  userId: string,
  customerId: string,
  customerStatus: z.infer<typeof customerInterface>["status"],
) => {
  return new SignJWT(
    jwtPayloadValidator.parse({
      userId,
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
      v => v.payload,
    ),
  );
