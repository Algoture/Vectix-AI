import Link from "next/link";
import { Logo } from "./Icons";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import {
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenBox,
  StarsIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  return (
    <header className="fixed top-4 w-full cen">
      <nav className="bg-background/80 flex gap-5 backdrop-blur-md rounded-lg w-fit p-2">
        <Link href="/" className="cen">
          <Logo className="size-7 fill-primary" />
          <p>Vectix AI</p>
        </Link>
        <SignedIn>
          <Link href={""}>
            <Button>
              <LayoutDashboard className="size-4" />
              <span className="hidden md:block">Insights</span>
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer cen gap-1 h-9 px-4 py-2 has-[>svg]:px-3 bg-primary text-white rounded-md">
              <StarsIcon className="size-4" />
              <span className="hidden md:block">Tools</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/resume" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Resume Builder
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/cover-letter" className="flex items-center gap-2">
                  <PenBox className="h-4 w-4" />
                  Cover Letter
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/interview" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Interview Prep
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SignedIn>
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
      </nav>
    </header>
  );
}
