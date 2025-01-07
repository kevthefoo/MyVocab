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
                        <Link href="/">Search</Link>
                    </li>
                    <li>
                        <Link href="/pricing">Pricing</Link>
                    </li>
                    <li>
                        <Link href="/dashboard">Database</Link>
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
                        userProfileUrl="/account"
                    ></UserButton>
                </SignedIn>
            </div>
        </header>
    );
}
