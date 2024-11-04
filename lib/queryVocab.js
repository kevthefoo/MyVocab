import Vocabulary from "@/models/vocabulary";

export default async function queryVocab(vocab) {
    try {
        const vocabulary = await Vocabulary.findOne({ vocabulary: vocab });
        if (!vocabulary) {
            throw new Error("Vocabulary not found");
        }
        return vocabulary;
    } catch (error) {
        throw new Error(`Fetching Data Error: ${error.message}`);
    }
}
