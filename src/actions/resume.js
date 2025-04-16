"use server";

import { improveResumePrompt } from "@/lib/prompts";
import { revalidatePath } from "next/cache";
import { getAuthUser } from "./auth";
import { Resume } from "@/models/Models";
import { model } from "./genAI";

export async function saveResume(content) {
  const { success, id } = await getAuthUser();
  if (!success) return null;

  try {
    const updatedResume = await Resume.findOneAndUpdate(
      { userId: id },
      {
        $set: { content: content },
        $setOnInsert: { userId: id, createdAt: new Date() }
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
  const { success, id } = await getAuthUser();
  if (!success) return null;
  try {
    const result = await Resume.findOne({ userId: id });
    return result;
  } catch (err) {
    console.error("Error fetching Resume", err);
    return null;
  }

}

export async function improveWithAI({ current, type }) {
  const { success, specialization } = await getAuthUser();
  if (!success) return null;

  const prompt = improveResumePrompt(type, current, specialization);
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