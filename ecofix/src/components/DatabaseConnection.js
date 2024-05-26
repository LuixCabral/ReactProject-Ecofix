import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.PUBLIC_VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_VITE_SUPABASE_KEY;
export const supabase = createClient('https://hzxdyaicngfccdfvnwtf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6eGR5YWljbmdmY2NkZnZud3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY1MjQ5ODgsImV4cCI6MjAzMjEwMDk4OH0.Kk43DXKpmzGUy8aVl-pjUq3HZYTpMo-O9o5vG3R6Ous');