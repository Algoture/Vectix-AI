import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Logo } from "./Icons";
import Link from "next/link";
import Signed from "./Signed";
import ModeToggle from "./Modes";

export default function Header() {
  return (
    <div className="relative">
      <div className="fixed top-5 z-20 flex w-full justify-center">
        <nav className="bg-background/50  w-fit  dark:border-gray-700 border border-border gap-5 backdrop-blur-xl p-2  flex items-center rounded-md">
          <ul className="flex gap-20 items-center cursor-pointer">
            <li>
              <Link href="/" className="flex items-center pl-1">
                <Logo className="fill-primary dark:fill-white size-6 rotate-180" />
                <p className="text-black dark:text-white font-semibold">
                  Vectix AI
                </p>
              </Link>
            </li>
            <li className="flex gap-4">
              <Link
                href={"/pricing"}
                className="text-neutral-800 dark:text-neutral-200">
                Pricing
              </Link>
              <Link
                href={"/support"}
                className="text-neutral-800 dark:text-neutral-200 -mr-2">
                Support
              </Link>
            </li>
          </ul>

          <div className="flex gap-2 items-center">
            <ModeToggle />
          </div>
        </nav>
      </div>

      <div className="fixed flex gap-2 top-6 right-5 z-20">
        <Signed />
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button variant="outline" className="px-3 py-1 text-sm">
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
}
