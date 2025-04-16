"use server";

import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/Models";

export async function getAuthUser() {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Authentication required." };
        await connectDB();
        const mongoUser = await User.findOne({ clerkUserId: userId });
        if (!mongoUser) return { success: false, error: "User not found." };
        return {
            success: true,
            id: mongoUser.id,
            bio: mongoUser.bio,
            skills: mongoUser.skills,
            specialization: mongoUser.specialization,
            experience: mongoUser.experience
        };
    } catch (err) {
        return { success: false, error: "Server error: " + err.message };
    }
}
