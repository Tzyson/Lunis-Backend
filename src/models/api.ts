import mongoose from "mongoose";
const Schema = new mongoose.Schema({
    created: { type: Date, required: true },
    apiKey: { type: String, required: true, unique: true },
    access: { type: String, required: true, default: "user" },
}, {
    collection: "api"
});
export default mongoose.model('api', Schema);