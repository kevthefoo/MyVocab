import { NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

export async function POST(req: Request) {
    const { query } = await req.json();
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_SECRET_KEY,
    });

    const vocabData = z.object({
        vocabulary: z.string(),
        meaning: z.string(),
        example: z.array(z.string()),
    });

    try {
        const completion = await openai.beta.chat.completions.parse({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "Now you are a English vocaulary dictionary, only answer the question about English vocaularies.",
                },
                {
                    role: "user",
                    content: `What is the meaning of the word ${query}?`,
                },
            ],
            response_format:zodResponseFormat(vocabData, "ResVocabData"),
        });

        const parsedVocabData = completion.choices[0].message.parsed;
        console.log(parsedVocabData)
        return NextResponse.json({ result: parsedVocabData }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "An error occurred while processing your request." },
            { status: 500 }
        );
    }
}
