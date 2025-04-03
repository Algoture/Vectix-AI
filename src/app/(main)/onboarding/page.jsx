import { getOnboardingStatus } from "@/actions/auth";
import OnboardingForm from "./_components/OnboardingForm";
import { getUserData, seedUser } from "@/actions/user";
import { industries } from "@/data/industries";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const { isOnboarded } = await getOnboardingStatus();
  if (isOnboarded) {
    redirect("/dashboard");
  }

  const seededResult = await seedUser();
  if (!seededResult) {
    return (
      <div>
        Error initializing user profile. Please try logging out and back in.
      </div>
    );
  }
  const userData = await getUserData();
  return (
    <div className="-mt-10">
      <OnboardingForm industries={industries} initialData={userData} />
    </div>
  );
}
