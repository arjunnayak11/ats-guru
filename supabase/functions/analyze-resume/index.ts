
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const openAIApiKey = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { resumeText, jobDescription } = await req.json()
    
    console.log('Processing resume text and job description...');

    // Validate input
    if (!resumeText || !jobDescription) {
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
            content: `Analyze the resume content and job description below and provide:
              1. Calculate match percentages for different aspects
              2. Identify missing skills
              3. Provide actionable suggestions for improvement

              Resume Content:
              ${resumeText}

              Job Description:
              ${jobDescription}

              Respond with a JSON object in this exact format:
              {
                "overallMatch": <number between 0-100>,
                "skillsMatch": <number between 0-100>,
                "experienceMatch": <number between 0-100>,
                "educationMatch": <number between 0-100>,
                "missingSkills": [<array of strings>],
                "suggestions": [<array of strings>]
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

    const data = await response.json();
    console.log('Successfully received OpenAI response');
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from OpenAI');
    }

    const parsedContent = JSON.parse(data.choices[0].message.content);
    
    // Validate the response format
    if (!parsedContent.overallMatch || !Array.isArray(parsedContent.missingSkills)) {
      throw new Error('Invalid response format from OpenAI');
    }

    return new Response(
      JSON.stringify(parsedContent),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in analyze-resume function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
