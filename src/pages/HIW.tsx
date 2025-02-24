
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Brain, Target, Zap, ArrowRight, Users } from "lucide-react";

const HIW = () => {
  const navigate = useNavigate();

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

        <div className="max-w-5xl mx-auto space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
              How Our AI Scanner Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our advanced AI technology ensures your resume makes it through ATS systems with 100% accuracy
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">1M+</div>
              <p className="text-muted-foreground">Successful Applications</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">100%</div>
              <p className="text-muted-foreground">ATS Pass Rate</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">95%</div>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
          </div>

          {/* Process Steps */}
          <div className="space-y-16">
            <div className="space-y-12">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold">Advanced AI Analysis</h3>
                  <p className="text-muted-foreground">
                    Our AI engine analyzes your resume against a database of millions of successful applications, 
                    ensuring perfect compatibility with modern ATS systems.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold">Perfect Keyword Optimization</h3>
                  <p className="text-muted-foreground">
                    We identify and suggest the most relevant keywords for your industry and role, 
                    ensuring your resume matches what employers are looking for.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold">Format Verification</h3>
                  <p className="text-muted-foreground">
                    Our system ensures your resume follows the exact formatting requirements of ATS systems, 
                    preventing technical rejections.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-card rounded-lg border">
                <div className="space-y-4">
                  <p className="italic text-muted-foreground">
                    "After using ATS Guru, my resume made it through to every company I applied to. 
                    I landed my dream job at a top tech company!"
                  </p>
                  <div>
                    <p className="font-semibold">Alex Thompson</p>
                    <p className="text-sm text-muted-foreground">Software Engineer</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-card rounded-lg border">
                <div className="space-y-4">
                  <p className="italic text-muted-foreground">
                    "The AI suggestions were spot-on. My interview rate increased by 300% after 
                    optimizing my resume with ATS Guru."
                  </p>
                  <div>
                    <p className="font-semibold">Maria Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Marketing Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-6 py-12">
            <h2 className="text-3xl font-bold">Ready to Optimize Your Resume?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join millions of successful job seekers who have used our AI-powered scanner to land their dream jobs.
            </p>
            <Button 
              onClick={() => navigate('/upload')}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              Start Scanning Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HIW;
