import UserVocab from "@/models/userVocab";

export default async function handleAddVocab(data) {
    const { userID, vocab } = data;

    try {
        // Check if a user with the same clerkId already exists
        let user = await UserVocab.findOne({ clerkId: userID });

        if (user) {
            user.pool.set(vocab, { addAt: new Date().toISOString() });
            user.markModified('pool')
            await user.save();
            console.log("Vocab addedddddddd!");
            console.log(user.pool);
        } else {
            // Create a new user
            user = await UserVocab.create({
                clerkId: userID,
                lake: {},
                pool: { [vocab]: { addAt: new Date().toISOString() } },
            });
            console.log("Vocab added!");
        }
    } catch (error) {
        console.error(error.message);
        throw new Error("Failed to add the voacab");
    }
}
