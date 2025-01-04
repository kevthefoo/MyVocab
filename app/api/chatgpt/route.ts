import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
    const { query } = await req.json();
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_SECRET_KEY,
    });

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: `What is the meaning of the word ${query}?`,
                },
            ],
        });

        const resultMessage = completion.choices[0].message.content;
        console.log(resultMessage);
        return NextResponse.json({ result: resultMessage }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "An error occurred while processing your request." },
            { status: 500 }
        );
    }
}
