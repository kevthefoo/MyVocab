import mongoose from "mongoose";

const UserDataSchema = new mongoose.Schema({
    user_name: { type: String, required: true, unique: true },
    word: { type: String, required: true, unique: true },
    definition: { type: String, required: true },
    example: { type: String },
    addedAt: { type: Date, default: Date.now },
});

export default mongoose.models.UserData ||
    mongoose.model("UserData", UserDataSchema);
