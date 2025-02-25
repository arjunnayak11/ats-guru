
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Target, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import UploadZone from "@/components/UploadZone";
import MatchResults from "@/components/MatchResults";

interface Analysis {
  overallMatch: number;
  skillsMatch: number;
  experienceMatch: number;
  educationMatch: number;
  missingSkills: string[];
  suggestions: string[];
}

const Compare = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [resumeText, setResumeText] = useState<string>("");

  const handleScanStart = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setResumeText(e.target?.result as string);
    };
    reader.readAsText(file);
  };

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) {
      toast({
        title: "Missing information",
        description: "Please upload a resume and paste the job description.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch('/functions/compare-documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze documents');
      }

      const analysisResult = await response.json();
      setAnalysis(analysisResult);
      
      toast({
        title: "Analysis complete",
        description: "We've analyzed your resume against the job description.",
      });
    } catch (error) {
      toast({
        title: "Error analyzing documents",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Match Your Resume to Job Description</h1>
          <p className="text-muted-foreground">
            Upload your resume and paste the job description to see how well they match
          </p>
        </div>

        <div className="grid gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">1. Upload Your Resume</h2>
            <UploadZone onScanStart={handleScanStart} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">2. Paste Job Description</h2>
            <Textarea 
              placeholder="Paste the job description here..."
              className="min-h-[200px]"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <Button 
            size="lg"
            className="w-full"
            onClick={handleAnalyze}
            disabled={!jobDescription || !resumeText || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Match...
              </>
            ) : (
              <>
                <Target className="mr-2 h-4 w-4" />
                Analyze Match
              </>
            )}
          </Button>
        </div>

        {analysis && <MatchResults analysis={analysis} />}
      </div>
    </div>
  );
};

export default Compare;
