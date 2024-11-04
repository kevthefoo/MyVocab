import dbConnect from "@/lib/dbConnect";
import queryVocab from "@/lib/queryVocab";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    await dbConnect("Dictionary");

    const url = new URL(req.url);
    const vocab = url.searchParams.get("vocab");

    if (!vocab) {
        return NextResponse.json(
            { error: "Missing vocab query parameter" },
            { status: 300 }
        );
    }

    try {
        const result = await queryVocab(vocab);
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
