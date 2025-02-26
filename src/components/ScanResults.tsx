
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle } from "lucide-react";

interface ScanResultsProps {
  analysisData?: {
    overallMatch: number;
    skillsMatch: number;
    experienceMatch: number;
    educationMatch: number;
    missingSkills: string[];
    suggestions: string[];
  };
}

const ScanResults = ({ analysisData }: ScanResultsProps) => {
  if (!analysisData) {
    return null;
  }

  const improvements = [
    ...analysisData.suggestions.map(suggestion => ({
      type: "warning" as const,
      text: suggestion
    })),
    {
      type: "success" as const,
      text: "Resume successfully analyzed"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">ATS Compatibility Score</h3>
        <div className="space-y-4">
          <Progress value={analysisData.overallMatch} className="h-2" />
          <p className="text-sm text-muted-foreground text-center">
            Your resume is {analysisData.overallMatch}% ATS-friendly
          </p>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Suggested Improvements</h3>
        <div className="space-y-4">
          {improvements.map((item, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50"
            >
              {item.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
              )}
              <p className="text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ScanResults;
