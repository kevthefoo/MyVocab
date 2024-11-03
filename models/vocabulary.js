import mongoose from "mongoose";

const VocabularySchema = new mongoose.Schema(
    {
        vocabulary: {
            type: String,
            required: true,
        },
        meanings: [
            {
                speech_part: String,
                definition: String,
                example: String,
            },
        ],
        tags: [String],
    },
    { collection: "Vocabulary" }
);

export default mongoose.models.Vocabulary || mongoose.model("Vocabulary", VocabularySchema);
