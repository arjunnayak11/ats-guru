
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle } from "lucide-react";

interface MatchResultsProps {
  analysis: {
    overallMatch: number;
    skillsMatch: number;
    experienceMatch: number;
    educationMatch: number;
    missingSkills: string[];
    suggestions: string[];
  };
}

const MatchResults = ({ analysis }: MatchResultsProps) => {
  return (
    <div className="space-y-6 animate-fade-up">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Match Analysis</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Overall Match</span>
              <span className="font-semibold">{analysis.overallMatch}%</span>
            </div>
            <Progress value={analysis.overallMatch} className="h-2" />
          </div>
          
          <div className="grid gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Skills Match</span>
                <span>{analysis.skillsMatch}%</span>
              </div>
              <Progress value={analysis.skillsMatch} className="h-1.5" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Experience Match</span>
                <span>{analysis.experienceMatch}%</span>
              </div>
              <Progress value={analysis.experienceMatch} className="h-1.5" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Education Match</span>
                <span>{analysis.educationMatch}%</span>
              </div>
              <Progress value={analysis.educationMatch} className="h-1.5" />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Missing Skills</h3>
        <div className="space-y-2">
          {analysis.missingSkills.map((skill, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-destructive/5">
              <XCircle className="w-5 h-5 text-destructive mt-0.5" />
              <p className="text-sm">{skill}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Improvement Suggestions</h3>
        <div className="space-y-2">
          {analysis.suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-primary/5">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <p className="text-sm">{suggestion}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default MatchResults;
