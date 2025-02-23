
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import UploadZone from "@/components/UploadZone";
import ScanResults from "@/components/ScanResults";

const Upload = () => {
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleScanStart = async (file: File) => {
    setTimeout(() => {
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container py-16">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8"
        >
          ← Back
        </Button>
        
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Upload Your Resume</h1>
            <p className="text-muted-foreground">
              Let our AI-powered ATS scanner analyze your resume
            </p>
          </div>
          <UploadZone onScanStart={handleScanStart} />
          
          {showResults && (
            <div className="animate-fade-up">
              <ScanResults />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
