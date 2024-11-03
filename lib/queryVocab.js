import Vocabulary from "@/models/vocabulary";

export default async function queryVocab(vocab) {
    try {
        const vocabulary = await Vocabulary.findOne({ vocabulary: vocab });
        if (!vocabulary) {
            return Response.json({ message: "Vocabulary not found!!!!!" });
        }
        console.log(vocabulary.vocabulary);
        console.log(vocabulary.meanings);
        return Response.json(vocabulary);
    } catch (error) {
        return Response.json({ message: "Error fetching vocabulary", error });
    }
}
