import handleAddVocab from "@/lib/addVocab";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await dbConnect("User");

    const data = await req.json();
    try {
        console.log(1);
        const result = await handleAddVocab(data);
        console.log(2);
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
