"use client"
import { Card, CardContent } from "@/components/ui/card";
import { features } from "@/data/features";
import SpotlightCard from "../ui/spotlightcard";

const Features = () => {
  return (
    <section className="w-full bg-background py-12 md:py-24 lg:py-28 ">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
          Powerful Features for Your Career Growth
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {features.slice(0, 4).map((feature) => (
            <SpotlightCard className="custom-spotlight-card h-fit" spotlightColor="rgba(109, 40, 217, 0.5) " key={feature.title}>
            <Card
              
              className=" hover:border-primary transition-colors duration-300 h-fit rounded-3xl">
              <CardContent className=" text-center flex flex-col items-center">
                <div className="flex flex-col items-center justify-center">
                  {feature.icon}
                  <h3 className="text-xl font-bold ">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
