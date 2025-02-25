
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const openAIApiKey = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function cleanPDFText(text: string): string {
  // Remove PDF specific markers and clean up the text
  return text
    .replace(/%PDF-.*?(?=\w)/gs, '') // Remove PDF header
    .replace(/endobj|endstream|obj|\d+ \d+ obj|stream/g, '') // Remove PDF objects
    .replace(/\[\d+ \d+ \d+ \d+\]/g, '') // Remove PDF coordinates
    .replace(/<<.*?>>/g, '') // Remove PDF dictionaries
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { resumeText, jobDescription } = await req.json()
    
    console.log('Processing resume text and job description...');
    
    // Clean the resume text if it contains PDF markers
    const cleanedResumeText = resumeText.startsWith('%PDF') ? 
      cleanPDFText(resumeText) : 
      resumeText;

    // Validate input
    if (!cleanedResumeText || !jobDescription) {
      throw new Error('Missing required input: resume text or job description');
    }

    console.log('Making request to OpenAI...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
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
              ${cleanedResumeText}

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
    })

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json()
    console.log('Successfully received OpenAI response');
    
    const parsedContent = JSON.parse(data.choices[0].message.content);
    return new Response(
      JSON.stringify(parsedContent),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in analyze-resume function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
