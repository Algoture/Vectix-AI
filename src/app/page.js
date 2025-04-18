import Features from "@/components/custom/Features";
import Hero from "@/components/custom/Hero";
import HowItWorks from "@/components/custom/HowItWorks";
import Statistics from "@/components/custom/Statistics";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex-col cen">
      <Hero />
      <Features />
      <Statistics />
      <HowItWorks />
    </div>
  );
}
