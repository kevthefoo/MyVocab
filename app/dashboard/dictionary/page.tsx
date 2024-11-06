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
    meanings: {
        speech_part: string;
        definition: string;
        example: string;
    }[];
    tags: string[];
};

export default function Dictionary() {
    const { user } = useUser();
    const userID = user?.id;
    const [vocab, setVocab] = useState("");
    const [result, setResult] = useState<VocabData | null>(null);
    const [error, setError] = useState("");
    const [userVocab, setUserVocab] = useState<VocabData[]>([]);

    console.log(userID);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");
        setResult(null);

        const modifiedVocab = vocab.toLowerCase();
        try {
            const response = await fetch(`/api/query?vocab=${modifiedVocab}`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
            const vocabData = data.result as VocabData;
            setResult(vocabData);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    const handleAddVocab = async () => {
        if (!result) return;

        try {
            const response = await fetch("/api/user/vocab", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(result),
            });

            if (!response.ok) {
                throw new Error("Error adding vocabulary");
            }

            const newVocab = await response.json();
            setUserVocab([...userVocab, newVocab]);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    return (
        <section className="border-2 border-red-500 h-screen flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={vocab}
                    onChange={(e) => setVocab(e.target.value)}
                    placeholder="Enter vocabulary"
                    className="border p-2 mr-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2">
                    Search
                </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            {result && (
                <div className="mt-4">
                    <h1 className="mb-8">{result.vocabulary}</h1>
                    {result.meanings.map((meaning: Meaning, index: number) => (
                        <div key={index} className="mb-8">
                            <p>{meaning.speech_part}</p>
                            <h1>{meaning.definition}</h1>
                            <p>{meaning.example}</p>
                        </div>
                    ))}
                    <button
                        onClick={handleAddVocab}
                        className="bg-green-500 text-white p-2 mt-4"
                    >
                        Add
                    </button>
                </div>
            )}
        </section>
    );
}
