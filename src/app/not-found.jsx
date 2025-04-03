import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-grow items-center justify-center ">
      <div className="rounded-lg border-1 bg-white p-8 text-center shadow-md">
        <h1 className="mb-4 text-4xl text-gray-800 font-bold">404</h1>
        <p className="text-muted-foreground">
          Oops! The page you are looking for could not be found.
        </p>
        <Link href="/">
          <Button className="mt-4">Go back to home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
