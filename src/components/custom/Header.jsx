import Link from "next/link";
import { Logo } from "./Icons";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="fixed top-4 w-full cen">
      <nav className="bg-gray-200/80 flex gap-5 backdrop-blur-2xl rounded-lg w-fit p-2">
        <Link href="/" className="cen">
          <Logo className="size-7 fill-primary" />
          <p>Vectix AI</p>
        </Link>
        <SignedOut>
          <Button>Sign In</Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
}
