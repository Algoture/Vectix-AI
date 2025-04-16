"use server";

import { currentUser } from "@clerk/nextjs/server";
import { getAuthenticatedUser } from "./auth";
import { User } from "@/models/Models";
import { connectDB } from "@/lib/db";
import { parseSkills } from "@/lib/utils";

export async function seedUser() {
    try {
        const clerkUser = await currentUser();
        if (!clerkUser) return { error: "No Clerk user found." };

        await connectDB();
        let user = await User.findOne({ clerkUserId: clerkUser.id });
        if (!user) {
            const email = clerkUser.primaryEmailAddress?.emailAddress || "";
            user = await User.create({
                clerkUserId: clerkUser.id,
                email,
                name: clerkUser.firstName || "",
                specialization: "",
                bio: "",
                experience: 0,
                skills: [],
            });
        }
        return { success: true };
    } catch (err) {
        console.error("Error seeding user:", err);
        return { error: "Server error: " + err.message };
    }
}

export async function getUserData() {
    try {
        const { success, error, user } = await getAuthenticatedUser();
        if (!success) return { error };
        return JSON.parse(JSON.stringify(user.specialization, user.skills, user.experience, user.bio));;
    } catch (err) {
        console.error("Error in getUserData:", err);
        return { error: "Server error: " + err.message };
    }
}

export async function updateUser(data) {
    try {
        const { success, clerkUserId, error } = await getAuthenticatedUser();
        if (!success) return { success: false, message: error };
        const { specialization, bio, experience, skills } = data;
        if (!specialization || experience == null || !skills) {
            throw new Error("Specialization, Experience, and Skills are required.");
        }
        const updateData = {
            specialization,
            bio,
            experience: Number.isNaN(parseInt(experience, 10)) ? null : parseInt(experience, 10),
            skills: parseSkills(skills),
            updatedAt: new Date(),
        };
        await connectDB();
        const updatedUser = await User.findOneAndUpdate(
            { clerkUserId },
            { $set: updateData },
            { new: true, runValidators: true }
        );
        if (!updatedUser) throw new Error("User not found during update.");
        return {
            success: true,
            // user: updatedUser.toObject(),
            message: "User updated successfully.",
        };
    } catch (err) {
        console.error("Error in updateUser:", err);
        return { success: false, message: err.message || "Failed to update user." };
    }
}
