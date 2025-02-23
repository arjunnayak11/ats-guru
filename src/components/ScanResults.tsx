
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle } from "lucide-react";

const ScanResults = () => {
  const mockResults = {
    score: 85,
    improvements: [
      { type: "success", text: "Professional summary is well-structured" },
      { type: "warning", text: "Add more industry-specific keywords" },
      { type: "warning", text: "Quantify your achievements with metrics" },
    ],
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">ATS Compatibility Score</h3>
        <div className="space-y-4">
          <Progress value={mockResults.score} className="h-2" />
          <p className="text-sm text-muted-foreground text-center">
            Your resume is {mockResults.score}% ATS-friendly
          </p>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Suggested Improvements</h3>
        <div className="space-y-4">
          {mockResults.improvements.map((item, index) => (
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
