
import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const UploadZone = ({ onScanStart }: { onScanStart: (file: File) => void }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      toast({
        title: "File uploaded successfully",
        description: "Your resume is ready for ATS scanning.",
      });
    } else {
      toast({
        title: "Invalid file format",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleScan = async () => {
    if (!file) return;
    
    setIsLoading(true);
    try {
      onScanStart(file);
    } catch (error) {
      toast({
        title: "Error scanning resume",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <Card
      className={`relative p-8 transition-all duration-300 ease-in-out border-2 border-dashed rounded-xl 
        ${isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"}
        hover:border-primary hover:bg-primary/5`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fade-up">
        {!file ? (
          <>
            <div className="p-4 rounded-full bg-primary/10">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Drop your resume here</h3>
              <p className="text-sm text-muted-foreground">
                Upload your PDF resume to check ATS compatibility
              </p>
            </div>
          </>
        ) : (
          <div className="space-y-4 w-full">
            <div className="flex items-center space-x-4">
              <FileText className="w-8 h-8 text-primary" />
              <div className="text-left flex-1">
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  Ready for ATS analysis
                </p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <Button
              className="w-full"
              onClick={handleScan}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                "Start ATS Scan"
              )}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default UploadZone;
