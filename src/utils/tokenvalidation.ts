import type { Next } from "hono";
import jwt from "jsonwebtoken";
import Users from "../models/user";
import ErrorHandler from "./error";
import UpdateTokens from "./tokenupdate";
import { dateAddHours } from "./dateaddhours";

const g = globalThis as any;

async function validateToken(c: any, next: Next) {
  const authErr = () =>
    ErrorHandler.create(
      'errors.com.epicgames.common.authorization.authorization_failed',
      `Authorization failed for ${c.req.url}`,
      [c.req.url],
      1032,
      undefined,
      401,
      c
    );
  const authHeader = c.req.header("authorization");
  if (!authHeader || !authHeader.startsWith('bearer eg1~')) return authErr();
  const token = authHeader.replace('bearer eg1~', '');
  try {
    const decoded = jwt.decode(token) as any;
    if (!decoded) throw new Error('Invalid token');
    if (!g.accessTokens.find((i: any) => i.token === `eg1~${token}`)) throw new Error('Invalid token');
    if (dateAddHours(new Date(decoded.creation_date), decoded.hours_expire).getTime() <= Date.now())
      throw new Error('Expired access token');
    const user = await Users.findOne({ accountId: decoded.sub });
    if (!user) return authErr();
    if (user.banned)
      return ErrorHandler.create(
        'errors.com.epicgames.account.account_not_active',
        'You have been permanently banned from Lumic.',
        [],
        -1,
        undefined,
        400,
        c
      );
    c.set('user', user);
    await next();
  } catch {
    const idx = g.accessTokens.findIndex((i: any) => i.token === `eg1~${token}`);
    if (idx !== -1) {
      g.accessTokens.splice(idx, 1);
      UpdateTokens();
    }
    return authErr();
  }
}

async function validateClient(c: any, next: () => void) {
    const authErr = () =>
        ErrorHandler.create(
            "errors.com.epicgames.common.authorization.authorization_failed",
            `Authorization failed for ${c.req.url}`,
            [c.req.url],
            1032,
            undefined,
            401,
            c
        );
    const authHeader = c.req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("bearer eg1~")) return authErr();
    const token = authHeader.replace("bearer eg1~", "");
    try {
        const decoded = jwt.decode(token) as any;
        if (!decoded) throw new Error("Invalid token");
        const findAccess = g.accessTokens.find((i: any) => i.token === `eg1~${token}`);
        const findClient = g.clientTokens.find((i: any) => i.token === `eg1~${token}`);
        if (!findAccess && !findClient) throw new Error("Invalid token");
        if (dateAddHours(new Date(decoded.creation_date), decoded.hours_expire).getTime() <= Date.now())
            throw new Error("Expired access/client token");
        if (findAccess) {
            c.user = await Users.findOne({ accountId: decoded.sub });
            if (c.user?.banned)
                return ErrorHandler.create(
                    "errors.com.epicgames.account.account_not_active",
                    "You have been permanently banned from Lumic.",
                    [],
                    -1,
                    undefined,
                    400,
                    c
                );
        }
        next();
    } catch {
        const accessIndex = g.accessTokens.findIndex((i: any) => i.token === `eg1~${token}`);
        if (accessIndex !== -1) g.accessTokens.splice(accessIndex, 1);
        const clientIndex = g.clientTokens.findIndex((i: any) => i.token === `eg1~${token}`);
        if (clientIndex !== -1) g.clientTokens.splice(clientIndex, 1);
        if (accessIndex !== -1 || clientIndex !== -1) UpdateTokens();
        return authErr();
    }
}

export { validateToken, validateClient };