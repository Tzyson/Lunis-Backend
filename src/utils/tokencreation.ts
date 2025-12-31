import jwt from "jsonwebtoken";
const g = globalThis as any;

function createClient(clientId: string, grant_type: string, ip: string, expiresIn: number) {
  const clientToken = jwt.sign({
    p: Buffer.from(crypto.randomUUID()).toString("base64"),
    clsvc: "fortnite",
    t: "s",
    mver: false,
    clid: clientId,
    ic: true,
    am: grant_type,
    jti: crypto.randomUUID().replace(/-/g, ""),
    creation_date: new Date(),
    hours_expire: expiresIn
  }, g.jwt, { expiresIn: `${expiresIn}h` });
  g.clientTokens.push({ ip, token: `eg1~${clientToken}` });
  return clientToken;
}

function createAccess(user: any, clientId: string, grant_type: string, deviceId: string, expiresIn: number) {
  const accessToken = jwt.sign({
    app: "fortnite",
    sub: user.accountId,
    dvid: deviceId,
    mver: false,
    clid: clientId,
    dn: user.username,
    am: grant_type,
    p: Buffer.from(crypto.randomUUID()).toString("base64"),
    iai: user.accountId,
    sec: 1,
    clsvc: "fortnite",
    t: "s",
    ic: true,
    jti: crypto.randomUUID().replace(/-/g, ""),
    creation_date: new Date(),
    hours_expire: expiresIn
  }, g.jwt, { expiresIn: `${expiresIn}h` });
  g.accessTokens.push({ accountId: user.accountId, token: `eg1~${accessToken}` });
  return accessToken;
}

function createRefresh(user: any, clientId: string, grant_type: string, deviceId: string, expiresIn: number) {
  const refreshToken = jwt.sign({
    sub: user.accountId,
    dvid: deviceId,
    t: "r",
    clid: clientId,
    am: grant_type,
    jti: crypto.randomUUID().replace(/-/g, ""),
    creation_date: new Date(),
    hours_expire: expiresIn
  }, g.jwt, { expiresIn: `${expiresIn}h` });
  g.refreshTokens.push({ accountId: user.accountId, token: `eg1~${refreshToken}` });
  return refreshToken;
}

export default { createClient, createAccess, createRefresh };