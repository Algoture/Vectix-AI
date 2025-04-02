"use server"
import { auth } from "@clerk/nextjs/server";
import { User } from "@/models/Models";
// import { getAuthenticatedUser } from "./auth";
import { connectDB } from "@/lib/db";

export async function updateUser(data) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error('Authentication required.');
        const { industry, subIndustry, bio, experience, skills } = data;
        if (!industry || !subIndustry || experience == null || !skills) {
            throw new Error('Industry, Specialization, Experience, and Skills are required fields.');
        }
        await connectDB();
        const updateData = {
            industry: industry || null,
            subIndustry: subIndustry || null,
            bio: bio || null,
            experience: experience === '' ? null : parseInt(experience, 10),
            skills: typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(s => s) : (Array.isArray(skills) ? skills : []),
            updatedAt: new Date(),
        };
        const updatedUser = await User.findOneAndUpdate(
            { clerkUserId: userId },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            throw new Error('User not found during update.');
        }
        console.log(`updateUserOnboarding: User ${userId} updated successfully.`);
        return { success: true, user: JSON.parse(JSON.stringify(updatedUser)) };
    } catch (error) {
        console.error('Error in updateUserOnboarding:', error);
        return { success: false, message: error.message || 'Failed to update onboarding details.' };
    }
}

export async function getOnboardingStatus() {
    const { success, user, error } = await getAuthenticatedUser();
    if (!success) return { isOnboarded: false, error };
    return { isOnboarded: !!user.industry };
}