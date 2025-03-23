import Link from "next/link";
import { Logo } from "./Icons";

export default function Header() {
  return (
    <header className="fixed top-4 w-full cen">
      <nav className="bg-gray-200 rounded-lg w-fit p-2">
        <Link href="/" className="cen">
          <Logo className="size-7 fill-primary" />
          <p>Vectix AI</p>
        </Link>
      </nav>
    </header>
  );
}
