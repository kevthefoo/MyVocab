"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Navbar from "@/components/Navbar/Navbar";
import Hero from "./Hero/Hero";

export default function Home() {
    const { isSignedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isSignedIn) {
            router.push("/dashboard");
        }
    }, [isSignedIn, router]);

    return (
        <>
            <Navbar />
            <Hero />
        </>
    );
}
