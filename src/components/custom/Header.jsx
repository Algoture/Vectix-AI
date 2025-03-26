"use client"; // Ensures this runs as a Client Component
import { useState, useEffect } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Logo } from "./Icons";
import Link from "next/link";
import Signed from "./Signed";
import ModeToggle from "./Modes";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useUser(); // Gets the authenticated user (if signed in)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 w-full transition-all duration-300 z-50 ${
        isScrolled ? "h-12" : "h-24"
      }`}
    >
      <nav
        className={`bg-background/80 dark:bg-accent/80 flex gap-5 backdrop-blur-md rounded-lg w-fit p-2 mx-auto transition-all duration-300 ${
          isScrolled ? "scale-90" : "scale-110"
        }`}
      >
        <Link href="/" className="cen">
          <Logo className={`size-${isScrolled ? "6" : "9"} fill-primary`} />
          <p className={`${isScrolled ? "text-sm text-nowrap" : "text-base"}`}>Vectix AI</p>
        </Link>

        <Signed />
        
        <SignedOut>
          <SignInButton>
            <Button variant="outline" className={`${isScrolled ? "px-3 py-1 text-sm" : "px-4 py-2"}`}>
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: `${isScrolled ? "w-8 h-8" : "w-10 h-10"}`,
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
