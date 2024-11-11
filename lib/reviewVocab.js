import UserVocab from "@/models/userVocab";

export default async function reviewVocab(userID) {
    try {
        const allVocabData = await UserVocab.findOne({ clerkId: userID });
        if (!allVocabData) {
            throw new Error("Data not found");
        }
        return allVocabData;
    } catch (error) {
        throw new Error(`Fetching Data Error: ${error.message}`);
    }
}
