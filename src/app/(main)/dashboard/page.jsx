import { getAuthenticatedUser } from "@/actions/auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const { success } = await getAuthenticatedUser();
  if (!success) redirect("/onboarding");
  return <div className="cen min-h-screen">DashboardPage</div>;
};

export default DashboardPage;
