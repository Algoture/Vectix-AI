import OnboardingForm from "./_components/OnboardingForm";
import { getAuthUser } from "@/actions/auth";
export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const { specialization, experience, skills, bio } = await getAuthUser();
  const userData = { specialization, experience, skills, bio };
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
