"use client";

import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const { isSignedIn, isLoaded } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isSignedIn || !isLoaded) {
            router.push("/");
        }
    }, [isSignedIn, router, isLoaded]);

    if (!isLoaded) {
        // Handle loading state however you like
        return null;
    }

    if (!isSignedIn) {
        return null; // Return null while redirecting
    }

    return <div className="">adasd</div>;
}
