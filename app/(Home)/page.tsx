"use client";

import { useUser } from "@clerk/nextjs";


import Hero from "./Hero/Hero";

export default function Home() {
    const { isLoaded } = useUser();
 
    if (!isLoaded) {
        return <div>Loading...</div>;
      }

    return (
        <>
           
            <Hero />
        </>
    );
}
