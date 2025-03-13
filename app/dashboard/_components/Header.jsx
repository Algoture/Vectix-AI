"use client";
import { Logo } from "@/app/Icons";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Nav = () => {
  return (
    <div className="mt-5 z-40 flex justify-center gap-1 w-full ">
      <Link href="/" className="bg-primary shadow-sh2 rounded-full p-1.5">
        <Logo />
      </Link>
      <nav className="flex px-4 py-2 gap-5 rounded-full items-center bg-white shadow-md border border-gray-200">
        <Link href="/" className="flex items-center">
          Mocker AI
        </Link>
        <Link href="/pricing" className="flex items-center">
          Pricing
        </Link>
        <UserButton />
      </nav>
    </div>
  );
};

export default Nav;
