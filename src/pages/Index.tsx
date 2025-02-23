
import { useState } from "react";
import UploadZone from "@/components/UploadZone";
import ScanResults from "@/components/ScanResults";

const Index = () => {
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12 space-y-12">
        <div className="text-center space-y-4 animate-fade-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
            ATS Resume Scanner
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            Optimize Your Resume for ATS
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your resume and get instant feedback on its ATS compatibility
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <UploadZone />
        </div>

        {showResults && (
          <div className="max-w-2xl mx-auto">
            <ScanResults />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
