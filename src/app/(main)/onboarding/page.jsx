import { getAuthenticatedUser } from "@/actions/auth";
import OnboardingForm from "./_components/OnboardingForm";
import { getUserData, seedUser } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const { success } = await getAuthenticatedUser();
  if (success) {
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
      <OnboardingForm
        isEditing={false}
        route={"/dashboard"}
        initialData={userData}
      />
    </div>
  );
}
