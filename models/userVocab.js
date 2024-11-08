import mongoose from "mongoose";

const vocabSchema = new mongoose.Schema(
    {
        addAt: {
            type: Date,
            default: Date.now,
            required: true,
        },
    },
    { _id: false }
);

const UserVocabSchema = new mongoose.Schema(
    {
        clerkId: {
            type: String,
            required: true,
        },
        lake: {
            type: Map,
            of: vocabSchema, // Allow dynamic keys with vocabSchema as the value type
            default: {},
        },
        pool: {
            type: Map,
            of: vocabSchema, // Allow dynamic keys with vocabSchema as the value type
            default: {},
        },
    },
    { collection: "UserVocab" }
);

export default mongoose.models.UserVocab ||
    mongoose.model("UserVocab", UserVocabSchema);
