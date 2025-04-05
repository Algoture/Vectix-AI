"use server";

import { Assessment } from "@/models/Models";
import { getAuthenticatedUser } from "./auth";
import { generateQuizPrompt, improvementPrompts } from "@/lib/prompts";
import { model } from "./genAI";

export async function generateQuiz() {
    const { success, error, user } = await getAuthenticatedUser();
    if (!success) return { error };
    const prompt = generateQuizPrompt(user);
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
    const { success, error, user } = await getAuthenticatedUser();
    if (!success) return { error };
    const questionResults = questions.map((q, index) => ({
        question: q.question,
        answer: q.correctAnswer,
        userAnswer: answers[index],
        isCorrect: q.correctAnswer === answers[index],
        explanation: q.explanation,
    }));
    const wrongAnswers = questionResults.filter((q) => !q.isCorrect);
    let improvementTip = null;
    if (wrongAnswers.length > 0 && wrongAnswers.length <= 5) {
        const wrongQuestionsText = wrongAnswers.map((q) =>
            `Question: "${q.question}"\nCorrect: "${q.answer}"\nYour Answer: "${q.userAnswer}"`
        ).join("\n\n");

        const prompt = improvementPrompts(user, wrongQuestionsText);
        try {
            const tipResult = await model.generateContent(prompt);
            improvementTip = tipResult.response.text().trim();
        } catch (err) {
            console.error("Error generating tip:", err);
        }
    }
    try {
        await Assessment.create({
            userId: user._id,
            quizScore: score,
            questions: questionResults,
            category: "Technical",
            improvementTip,
        });
        // return assessment.toObject();
    } catch (err) {
        console.error("Error saving quiz result:", err);
        return { error: "Failed to save result: " + err.message };
    }
}

export async function getAssessments(page = 0, limit = 10) {
    const { success, error, user } = await getAuthenticatedUser();
    if (!success) return { error };
    try {
        const assessments = await Assessment.find({ userId: user._id })
            .sort({ createdAt: "asc" })
            .limit(limit)
            .skip(page * limit);
        return assessments.map((a) => ({
            _id: a._id.toString(),
            userId: a.userId.toString(),
            quizScore: a.quizScore,
            questions: a.questions,
            category: a.category,
            improvementTip: a.improvementTip,
            createdAt: a.createdAt.toISOString(),
            updatedAt: a.updatedAt.toISOString(),
        }));
    } catch (err) {
        console.error("Error fetching assessments:", err);
        return { error: "Failed to fetch: " + err.message };
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