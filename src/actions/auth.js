"use server";

import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/Models";

export async function getAuthenticatedUser() {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Authentication required." };
        await connectDB();
        const mongoUser = await User.findOne({ clerkUserId: userId });
        if (!mongoUser) return { success: false, error: "User not found." };
        return { success: true, user: mongoUser.toObject(), clerkUserId: userId };
    } catch (err) {
        return { success: false, error: "Server error: " + err.message };
    }
}
