import mongoose from "mongoose";
const Schema = new mongoose.Schema({
    accountId: { type: String, required: true, unique: true },
    registered: { type: Date, required: true },
    profiles: { type: Object, required: true }
}, {
    collection: "profiles"
});
export default mongoose.model('profiles', Schema);