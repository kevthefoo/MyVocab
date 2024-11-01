import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

async function dbConnect() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await mongoose.connect(MONGODB_URI);
    } catch (error) {
        console.log(error);
        return Response.json({ message: "Connection is failed!" });
    }
}

export default dbConnect;
