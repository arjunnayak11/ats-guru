
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function compareDocuments(resumeText: string, jobDescription: string) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert ATS and resume analyst. Analyze resumes and job descriptions to provide detailed matching scores and suggestions.'
          },
          { 
            role: 'user', 
            content: `Compare this resume with the job description and provide:
              1. An overall match percentage
              2. Matching scores for skills, experience, and education
              3. Missing skills or qualifications
              4. Specific suggestions for improvement

              Resume:
              ${resumeText}

              Job Description:
              ${jobDescription}

              Format the response as JSON with the following structure:
              {
                "overallMatch": number,
                "skillsMatch": number,
                "experienceMatch": number,
                "educationMatch": number,
                "missingSkills": string[],
                "suggestions": string[]
              }`
          }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze documents');
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('Error in compareDocuments:', error);
    throw error;
  }
}
