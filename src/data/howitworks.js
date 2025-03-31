import { UserPlus, FileEdit, Users, LineChart } from "lucide-react";

export const howItWorks = [
    {
        title: "Professional Onboarding",
        description: "Share your industry and expertise for personalized guidance",
        icon: <UserPlus className="w-8 h-8 text-primary" />,
    },
    {
        title: "Craft Your Documents",
        description: "Create ATS-optimized resumes and compelling cover letters",
        icon: <FileEdit className="w-8 h-8 text-primary" />,
    },
    {
        title: "Prepare for Interviews",
        description:
            "Practice with AI-powered mock interviews tailored to your role",
        icon: <Users className="w-8 h-8 text-primary" />,
    },
    {
        title: "Track Your Progress",
        description: "Monitor improvements with detailed performance analytics",
        icon: <LineChart className="w-8 h-8 text-primary" />,
    },
];

export const steps = [
    {
        id: "01",
        name: "Sign Up",
        description: "Create your free account in seconds and set up your profile.",
    },
    {
        id: "02",
        name: "Choose Your Tool",
        description:
            "Select from our suite of AI-powered career tools based on your needs.",
    },
    {
        id: "03",
        name: "Get Results",
        description:
            "Receive instant feedback, polished documents, or practice with our AI.",
    },
    {
        id: "04",
        name: "Land the Job",
        description:
            "Apply with confidence and ace your interviews with your new skills.",
    },
];