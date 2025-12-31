import app from "../../utils/app";
import { createHash } from "crypto";
import { validateToken } from "../../utils/tokenvalidation";

export default function () {
    app.get("/fortnite/api/cloudstorage/user/*/:file", validateToken, async (c: any) => {
        const parts = c.req.url.split("/");
        const userId = c.get("user").accountId;
        const fileName = decodeURIComponent(parts.at(-1) || "").toLowerCase();
        if (fileName !== "clientsettings.sav") return c.status(200);
        const file = Bun.file(`./src/routes/cloud/assets/settings/ClientSettings-${userId}.Sav`);
        if (await file.exists()) return c.body(await file.arrayBuffer(), 200, { "Content-Type": "application/octet-stream" });
        return c.status(200);
    });

    app.get("/fortnite/api/cloudstorage/user/:accountId", validateToken, async (c) => {
        const userId = c.req.param("accountId");
        const file = Bun.file(`./src/routes/cloud/assets/settings/ClientSettings-${userId}.Sav`);
        if (!(await file.exists())) return c.json([]);
        const content = new Uint8Array(await file.arrayBuffer());
        const stats = await file.stat();
        return c.json([{
            uniqueFilename: "ClientSettings.Sav",
            filename: "ClientSettings.Sav",
            hash: createHash("sha1").update(content).digest("hex"),
            hash256: createHash("sha256").update(content).digest("hex"),
            length: content.byteLength,
            contentType: "application/octet-stream",
            uploaded: stats.mtime,
            storageType: "S3",
            storageIds: {},
            accountId: userId,
            doNotCache: false
        }]);
    });

    app.put("/fortnite/api/cloudstorage/user/*/:file", validateToken, async (c: any) => {
        const parts = c.req.url.split("/");
        const userId = c.get("user").accountId;
        const fileName = decodeURIComponent(parts.at(-1) || "").toLowerCase();
        if (fileName !== "clientsettings.sav")
            return c.json({ error: "file not found" }, { status: 403 });
        const raw = Buffer.from(await c.req.arrayBuffer()); 
        if (raw.byteLength >= 400_000)
            return c.json({ error: "File size must be less than 400kb." }, { status: 403 });
        await Bun.write(`./src/routes/cloud/assets/settings/ClientSettings-${userId}.Sav`, raw);
        return c.json({});
    });
}