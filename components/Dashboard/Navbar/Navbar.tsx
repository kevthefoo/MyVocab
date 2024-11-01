import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
export default function Navbar() {
    return (
        <nav className="border-2 border-black fixed h-screen flex flex-col items-start justify-between px-8 py-4">
            <div className="flex flex-col justify-around border-2 border-red-400 gap-10">
                <h1 className="mb-10">Vocab Lake</h1>
                <ul className="flex flex-col gap-4">
                    <li>
                        <Link href="">Dictionary</Link>
                    </li>
                    <li>
                        <Link href="">Vocab Lake</Link>
                    </li>
                    <li>
                        <Link href="">Subscription</Link>
                    </li>
                    <li>
                        <Link href="">Dictionary</Link>
                    </li>
                </ul>
            </div>
            <div>
                <div className="flex flex-col gap-2 mb-4">
                    <Link href="">Help</Link>
                    <Link href="">Update</Link>
                    <Link href="">Dark Mode</Link>
                </div>
                User Account
                <div>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
}
