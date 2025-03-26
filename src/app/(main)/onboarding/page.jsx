import { getOnboardingStatus } from "../../../../actions/user";
import { redirect } from "next/navigation";
import OnboardingForm from "./_components/OnboardingForm";
import { industries } from "../../../../data/industries";

const onboardingPage = async () => {
  const { isOnboarded } = await getOnboardingStatus();
  if (isOnboarded) redirect("/dashboard");
  return (
    <div>
      <OnboardingForm industries={industries} />
    </div>
  );
};

export default onboardingPage;
