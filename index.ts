import app from "./src/utils/app";
import { log } from "./src/utils/log";

const globals = globalThis as any;

Bun.serve({
    port: 5358,
    fetch: app.fetch
});

log("Green", "INFO", "Backend is up");