"use client";
import { useState } from "react";
type Meaning = {
    speech_part: string;
    definition: string;
    example: string;
};

type VocabData = {
    vocabulary: string;
    meanings: Meaning[];
    tags: string[];
};

export default function Review() {
    const [vocab, setVocab] = useState<VocabData | null>(null);
    const [error, setError] = useState("");

    const getVocab = async () => {
        try {
            const response = await fetch("/api/getvocab");
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
            const vocabData = data.result as VocabData;
            setVocab(vocabData);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };
    return (
        <section className="flex flex-col items-center border-2 border-red-500 w-full pt-10">
            <h1 className="mb-10">Review</h1>
            <div className="rounded-xl border-2 border-black w-1/5 h-1/5 mb-8">
                <h1>{vocab?vocab.vocabulary:'No data founded'}</h1>
                {error && <p className="text-red-500">{error}</p>}
            </div>
            <div
                className="border-2 border-black rounded-xl px-4 cursor-pointer"
                onClick={getVocab}
            >
                start
            </div>
        </section>
    );
}
