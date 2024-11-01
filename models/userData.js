import mongoose from "mongoose";

const UserMetaDataSchema = new mongoose.Schema(
    {
        clerkId: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        firstName: { type: String },
        lastName: { type: String },
        createdAt: { type: Date, default: Date.now },
    },
    { collection: "UserMetaData" }
);

export default mongoose.models.UserMetaData || mongoose.model('UserMetaData', UserMetaDataSchema);
