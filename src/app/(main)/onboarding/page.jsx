import { getUserData } from "@/actions/user";
import OnboardingForm from "./_components/OnboardingForm";
import { getAuthenticatedUser } from "@/actions/auth";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const userData = await getUserData();
  const { user } = await getAuthenticatedUser();
  if (user.specialization) {
    redirect("/dashboard");
  }
  return (
    <div className="-mt-10">
      <OnboardingForm
        isEditing={false}
        route="/dashboard"
        initialData={userData}
      />
    </div>
  );
}
