// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ejmuobsznmsvvuqencpr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqbXVvYnN6bm1zdnZ1cWVuY3ByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyNzIyMzgsImV4cCI6MjA1NTg0ODIzOH0.4pGQZrEhtMiSfbDZwMc2pYT6IQLjnCkUJcY45wJZVDs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);