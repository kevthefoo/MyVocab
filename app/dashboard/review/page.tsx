"use client";
import { useState } from "react";

import { useUser } from "@clerk/clerk-react";

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
    const { user } = useUser();
    const userID = user?.id;
    const [vocab, setVocab] = useState<VocabData | null>(null);
    const [error, setError] = useState("");
    const [start, setStart] = useState<boolean>(false);

    const getVocab = async () => {
        try {
            const response = await fetch(`/api/review?userID=${userID}`);

            if (!response.ok) {
                throw new Error("Error adding vocabulary");
            }

            if (response.status === 200) {
                console.log("Vocabulary added successfully");
            } else {
                throw new Error("Error adding vocabulary");
            }

            const result = await response.json();
            const vocabPool = new Map(Object.entries(result.result.pool));

            // Convert the Map to an object
            const vocabObject = Object.fromEntries(vocabPool.entries());

            // Convert the object to an array of its entries
            const vocabArray = Object.entries(vocabObject);

            // Generate a random index
            const randomIndex = Math.floor(Math.random() * vocabArray.length);

            // Select the entry at the random index
            const randomVocab = vocabArray[randomIndex];

            console.log(randomVocab);
            setStart(true);
            setVocab(randomVocab);
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
                <h1>{vocab ? vocab[0] : "No data founded"}</h1>
                {/* {vocab.meanings.map((meaning: Meaning, index: number) => (
                        <div key={index} className="mb-8">
                            <p>{meaning.speech_part}</p>
                            <h1>{meaning.definition}</h1>
                            <p>{meaning.example}</p>
                        </div>
                    ))} */}
                {error && <p className="text-red-500">{error}</p>}
            </div>

            <div
                className="border-2 border-black rounded-xl px-4 cursor-pointer"
                onClick={getVocab}
            >
                {start?"Next":"Start"}
            </div>
        </section>
    );
}
