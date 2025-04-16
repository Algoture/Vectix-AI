"use client";
import StatsCards from "./_components/stats-cards";
import PerformanceChart from "./_components/performace-chart";
import QuizList from "./_components/quiz-list";
import { getAssessments } from "@/actions/interview";
import { useEffect, useState } from "react";

export default function InterviewPrepPage() {
  const [assessments, setAssessments] = useState([]);
  useEffect(() => {
    async function getAssess() {
      try {
        const assess = await getAssessments();
        setAssessments(assess);
      } catch (err) {
        console.error("Error Fetching Assessments");
      }
    }
    getAssess();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title text-transparent bg-clip-text">
          Interview Preparation
        </h1>
      </div>
      <div className="space-y-6">
        <StatsCards assessments={assessments} />
        <QuizList assessments={assessments} />
        <PerformanceChart assessments={assessments} />
      </div>
    </div>
  );
}
