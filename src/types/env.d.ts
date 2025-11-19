/// <reference types="bun-types" />
import type { Server } from "bun";
declare global {
  interface Env {
    Variables: {
      server: Server;
    };
  }
}
export {};