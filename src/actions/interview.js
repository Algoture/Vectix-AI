"use server";
import { Assessment } from "@/models/Models";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateQuizPrompt, improvementPrompts } from "../lib/prompts";
import { getAuthenticatedUser } from "./auth";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateQuiz() {
    const { success, error, user } = await getAuthenticatedUser();
    if (!success) {
        return { error };
    }
    const prompt = generateQuizPrompt(user);
    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text().replace(/```(?:json)?\n?/g, "").trim();
        const quiz = JSON.parse(text);
        return quiz.questions;
    } catch (err) {
        console.error("Error generating quiz:", err);
        return { error: "Server error: " + err.message };
    }
}

export async function saveQuizResult(questions, answers, score) {
    const { success, error, user } = await getAuthenticatedUser();
    if (!success) {
        return { error };
    }
    const questionResults = questions.map((q, index) => ({
        question: q.question,
        answer: q.correctAnswer,
        userAnswer: answers[index],
        isCorrect: q.correctAnswer === answers[index],
        explanation: q.explanation,
    }));
    const wrongAnswers = questionResults.filter((q) => !q.isCorrect);
    let improvementTip = null;

    if (wrongAnswers.length > 0) {
        const wrongQuestionsText = wrongAnswers
            .map(q => `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`)
            .join("\n\n");

        const improvementPrompt = improvementPrompts(user, wrongQuestionsText);
        try {
            const tipResult = await model.generateContent(improvementPrompt);
            improvementTip = tipResult.response.text().trim();
        } catch (error) {
            console.error("Error generating improvement tip:", error);
            throw new Error("Failed to generate improvement tip");
        }
    }
    try {
        const assessment = await Assessment.create({
            userId: user._id,
            quizScore: score,
            questions: questionResults,
            category: "Technical",
            improvementTip,
        });
        return assessment;
    } catch (err) {
        console.error("Error saving quiz result:", err);
        return { error: "Failed to save quiz result" + err.message };
    }
}

export async function getAssessments() {
    try {
        const { success, error, user } = await getAuthenticatedUser();
        if (!success) {
            return { error };
        }
        const assessments = await Assessment.find({ userId: user._id }).sort({ createdAt: "asc" });
        const serializedAssessments = assessments.map(assessment => {
            return {
                _id: assessment._id.toString(),
                userId: assessment.userId.toString(),
                quizScore: assessment.quizScore,
                questions: assessment.questions,
                category: assessment.category,
                improvementTip: assessment.improvementTip,
                createdAt: assessment.createdAt.toISOString(),
                updatedAt: assessment.updatedAt.toISOString(),
            };
        });
        return serializedAssessments;
    } catch (err) {
        console.error("Error fetching assessments:", err);
        return { error: "Failed to fetch assessments" + err.message };
    }
}

export async function voiceInterviewQue(jobPos, jobDesc, jobExp) {
    const { success, error } = await getAuthenticatedUser();
    if (!success) {
        return { error };
    }
    const prompt = `
    Job position: ${jobPos}, Job Description: ${jobDesc}, Years of Experience : ${jobExp} , Depends on Job Position, Job Description & Years of Experience give us 5 Interview question along with Answer in JSON format, Give us question and answer field on JSON
  `;
    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
        const quiz = JSON.parse(cleanedText);
        return cleanedText;
    } catch (err) {
        console.error("Error generating voice interview questions", err);
        return { error: "Failed to generate voice interview questions" + err.message };
    }

}