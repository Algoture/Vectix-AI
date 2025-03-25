import { getOnboardingStatus } from "../../../../actions/user";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const { isOnboarded } = await getOnboardingStatus();
  if (!isOnboarded) redirect("/onboarding");
  return <div>DashboardPage</div>;
};

export default DashboardPage;
