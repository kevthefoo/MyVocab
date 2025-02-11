import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// const webhook = new Webhook(process.env.CLERK_SECRET_KEY);

export async function POST(req: NextRequest) {
    const supabase = await createClient();

    // Parse the request body
    const data = await req.json();
    // Verify the event
    try {
        // const event = webhook.verifyEvent(req.body, req.headers);
        if (data.type === "user.created") {
            const user_id = data.data.id;
            const email_address = data.data.email_addresses[0].email_address;

            const { error } = await supabase
                .from("clients")
                .insert({ client_user_id: user_id, email: email_address });

            // Create a new table for the user
            const q = await supabase.rpc("user_vocab_table", {
                user_id,
            });

            console.log(q);

            // if (createTableError) {
            //     console.error("Error creating user table:", createTableError);
            //     return NextResponse.json({ message: "Error creating user table" }, { status: 500 });
            // }

            console.log(error);
            console.log("User create");
            return NextResponse.json({ message: "Success" });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "error with handling webhook" });
    }
}
