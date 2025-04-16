import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { TickIcon } from "@/components/custom/Icons";
import { pricingPlans } from "@/data/pricingplans";
import SpotlightCard from "@/components/ui/spotlightcard";

const PricingTable = () => {
  return (
    <div className=" py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mt-2 text-3xl font-semibold tracking-tight  sm:text-4xl">
            Plans for Every Stage of Your Career
          </p>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Choose the plan that works best for your needs, with no hidden fees.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
          {pricingPlans.map((tier) => (
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(109, 40, 217, 0.5) " key={tier.id}>
            <Card
              
              className={`${
                tier.mostPopular ? "" : ""
              } flex flex-col`}>
              {tier.mostPopular && (
                <div className="absolute top-2 left-0 right-0 mx-auto w-32 rounded-full bg-primary px-3 py-1 text-center text-xs font-medium text-white">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{tier.name}</CardTitle>
                <div className="mt-2 flex items-baseline ">
                  <span className="text-4xl font-bold tracking-tight">
                    {tier.price}
                  </span>
                  {tier.price !== "Custom" && (
                    <span className="ml-1 text-sm font-semibold leading-6 ">
                      /month
                    </span>
                  )}
                </div>
                <CardDescription className="mt-2">
                  {tier.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="mt-2 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <TickIcon className="size-5 text-primary" />
                      <span className="ml-2 text-sm text-accent-foreground/70">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={tier.mostPopular ? "default" : "outline"}>
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
             </SpotlightCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
