import { verifyJwt } from "./jwt";

export async function getUserFromHeader(cookies: Record<string, string>) {
  if (cookies["stuff-active"]) {
    try {
      const active = cookies["stuff-active"];
      if (active === undefined) {
        return null;
      }
      const jwt = cookies[`stuff-token-${active}`];

      if (jwt === undefined) {
        return null;
      }

      const user = await verifyJwt(jwt);

      return user;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  return null;
}
