import app from "./src/utils/app";
import { log } from "./src/utils/log";
import routing from "./src/utils/routing";
import mongoose, * as Mongoose from "mongoose";

let database: Mongoose.Connection;


const globals = globalThis as any;


globals.config = await Bun.file("./config/config.json").json();


export const connect = () => {
mongoose.connect("mongodb://127.0.0.1/lunisbackend")
// mongob connection string
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));
  
  database = Mongoose.connection;
  database.once("open", async () => {
   log("Green", "INFO", "[DB] Connected");
  });
  database.on("error", () => {
log("Red", "INFO", "[DB] Disconnected.");
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};
routing();

Bun.serve({
    port: 5358,
    fetch: app.fetch
});
//log("Green", "INFO", "[DB] Connected");
log("Green", "INFO", "Backend is up");