import Features from "@/components/custom/Features";
import Hero from "@/components/custom/Hero";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex-col cen">
      <div className="grid-background min-h-screen"></div>
      <Hero />
      <Features />
    </div>
  );
}
