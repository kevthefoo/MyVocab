import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient();

        const data = await req.json();

        const clerkUserId = data.clerkUserId;
        const vocabulary = data.vocabulary;
        const meaning = data.meaning;
        const example = data.example.join("\n");

        const { error } = await supabase.from(clerkUserId).insert({
            vocabulary: vocabulary,
            meaning: meaning,
            example: example,
        });

        console.log(error);

        return NextResponse.json({ message: "Success" });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Error with adding vocabulary" });
    }
}
