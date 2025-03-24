import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Logo } from "./Icons";
import Link from "next/link";
import Signed from "./Signed";
import ModeToggle from "./Modes";

export default function Header() {
  return (
    <header className="fixed top-4 w-full cen">
      <nav className="bg-background/80 dark:bg-accent/80 flex gap-5 backdrop-blur-md rounded-lg w-fit p-2">
        <Link href="/" className="cen">
          <Logo className="size-7 fill-primary" />
          <p>Vectix AI</p>
        </Link>
        <Signed />
        <SignedOut>
          <SignInButton>
            <Button variant="outline">Sign In</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
                userButtonPopoverCard: "shadow-xl",
                userPreviewMainIdentifier: "font-semibold",
              },
            }}
            afterSignOutUrl="/"
          />
        </SignedIn>
        <ModeToggle />
      </nav>
    </header>
  );
}
