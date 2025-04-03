import { getOnboardingStatus } from "@/actions/auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const { isOnboarded } = await getOnboardingStatus();
  if (!isOnboarded) redirect("/onboarding");
  return <div className="cen min-h-screen">DashboardPage</div>;
};

export default DashboardPage;
