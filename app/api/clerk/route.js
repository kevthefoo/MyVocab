

// const webhook = new Webhook(process.env.CLERK_SECRET_KEY);

export async function POST(req) {
    // Parse the request body
    const data = await req.json();

    // Verify the event
    try {
        // const event = webhook.verifyEvent(req.body, req.headers);
        if (data.type === "user.created") {
            // const { id, email_addresses, first_name, last_name } = data.data;

            return Response.json({ message: "Success" });
        } else {
            return Response.json({ message: "fuck off" });
        }
    } catch (error) {
        console.log(error);
        return Response.json({ message: "fuck offfff" });
    }
}
