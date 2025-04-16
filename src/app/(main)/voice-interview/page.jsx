import OnboardingForm from "../onboarding/_components/OnboardingForm";
import { getAuthUser } from "@/actions/auth";
async function page() {
  const { specialization, experience, skills, bio } = await getAuthUser();
  const userData = { specialization, experience, skills, bio };
  return (
    <div>
      <OnboardingForm
        route={"/voice-interview/interview"}
        isEditing={true}
        initialData={userData}
      />
    </div>
  );
}

export default page;
