"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import Link from "next/link";

export default function Navbar() {
    return (
        <header className="flex fixed border-4 border-black w-full justify-around h-16 items-center">
            <div>Logo</div>
            <nav>
                <ul className="flex gap-4">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="#about">About</Link>
                    </li>
                    <li>
                        <Link href="#price">Price</Link>
                    </li>
                    <li>
                        <Link href="#features">Features</Link>
                    </li>
                </ul>
            </nav>
            <div className=" flex justify-center items-center">
                <SignedOut>
                    <SignInButton mode="modal" />
                </SignedOut>
                <SignedIn>
                    <UserButton
                        userProfileMode="navigation"
                        userProfileUrl="/user-profile"
                    ></UserButton>
                </SignedIn>
            </div>
        </header>
    );
}
