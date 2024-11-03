import Vocabulary from "@/models/vocabulary";

export default async function queryVocab(vocab) {
    try {
        const vocabulary = await Vocabulary.findOne({ vocabulary: vocab });
        if (!vocabulary) {
            return Response.json({ message: "Vocabulary not found!!!!!" });
        }
        
        return vocabulary
    } catch (error) {
        return Response.json({ message: "Error fetching vocabulary", error });
    }
}
