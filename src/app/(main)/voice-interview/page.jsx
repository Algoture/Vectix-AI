import OnboardingForm from "../onboarding/_components/OnboardingForm";
import { getUserData } from "@/actions/user";

async function page() {
  
  const userData = await getUserData();
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
