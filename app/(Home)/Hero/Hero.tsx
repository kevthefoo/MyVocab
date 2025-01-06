"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useUser, SignIn } from "@clerk/nextjs";

type Result = {
    vocabulary: string;
    meaning: string;
    example: string[];
};

export default function Hero() {
    const { isSignedIn, isLoaded } = useUser();
    const [query, setQuery] = useState("");
    const [result, setResult] = useState<Result | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    const handleSearch = async () => {
        if (!isSignedIn) {
            console.log("User is not signed in");
            return <SignIn />;
        }

        setIsLoading(true);
        try {
            const response = await fetch("/api/chatgpt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            });
            const data = await response.json();
            const result: Result = data.result;
            setResult(result);
        } catch (error) {
            console.error("Error:", error);
            // setResult("An error occurred while processing your request.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="border-4 border-red-400 h-screen pt-10 flex flex-col justify-center items-center">
            {result && (
                <div className="mb-8 p-4 bg-white rounded shadow max-w-md w-full">
                    <h2 className="text-lg font-semibold mb-2">
                        {result.vocabulary}
                    </h2>

                    <p className="mb-2">{result.meaning}</p>
                    <ul className="flex flex-col gap-2 p-4">
                        {result.example.map((ex: string, index: number) => (
                            <li key={index} className="list-disc">
                                <p>{ex}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="w-36 space-y-4 ">
                <SignIn routing="hash" />
                <Input
                    type="text"
                    placeholder="Enter a vocabulary"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full"
                />
                <Button
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="w-full"
                >
                    {isLoading ? "Searching..." : "Search"}
                </Button>
            </div>
        </section>
    );
}
