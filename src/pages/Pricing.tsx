
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

const Pricing = () => {
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

        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Simple, Transparent Pricing</h1>
            <p className="text-muted-foreground">
              Choose the plan that's right for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Tier */}
            <Card className="p-8 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold">Free</h3>
                  <p className="text-muted-foreground mt-2">Perfect for trying out our service</p>
                </div>
                
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground ml-2">/scan</span>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>One resume scan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Basic ATS compatibility check</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Essential formatting tips</span>
                  </li>
                </ul>

                <Button 
                  onClick={() => navigate('/upload')}
                  className="w-full"
                >
                  Get Started
                </Button>
              </div>
            </Card>

            {/* Paid Tier */}
            <Card className="p-8 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300 bg-primary/5">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold">Premium</h3>
                  <p className="text-muted-foreground mt-2">For job seekers who want the best results</p>
                </div>
                
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">$2</span>
                  <span className="text-muted-foreground ml-2">/scan</span>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Unlimited resume scans</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Advanced ATS compatibility analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Keyword optimization suggestions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Industry-specific recommendations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Priority support</span>
                  </li>
                </ul>

                <Button 
                  onClick={() => navigate('/upload')}
                  className="w-full bg-primary"
                >
                  Choose Premium
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
