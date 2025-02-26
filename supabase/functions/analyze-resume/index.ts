
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const HUGGING_FACE_TOKEN = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Helper function to extract keywords using zero-shot classification
async function extractKeywords(text: string, category: string) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
    {
      headers: { 
        Authorization: `Bearer ${HUGGING_FACE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        inputs: text,
        parameters: {
          candidate_labels: [
            "programming languages",
            "frameworks",
            "tools",
            "soft skills",
            "technical skills",
            "certifications",
            "industry knowledge"
          ]
        }
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to extract ${category} keywords`);
  }

  return response.json();
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

    // Extract keywords from both documents
    console.log('Extracting keywords from both documents...');
    const [jobKeywords, resumeKeywords] = await Promise.all([
      extractKeywords(jobDescription, 'job'),
      extractKeywords(resumeText, 'resume')
    ]);

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
            sentences: [jobDescription]
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

    // Find missing skills by comparing job and resume scores
    const missingSkills = [];
    jobKeywords.scores.forEach((score, index) => {
      if (score > 0.6 && resumeKeywords.scores[index] < 0.4) {
        missingSkills.push(jobKeywords.labels[index]);
      }
    });

    // Calculate specific match percentages
    const skillsMatch = Math.round(
      (resumeKeywords.scores[2] + resumeKeywords.scores[4]) * 50
    );
    const experienceMatch = Math.round(resumeKeywords.scores[6] * 100);
    const educationMatch = Math.round(
      (resumeKeywords.scores[5] + resumeKeywords.scores[2]) * 50
    );

    // Generate suggestions based on analysis
    const suggestions = [
      "Consider adding more specific technical skills mentioned in the job description",
      "Quantify your achievements with metrics where possible",
      "Highlight relevant experience that matches the job requirements",
      "Ensure your education section clearly states your qualifications"
    ];

    if (missingSkills.length > 0) {
      suggestions.unshift(`Add missing keywords related to: ${missingSkills.join(', ')}`);
    }

    // Structure the response
    const analysisResult = {
      overallMatch,
      skillsMatch,
      experienceMatch,
      educationMatch,
      missingSkills,
      suggestions
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
