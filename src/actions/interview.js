"use server";

import { Assessment } from "@/models/Models";
import { getAuthUser } from "./auth";
import { generateQuizPrompt, improvementPrompts, voiceInterviewPrompt } from "@/lib/prompts";
import { model } from "./genAI";
import { redirect } from "next/navigation";

export async function generateQuiz() {
    const { success, specialization, experience, skills } = await getAuthUser();
    if (!success) return null;
    if (!specialization) redirect("/onboarding");
    const prompt = generateQuizPrompt(skills, experience, specialization);
    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text().replace(/```(?:json)?\n?/g, "").trim();
        let quiz;
        try {
            quiz = JSON.parse(text);
        } catch {
            return { error: "Invalid quiz format received." };
        }
        return quiz.questions;
    } catch (err) {
        console.error("Error generating quiz:", err);
        return { error: "Server error: " + err.message };
    }
}

export async function saveQuizResult(questions, answers, score) {
    const { success, specialization, id } = await getAuthUser();
    if (!success) return null;
    if (!specialization) redirect("/onboarding");
    const questionResults = questions.map((q, index) => ({
        question: q.question,
        answer: q.correctAnswer,
        userAnswer: answers[index],
        isCorrect: q.correctAnswer === answers[index],
        explanation: q.explanation,
    }));
    const wrongAnswers = questionResults.filter((q) => !q.isCorrect);
    let improvementTip = null;
    const quesCount = process.env.NEXT_PUBLIC_NUMBER_OF_QUESTIONS;
    const flooredVal = Math.floor(quesCount / 3);
    if (wrongAnswers.length > 0 && wrongAnswers.length <= flooredVal) {
        const wrongQuestionsText = wrongAnswers.map((q) =>
            `Question: "${q.question}"\nCorrect: "${q.answer}"\nYour Answer: "${q.userAnswer}"`
        ).join("\n\n");

        const prompt = improvementPrompts(specialization, wrongQuestionsText);
        try {
            const tipResult = await model.generateContent(prompt);
            improvementTip = tipResult.response.text().trim();
        } catch (err) {
            console.error("Error generating tip:", err);
        }
    }
    try {
        await Assessment.create({
            userId: id,
            quizScore: score,
            questions: questionResults,
            category: "Technical",
            improvementTip,
        });
    } catch (err) {
        console.error("Error saving quiz result:", err);
        return { error: "Failed to save result: " + err.message };
    }
}

export async function getAssessments(page = 0, limit = 10) {
    const { success, id, specialization } = await getAuthUser();
    try {
        if (!success) return null;
        if (!specialization) redirect("/onboarding");
        const assessments = await Assessment.find({ userId: id })
            .sort({ createdAt: "asc" })
            .limit(limit)
            .skip(page * limit);
        return assessments.map(formatAssessment);
    } catch (error) {
        console.error("Error fetching assessments:", error);
        return { error: `Failed to fetch assessments: ${error.message || error}` };
    }
}

function formatAssessment(assessment) {
    return {
        quizScore: assessment.quizScore,
        questions: assessment.questions,
        category: assessment.category,
        improvementTip: assessment.improvementTip,
        createdAt: assessment.createdAt.toISOString(),
        updatedAt: assessment.updatedAt.toISOString(),
    };
}

export async function voiceInterviewQue() {
    const { success, experience, skills, specialization } = await getAuthUser();
    if (!success) return null;
    const count = process.env.NEXT_PUBLIC_NUMBER_OF_VOICE_QUESTIONS;
    const voicePrompt = voiceInterviewPrompt(skills, count, specialization, experience, "mixed")
    try {
        const result = await model.generateContent(voicePrompt);
        const response = result.response.text();
        const questions = JSON.parse(response);
        return questions;
    } catch (err) {
        console.error("Error generating voice interview questions", err);
        return { error: "Failed to generate voice interview questions" + err.message };
    }

}