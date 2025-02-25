
import { supabase } from "@/integrations/supabase/client";

export async function compareDocuments(resumeText: string, jobDescription: string) {
  try {
    const { data, error } = await supabase.functions.invoke('analyze-resume', {
      body: { resumeText, jobDescription }
    });

    if (error) {
      console.error('Error in compareDocuments:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in compareDocuments:', error);
    throw error;
  }
}
