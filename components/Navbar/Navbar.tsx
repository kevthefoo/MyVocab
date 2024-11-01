import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import Link from "next/link";

export default function Navbar() {
    return (
        <header className="flex fixed border-2 border-black w-full justify-around h-10 items-center">
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
            <div>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </header>
    );
}
