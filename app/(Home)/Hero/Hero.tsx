"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useUser, SignIn } from "@clerk/nextjs";
import { toast } from "sonner";

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
    const [ispopup, setIspopup] = useState(false);

    if (!isLoaded) {
        return (
            <div className="h-screen flex flex-col justify-center items-center">
                Loading...
            </div>
        );
    }

    // Close modal on overlay click
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            setIspopup(false);
        }
    };

    const handleSearch = async () => {
        if (!isSignedIn) {
            console.log("User is not signed in");
            setIspopup(true);
            return <SignIn />;
        }

        const modifiedQuery = query.trim().toLowerCase();

        if (/\s/.test(modifiedQuery)) {
            toast.error("Please enter a single word to search.");
            setQuery("");
            return;
        }

        if (!modifiedQuery) {
            toast.error("Please enter a vocabulary to search.");
            return;
        }

        setIsLoading(true);
        setQuery("");
        
        try {
            const response = await fetch("/api/chatgpt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ modifiedQuery }),
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
        <section className="border-4 border-red-400 h-screen flex flex-col justify-center items-center">
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
            <div
                className={
                    ispopup
                        ? `w-full h-screen fixed flex justify-center items-center bg-gray-600 bg-opacity-85 z-10`
                        : `hidden`
                }
                onClick={handleOverlayClick}
            >
                <SignIn routing="hash" />
            </div>
        </section>
    );
}
