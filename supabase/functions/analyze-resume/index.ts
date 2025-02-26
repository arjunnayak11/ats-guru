
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
    
    console.log('Processing request with input lengths:', {
      resumeLength: resumeText?.length,
      jobDescriptionLength: jobDescription?.length
    });

    // Validate input
    if (!resumeText || !jobDescription) {
      console.error('Missing required input');
      return new Response(
        JSON.stringify({ error: 'Missing required input: resume text or job description' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Making request to OpenAI...');
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: 'You are an expert ATS and resume analyst. Your task is to analyze resumes against job descriptions and provide match percentages and suggestions. Always respond with valid JSON.'
          },
          { 
            role: 'user', 
            content: `Analyze this resume against the job description and provide a match analysis.
              
              Resume:
              ${resumeText.substring(0, 8000)} // Limit text length to avoid token limits

              Job Description:
              ${jobDescription.substring(0, 4000)}

              Provide your analysis in this exact JSON format:
              {
                "overallMatch": <number 0-100>,
                "skillsMatch": <number 0-100>,
                "experienceMatch": <number 0-100>,
                "educationMatch": <number 0-100>,
                "missingSkills": ["skill1", "skill2", ...],
                "suggestions": ["suggestion1", "suggestion2", ...]
              }`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json();
      console.error('OpenAI API error:', errorData);
      return new Response(
        JSON.stringify({ error: 'Failed to process the documents' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const data = await openAIResponse.json();
    console.log('Received OpenAI response');

    if (!data.choices?.[0]?.message?.content) {
      console.error('Invalid OpenAI response format:', data);
      return new Response(
        JSON.stringify({ error: 'Invalid response from analysis service' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    try {
      const parsedContent = JSON.parse(data.choices[0].message.content);
      
      // Validate the response format
      if (typeof parsedContent.overallMatch !== 'number' || 
          !Array.isArray(parsedContent.missingSkills) || 
          !Array.isArray(parsedContent.suggestions)) {
        throw new Error('Invalid response format');
      }

      return new Response(
        JSON.stringify(parsedContent),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to parse analysis results' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
  } catch (error) {
    console.error('Error in analyze-resume function:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
