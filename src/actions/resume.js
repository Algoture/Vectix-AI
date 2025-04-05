"use server";

import { improveResumePrompt } from "@/lib/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";
import { getAuthenticatedUser } from "./auth";
import { Resume } from "@/models/Models";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function saveResume(content) {
  const { success, user } = await getAuthenticatedUser();
  if (!success) {
    return null;
  }

  try {
    const updatedResume = await Resume.findOneAndUpdate(
      { userId: user.id },
      {
        $set: { content: content },
        $setOnInsert: { userId: user.id, createdAt: new Date() }
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true
      }
    );
    revalidatePath("/resume");
    return {
      success: true,
      resume: {
        id: updatedResume._id.toString(),
        userId: updatedResume.userId,
        updatedAt: updatedResume.updatedAt,
      },
    };
  } catch (err) {
    console.error(`Error saving Resume`, err);
    return {
      success: false,
      error: "Failed to save Resume",
    };
  }
}

export async function getResume() {
  const { success, error, user } = await getAuthenticatedUser();
  if (!success) {
    return null;
  }
  try {
    const result = await Resume.findOne({ userId: user.id });
    return result;
  } catch (err) {
    console.error("Error fetching Resume", err);
    return null;
  }

}

export async function improveWithAI({ current, type }) {
  const { success, error, user } = await getAuthenticatedUser();
  if (!success) {
    return { error }
  }

  const prompt = improveResumePrompt(type, current, user);
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const improvedContent = response.text().trim();
    return improvedContent;
  } catch (err) {
    console.error("Error improving content", err);
    return { error: "Failed to improve content" + err.message };
  }
}