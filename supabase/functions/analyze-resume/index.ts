
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const HUGGING_FACE_TOKEN = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN')

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

    if (!HUGGING_FACE_TOKEN) {
      console.error('Hugging Face token not configured');
      return new Response(
        JSON.stringify({ error: 'Hugging Face token not configured' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Extract skills from job description using zero-shot classification
    console.log('Extracting skills from job description...');
    const skillsResponse = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
      {
        headers: { 
          Authorization: `Bearer ${HUGGING_FACE_TOKEN}`,
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          inputs: jobDescription,
          parameters: {
            candidate_labels: ["technical skills", "soft skills", "education", "experience"]
          }
        }),
      }
    );

    if (!skillsResponse.ok) {
      console.error('Hugging Face API error:', await skillsResponse.text());
      throw new Error('Failed to analyze skills');
    }

    const skillsData = await skillsResponse.json();
    
    // Calculate similarity scores using sentence-transformers
    console.log('Calculating similarity scores...');
    const similarityResponse = await fetch(
      "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2",
      {
        headers: { 
          Authorization: `Bearer ${HUGGING_FACE_TOKEN}`,
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          inputs: {
            source_sentence: resumeText,
            sentences: [
              jobDescription
            ]
          }
        }),
      }
    );

    if (!similarityResponse.ok) {
      console.error('Hugging Face API error:', await similarityResponse.text());
      throw new Error('Failed to calculate similarity');
    }

    const similarityScores = await similarityResponse.json();
    const overallMatch = Math.round(similarityScores[0] * 100);

    // Calculate specific match scores based on classification confidence
    const scores = skillsData.scores.map(score => Math.round(score * 100));
    
    // Structure the response
    const analysisResult = {
      overallMatch,
      skillsMatch: scores[0], // technical skills confidence
      experienceMatch: scores[3], // experience confidence
      educationMatch: scores[2], // education confidence
      missingSkills: [],
      suggestions: [
        "Consider adding more specific technical skills mentioned in the job description",
        "Quantify your achievements with metrics where possible",
        "Highlight relevant experience that matches the job requirements",
        "Ensure your education section clearly states your qualifications"
      ]
    };

    console.log('Analysis completed successfully');
    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

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
