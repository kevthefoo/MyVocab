import mongoose from "mongoose";

export default async function dbConnect(database) {
    const MONGODB_URI = process.env.MONGODB_URI.replace("<database>", database);

    if (!MONGODB_URI) {
        throw new Error(
            "Please define the MONGODB_URI environment variable inside .env.local"
        );
    }

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await mongoose.connect(MONGODB_URI);
    } catch (error) {
        console.log(error.message);
        return Response.json({ message: "Connection is failed!" });
    }
}
