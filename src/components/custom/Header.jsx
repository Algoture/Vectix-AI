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
        <nav className="bg-background/50  w-fit  border-gray-700 border gap-5 backdrop-blur-xl p-3  flex items-center rounded-md">
          <ul className="flex gap-10 items-center cursor-pointer">
            <li>
              <Link href="/" className="flex items-center pl-1">
                <p className=" font-semibold">Vectix AI</p>
              </Link>
            </li>
            <li className="flex gap-4">
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
