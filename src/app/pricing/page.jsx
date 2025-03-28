"use client";
import { useState } from "react";
import { pricingPlans } from "../../../data/pricingplans";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { TickIcon } from "@/components/custom/Icons";

const PricingTable = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="flex flex-col mt-20 items-center p-4 bg-gray-50 dark:bg-background">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        Our Pricing
      </h2>
      <p className="text-muted-foreground mb-2  dark:text-gray-300">
        Choose a plan that suits your needs. Pay monthly or annually and save!
      </p>

      <div className="flex items-center mb-4">
        <span className="text-muted-foreground mr-2  dark:text-gray-300">
          Monthly
        </span>
        <Switch
          checked={isAnnual}
          onCheckedChange={() => setIsAnnual(!isAnnual)}
          className="peer cursor-pointer"
        />
        <span className="text-muted-foreground ml-2  dark:text-gray-300">
          Annual
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-screen-xl">
        {pricingPlans.map((plan, idx) => (
          <Card
            key={idx}
            className={`border cursor-pointer rounded-lg shadow-sm p-3 bg-white dark:bg-background hover:shadow-xl transition-shadow ${
              plan.name === "Pro"
                ? "border-2 border-primary "
                : "border-gray-200 dark:border-neutral-700 "
            }`}>
            <CardHeader className={"-mb-2"}>
              <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
                {plan.name}
                {plan.name === "Pro" && (
                  <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full ml-2">
                    Popular
                  </span>
                )}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-5xl font-bold dark:text-white/90 text-black/80 mb-3">
                ${isAnnual ? plan.annual : plan.monthly}
                <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                  /{isAnnual ? "yr" : "mo"}
                </span>
              </div>
              <ul className="text-muted-foreground my-4 dark:text-gray-300">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-1">
                    <TickIcon className="size-5 text-primary dark:text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button className="w-full text-white ">Choose {plan.name}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingTable;
