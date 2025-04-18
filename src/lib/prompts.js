import { randomFlavor } from "@/data/randomPrompts";

export function generateQuizPrompt(skills, experience, specialization) {
  const prompt = `
        Generate ${process.env.NEXT_PUBLIC_NUMBER_OF_QUESTIONS} technical interview questions for a ${specialization}
        professional${skills?.length ? ` with expertise in ${skills.join(", ")}` : ""} and ${experience} years of experience.
    
        Each question should be multiple choice with 4 options.
    
        Return the response in this JSON format only, no additional text:
        {
          "questions": [
            {
              "question": "string",
              "options": ["string", "string", "string", "string"],
              "correctAnswer": "string",
              "explanation": "string"
            }
          ]
        }
      `;
  return prompt;
}

export function improvementPrompts(specialization, wrongQuestionsText) {
  const improvementPrompt = `
      The user got the following ${specialization} technical interview questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 2 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;
  return improvementPrompt;
}

export function improveResumePrompt(type, current, industry) {
  const prompt = `
    As an expert resume writer, improve the following ${type} description for a ${industry} professional.
    Make it more impactful, quantifiable, and aligned with industry standards.
    Current content: "${current}"

    Requirements:
    1. Use action verbs
    2. Include metrics and results where possible
    3. Highlight relevant technical skills
    4. Keep it concise but detailed
    5. Focus on achievements over responsibilities
    6. Use industry-specific keywords
    
    Format the response as a single paragraph without any additional text or explanations.
  `;
  return prompt;
}

export function voiceInterviewPrompt(skills, quesCount, specialization, experience, type, seed = null) {
  const variation = seed || randomFlavor[Math.floor(Math.random() * randomFlavor.length)];
  const prompt = `Prepare questions for a job interview.
        The job role is ${specialization}.
        The job experience level is ${experience} years.
        The tech stack used in the job is: ${skills}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${quesCount}.
        ${variation}
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]

        Thank you! <3
    `;
  return prompt;
}
