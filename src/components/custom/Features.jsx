import { Card, CardContent } from "@/components/ui/card";
import { features } from "../../../data/features";
const Features = () => {
  return (
    <section className="w-full bg-background py-12 md:py-24 lg:py-28 ">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
          Powerful Features for Your Career Growth
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {features.slice(0,4).map((feature) => (
            <Card
              key={feature.title}
              className="border-2 hover:border-primary transition-colors duration-300">
              <CardContent className=" text-center flex flex-col items-center">
                <div className="flex flex-col items-center justify-center">
                  {feature.icon}
                  <h3 className="text-xl font-bold ">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
