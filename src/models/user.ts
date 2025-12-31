import mongoose from "mongoose";
const Schema = new mongoose.Schema({
  discordId: { type: String, required: true, unique: true },
  accountId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  banned: { type: Boolean, default: false },
  server: { type: Boolean, default: false }
}, {
  collection: "users"
});
export default mongoose.model('users', Schema);