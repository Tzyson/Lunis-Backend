import app from "../../utils/app";
import { readdir } from "node:fs/promises";
import { createHash } from "crypto";

export default function () {
  app.get("/fortnite/api/cloudstorage/system", async (c) => {
    const cloudFiles = [];
    for (const file of await readdir("./src/routes/cloud/assets/storage")) {
      if (!file.toLowerCase().endsWith(".ini")) continue;
      const content = new Uint8Array(await Bun.file(`./src/routes/cloud/assets/storage/${file}`).arrayBuffer());
      const stats = await Bun.file(`./src/routes/cloud/assets/storage/${file}`).stat();
      cloudFiles.push({
        uniqueFilename: file,
        filename: file,
        hash: createHash("sha1").update(content).digest("hex"),
        hash256: createHash("sha256").update(content).digest("hex"),
        length: content.byteLength,
        contentType: "application/octet-stream",
        uploaded: stats.mtime,
        storageType: "S3",
        storageIds: {},
        doNotCache: true,
      });
    }
    return c.json(cloudFiles);
  });

  app.get("/fortnite/api/cloudstorage/system/:file", async (c) => {
    if (c.req.param("file") === "config")
      return c.json({});
    const filename = decodeURIComponent(c.req.url.split("/").pop() || "");
    if (filename.includes("..") || filename.includes("~")) return c.status(404);
    if (await Bun.file(`./src/routes/cloud/assets/storage/${filename}`).exists()) {
      return c.body(
        await Bun.file(`./src/routes/cloud/assets/storage/${filename}`).arrayBuffer(),
        200,
        { "Content-Type": "application/octet-stream" }
      );
    }
    return c.json({});
  });
}