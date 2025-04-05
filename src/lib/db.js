import mongoose from "mongoose";
let isConnected = false;
export async function connectDB() {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Database connection failed");
    }
}
