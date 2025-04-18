import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { FileText, GraduationCap, StarsIcon, BotIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Signed = () => {
  return (
    <SignedIn>
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
            <Link href="/interview" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Interview Prep
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/voice-interview" className="flex items-center gap-2">
              <BotIcon className="h-4 w-4" />
              AI Voice Interview
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SignedIn>
  );
};

export default Signed;
