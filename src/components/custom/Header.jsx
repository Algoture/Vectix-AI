"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import Signed from "./Signed";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();
  return (
    <div className="relative">
      <div className="fixed top-5 z-20 flex w-full justify-center">
        <nav className="bg-background/30 shadow-md border border-neutral-700/30  w-fit  gap-2 md:gap-5 backdrop-blur-xl p-2 flex items-center rounded-md">
          <ul className="flex gap-10 items-center cursor-pointer">
            <li>
              <Link href="/" className="flex items-center pl-1">
                <p className="font-semibold">Vectix AI</p>
              </Link>
            </li>
            <li className="flex gap-2 md:gap-4">
              <Link
                href={"/pricing"}
                className={clsx(
                  pathname === "/pricing" ? "text-white " : "text-white/60"
                )}>
                Pricing
              </Link>
              <Link
                href={"/support"}
                className={clsx(
                  pathname === "/support" ? "text-white " : "text-white/60"
                )}>
                Support
              </Link>
              
            </li>
          </ul>
          <div className="">
            <div className="flex gap-2 md:gap-4">
              <Signed />
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
            <SignedOut>
              <SignInButton>
                <Button>Sign In </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </nav>
      </div>
    </div>
  );
}
