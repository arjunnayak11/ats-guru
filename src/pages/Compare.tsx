
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Target, ArrowLeft, Loader2 } from "lucide-react";
import UploadZone from "@/components/UploadZone";

const Compare = () => {
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleScanStart = async (file: File) => {
    setIsAnalyzing(true);
    // TODO: Implement comparison logic
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
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
            disabled={!jobDescription || isAnalyzing}
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
      </div>
    </div>
  );
};

export default Compare;
