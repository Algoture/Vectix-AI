"use server"
import { currentUser } from "@clerk/nextjs/server";
import { getAuthenticatedUser } from "./auth";
import { User } from "@/models/Models";
import { User } from "@/models/Models";
import { connectDB } from "@/lib/db";

export async function updateUser(data) {
    try {
        const { success, clerkUserId, error } = await getAuthenticatedUser();
        if (!success) {
            return { success: false, message: error };
        }
        const { industry, subIndustry, bio, experience, skills } = data;
        if (!industry || !subIndustry || experience == null || !skills) {
            throw new Error('Industry, Specialization, Experience, and Skills are required fields.');
        }
        const updateData = {
            industry: industry,
            subIndustry: subIndustry,
            bio: bio,
            experience: Number.isNaN(parseInt(experience, 10)) ? null : parseInt(experience, 10),
            skills: typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(s => s) : (Array.isArray(skills) ? skills : []),
            updatedAt: new Date(),
        };
        const updatedUser = await User.findOneAndUpdate(
            { clerkUserId },
            { $set: updateData },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            throw new Error('User not found during update.');
        }
        return { success: true, user: JSON.parse(JSON.stringify(updatedUser)), message: "User updated successfully." };
    } catch (error) {
        console.error("Error in updateUser:", error);
        return { success: false, message: error.message || "Failed to update user details." };
    }
}

export async function seedUser() {
    try {
        const clerkUser = await currentUser();
        if (!clerkUser) {
            console.log("No Clerk user found.");
            return { error: "No Clerk user found." };
        }
        await connectDB();
        let user = await User.findOne({ clerkUserId: clerkUser.id });
        if (!user) {
            const emailId = clerkUser.primaryEmailAddress?.emailAddress;
            const newUser = {
                clerkUserId: clerkUser.id,
                email: emailId || "",
                name: clerkUser.firstName || "",
                industry: "",
                bio: "",
                experience: 0,
                skills: [],
            };
            user = await User.create(newUser);
        }
        return JSON.parse(JSON.stringify(user));
    } catch (err) {
        console.error("Error seeding user:", err);
        return { error: "Server error: " + err.message };
    }
}

export async function getUserData() {
    try {
        const { success, error, user } = await getAuthenticatedUser();
        if (!success) {
            return { error };
        }
        return JSON.parse(JSON.stringify(user));
    } catch (err) {
        console.error('Error in getUserData:');
        return { error: "Server error: " + err.message };;
    }
}