import dbConnect from "@/lib/dbConnect";
import reviewVocab from "@/lib/reviewVocab";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    await dbConnect("User");
    const url = new URL(req.url);
    const userID = url.searchParams.get("userID");
    

    try {
        const result = await reviewVocab(userID);
        return NextResponse.json({ result: result }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json(
                { error: "An unknown error occurred" },
                { status: 520 }
            );
        }
    }
}
