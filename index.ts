import app from "./src/utils/app";
import { log } from "./src/utils/log";
import routing from "./src/utils/routing";

const globals = globalThis as any;

globals.config = JSON.parse(await Bun.file("./config/config.json").text());

routing();

Bun.serve({
    port: 5358,
    fetch: app.fetch
});

log("Green", "INFO", "Backend is up");