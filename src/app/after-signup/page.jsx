"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { seedUser } from "@/actions/user";
import Loader from "@/components/custom/Loader";

export default function AfterSignUpPage() {
  const router = useRouter();

  useEffect(() => {
    async function seed() {
      await seedUser();
      router.push("/");
    }
    seed();
  }, []);

  return (
    <div className="w-full min-h-screen cen flex-col">
      <Loader size={100} />
      Setting up your account
    </div>
  );
}
