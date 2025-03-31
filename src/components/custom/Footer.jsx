import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="mx-auto p-5 ">
        <div className="my-auto ">
          <div className="flex flex-col justify-center md:flex-row md:items-center md:space-x-6">
            <p className="text-center text-xs leading-5 text-muted-foreground">
              &copy; {new Date().getFullYear()} Vectix AI. All rights reserved.
            </p>
            <div className="mt-4 flex justify-center space-x-6 md:mt-0">
              <Link
                href="#"
                className="text-xs leading-5 text-muted-foreground">
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-xs leading-5 text-muted-foreground">
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-xs leading-5 text-muted-foreground">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
