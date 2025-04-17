import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    clerkUserId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String },
    specialization: { type: String },
    bio: { type: String },
    experience: { type: Number },
    skills: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const AssessmentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    quizScore: { type: Number, required: true },
    questions: [{ type: Schema.Types.Mixed }],
    category: { type: String, required: true },
    improvementTip: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const ResumeSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    content: { type: String, required: true },
    atsScore: { type: Number },
    feedback: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const VoiceQueSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    questions: [{ type: String }]
})

const User = mongoose.models?.User || mongoose.model("User", UserSchema);
const Assessment = mongoose.models?.Assessment || mongoose.model("Assessment", AssessmentSchema);
const Resume = mongoose.models?.Resume || mongoose.model("Resume", ResumeSchema);
const VoiceQue = mongoose.models?.VoiceQue || mongoose.model("VoiceQue", VoiceQueSchema);

export { User, Assessment, Resume, VoiceQue };
