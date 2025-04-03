import { auth } from "@clerk/nextjs/server";
import { User } from "@/models/Models";
import { connectDB } from "@/lib/db";

export async function getAuthenticatedUser() {
    "use server";
    try {
        const { userId } = await auth();
        if (!userId) {
            return { success: false, error: "Authentication required." };
        }
        await connectDB();
        const mongoUser = await User.findOne({ clerkUserId: userId });
        if (!mongoUser) {
            return { success: false, error: "User not found." };
        }
        return { success: true, user: mongoUser, clerkUserId: userId };
    } catch (err) {
        return { success: false, error: "Server error: " + err.message };
    }
}