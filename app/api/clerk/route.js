import dbConnect from "@/lib/dbConnect";
import handleUserCreation from "@/lib/createUser"

// const webhook = new Webhook(process.env.CLERK_API_SECRET);



export async function POST(req) {
    // Parse the request body
    const data = await req.json();

    // Verify the event
    try {
        // const event = webhook.verifyEvent(req.body, req.headers);
        if (data.type === "user.created") {
            // const { id, email_addresses, first_name, last_name } = data.data;

            // Connect to MongoDB
            await dbConnect();

            // Create a new user in MongoDB
            handleUserCreation(data)

            return Response.json({ message: "Success" });
        } else {
            return Response.json({ message: "fuck off" });
        }
    } catch (error) {
        console.log(error);
        return Response.json({ message: "fuck offfff" });
    }
}
