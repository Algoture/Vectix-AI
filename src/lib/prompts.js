export function generateQuizPrompt(user) {
  const prompt = `
        Generate ${process.env.NEXT_PUBLIC_NUMBER_OF_QUESTIONS} technical interview questions for a ${user.industry}
        professional${user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""}.
    
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

export function improvementPrompts(user, wrongQuestionsText) {
  const improvementPrompt = `
      The user got the following ${user.industry} technical interview questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 2 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;
  return improvementPrompt;
}

export function improveResumePrompt(type, current, user) {
  const prompt = `
    As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
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