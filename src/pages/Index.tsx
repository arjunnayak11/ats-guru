
import { useState } from "react";
import UploadZone from "@/components/UploadZone";
import ScanResults from "@/components/ScanResults";
import { FileText, CheckCircle, Zap, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [showResults, setShowResults] = useState(false);

  const handleScanStart = async (file: File) => {
    // Here we'll add the actual scanning logic once Supabase is connected
    // For now, we'll just show the results after a delay to simulate processing
    setTimeout(() => {
      setShowResults(true);
    }, 2000);
  };

  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "ATS-Friendly Format",
      description: "Ensure your resume follows ATS formatting guidelines"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Keyword Analysis",
      description: "Check if your resume includes essential industry keywords"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Feedback",
      description: "Get immediate insights on your resume's ATS compatibility"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Job Match Score",
      description: "Compare your resume against specific job descriptions"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/5 to-transparent border-b">
        <div className="container py-16 md:py-24">
          <div className="text-center space-y-6 animate-fade-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              Smart Resume Analysis
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Optimize Your Resume for ATS
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't let your perfect resume get lost in the ATS void. Get instant feedback and improve your chances of landing that dream job.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 backdrop-blur-sm bg-white/50 border-primary/10 hover:border-primary/20 transition-colors">
              <div className="space-y-4">
                <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Ready to Optimize?</h2>
            <p className="text-muted-foreground">
              Upload your resume and let our AI-powered ATS scanner do the magic
            </p>
          </div>
          <UploadZone onScanStart={handleScanStart} />
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="max-w-2xl mx-auto mt-12">
            <ScanResults />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/50 mt-24">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          <p>Helping job seekers optimize their resumes for ATS systems</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
