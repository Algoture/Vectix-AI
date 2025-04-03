import StatsCards from "./_components/stats-cards";
import PerformanceChart from "./_components/performace-chart";
import QuizList from "./_components/quiz-list";
import { getAssessments } from "@/actions/interview";

export default async function InterviewPrepPage() {
  const assessments = await getAssessments();
  if (assessments.error) {
    return <div>Error: {assessments.error}</div>;
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title text-transparent bg-clip-text">
          Interview Preparation
        </h1>
      </div>
      <div className="space-y-6">
        <StatsCards assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  );
}
