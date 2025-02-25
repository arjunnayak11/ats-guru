
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const openAIApiKey = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { resumeText, jobDescription } = await req.json()

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
    })

    const data = await response.json()
    return new Response(
      JSON.stringify(JSON.parse(data.choices[0].message.content)),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
