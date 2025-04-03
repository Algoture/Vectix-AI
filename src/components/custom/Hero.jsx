import Link from "next/link";
import { Button } from "../ui/button";
import Aurora from "../ui/Aurora";

const Hero = () => {
  return (
    <section className="w-full relative pb-10 min-h-screen">
      <Aurora
        colorStops={["#00D8FF", "#7c3aed", "#00D8FF"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <div className="space-y-6 text-center z-50 pt-28 md:pt-36">
        <div className="space-y-4 mx-auto">
          <h1 className="gradient-title text-5xl md:text-7xl  text-transparent bg-clip-text">
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
