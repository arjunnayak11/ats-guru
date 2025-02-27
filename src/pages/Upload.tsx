
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import UploadZone from "@/components/UploadZone";
import ScanResults from "@/components/ScanResults";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Upload = () => {
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setShowResults(false);
  };

  const handleScanStart = async () => {
    if (!uploadedFile) {
      toast({
        title: "No file selected",
        description: "Please upload a resume first.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    toast({
      title: "Processing resume",
      description: "Please wait while we analyze your resume...",
    });

    try {
      // Convert PDF to text
      const reader = new FileReader();
      reader.onload = async (e) => {
        const resumeText = e.target?.result as string;
        
        // For now, using a mock job description
        const jobDescription = `We are looking for a skilled software engineer with experience in:
          - React and TypeScript
          - Node.js and Express
          - Database design and SQL
          - Cloud platforms (AWS/Azure)
          - Git version control
          Must have excellent problem-solving abilities and communication skills.`;

        // Call the analyze-resume function
        const { data, error } = await supabase.functions.invoke('analyze-resume', {
          body: { resumeText, jobDescription }
        });

        if (error) {
          throw error;
        }

        setAnalysisData(data);
        setShowResults(true);
        toast({
          title: "Analysis complete",
          description: "Your resume has been successfully analyzed.",
        });
      };

      reader.readAsText(uploadedFile);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      toast({
        title: "Error analyzing resume",
        description: "An error occurred while analyzing your resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 md:px-6 py-8 md:py-16">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8"
        >
          ← Back
        </Button>
        
        <div className="max-w-2xl mx-auto space-y-8 md:space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold">Upload Your Resume</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Let our AI-powered ATS scanner analyze your resume
            </p>
          </div>
          
          <UploadZone onFileSelect={handleFileUpload} />
          
          <div className="flex justify-center">
            <Button
              onClick={handleScanStart}
              disabled={!uploadedFile || isProcessing}
              className="w-full max-w-xs"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Analyze Resume'
              )}
            </Button>
          </div>

          {showResults && (
            <div className="animate-fade-up">
              <ScanResults analysisData={analysisData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
