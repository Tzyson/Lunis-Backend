import mongoose from "mongoose";
import { log } from "./log";

const globals = globalThis as any;

export default async function connectToDb(uri: string): Promise <typeof mongoose> {
    try {
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        globals.mongoose = mongoose;
        return mongoose;
    }
    catch (err) {
        log("Red", "ERROR", `Failed to connect to mongodb: ${err}`);
        process.exit(1);
    }
}