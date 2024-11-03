"use client";

import { useState } from "react";

export default function Dictionary() {
    const [vocab, setVocab] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");
        setResult(null);

        try {
            const response = await fetch(`/api/query?vocab=${vocab}`);
            if (!response.ok) {
                throw new Error("Vocabulary not found");
            }
            const data = await response.json();
            console.log(typeof(data))
            setResult(data);
        } catch (error) {
            setError("Cannot find the vocabulary");
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
                    <h2 className="text-xl font-bold">asdas:</h2>
                    {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
                    <h1>{result.vocabulary}</h1>
                    <h1>{result.meanings[0].definition}</h1>
                </div>
            )}
        </section>
    );
}
