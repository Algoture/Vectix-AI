# Vectix AI

**Vectix AI** is an AI-powered platform designed to help job seekers simulate real interview experiences and enhance their preparation journey. It offers tools like an AI Resume Builder, personalized mock tests, and AI-based live voice interviews — all tailored to each user’s unique profile.

---

##  Features

- 🎯 **AI-Powered Resume Builder**
  - Generates optimized resumes with high ATS (Applicant Tracking System) scores
  - Suggests AI improvements based on job role and experience

- 🧠 **Personalized AI Mock Tests**
  - Skill-based MCQ tests generated from user-inputted experience, skills, and specialization

- 🎙️ **Live AI Voice Interviews**
  - Simulates real interviews using voice interactions
  - Requires mic and video permissions

- 📊 **Analytics Dashboard**
  - Tracks performance across mock tests
  - Provides personalized AI-based suggestions on weak areas
  - Visual performance breakdown via charts

---

##  Tech Stack

- **Frontend**: Next.js, React.js, Tailwind CSS, ShadCN UI
- **Backend**: Next.js Server Actions
- **Database**: MongoDB (via Mongoose)
- **Auth**: Clerk Auth
- **AI**: Gemini API (Google)

---

## UI Preview

![Landing Page Preview](https://github.com/user-attachments/assets/6acedaf0-f37b-45a8-b28f-0254d549c036)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Algoture/Vectix-AI.git
```
Change the directory to the cloned folder.
### 2. Install Dependencies

```bash
npm install
```
### 3. Setup Environment Variables
Create a .env file in the root directory and add the following:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

GEMINI_API_KEY=

MONGODB_URL=
```
### 4. Run the Development Server

```bash
npm run dev
```
Visit http://localhost:3000 in your browser.
