// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
import OnboardingForm from "./_components/OnboardingForm";
import { getUserData, seedUser } from "@/actions/userActions";
import { industries } from "@/data/industries";
import { auth } from "@clerk/nextjs/server";
export default async function OnboardingPage() {
  const { userId } = await auth();
  if (userId) {
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
