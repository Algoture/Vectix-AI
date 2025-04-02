"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { User } from "@/models/Models";
import { connectDB } from "@/lib/db";

export async function seedUser() {
    try {
        const clerkUser = await currentUser();
        if (!clerkUser) {
            console.log('syncUser: No Clerk user found.');
            return null;
        }
        // connect to DB
        await connectDB();
        let mongoUser = await User.findOne({ clerkUserId: clerkUser.id });
        if (!mongoUser) {
            // console.log(`syncUser: User with Clerk ID ${clerkUser.id} not found. Creating...`);

            const emailAddress = clerkUser.primaryEmailAddress?.emailAddress;
            if (!emailAddress) {
                // console.error(`syncUser: User ${clerkUser.id} has no primary email address.`);
                throw new Error('Primary email address is required for new user creation.');
            }

            const newUser = {
                clerkUserId: clerkUser.id,
                email: emailAddress,
                name: clerkUser.firstName || '',
                industry: "",
                bio: "",
                experience: 0,
                skills: [],
            };
            mongoUser = await User.create(newUser);
            // console.log(`syncUser: User created successfully with ID: ${mongoUser._id}`);
        } else {
            // console.log();
        }
        return JSON.parse(JSON.stringify(mongoUser));
    } catch (error) {
        console.error("Error seeding user:", error);
    }
}
export async function getUserData() {
    try {
        const {userId} = await auth();
        if (!userId) {
            console.log('getUserData: No server Clerk user ID found.');
            return null;
        }
        await connectDB();
        const mongoUser = await User.findOne({ clerkUserId: userId });

        if (!mongoUser) {
            console.log(`getUserData: No MongoDB user found for Clerk ID ${userId}. Seeding might be needed.`);
            return null;
        }
        return JSON.parse(JSON.stringify(await mongoUser));
    } catch (error) {
        console.error('Error in getUserData:');
        return null;
    }
}

