export default async function UpdateTokens()
{
    const g = globalThis as any;
    await g.kv.set("tokens", JSON.stringify({
        accessTokens: g.accessTokens,
        refreshTokens: g.refreshTokens,
        clientTokens: g.clientTokens
    }, null, 2));
}