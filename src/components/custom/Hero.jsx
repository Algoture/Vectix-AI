import Link from "next/link";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="w-full gradientBg pt-28 md:pt-36 pb-10 min-h-screen">
      <div className="space-y-6 text-center">
        <div className="space-y-4 mx-auto">
          <h1 className="gradient-title text-5xl md:text-7xl dark:bg-gradient-to-b dark:from-gray-200 dark:via-gray-400 dark:to-gray-200 text-transparent bg-clip-text">
            Your Personal AI Coach
            <br />
            for Job Success
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Craft Winning Resumes, Nail Interviews, and Land Your Dream Job with
            AI
          </p>
        </div>

        <div>
          <Link href={"/onboarding"}>
            <Button className="z-30" size={"lg"}>
              Unlock Success
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
