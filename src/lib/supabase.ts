import { createClient } from '@supabase/supabase-js';

// Provide fallback values so the app doesn't crash on load if env vars are missing.
// The API calls will fail gracefully and show the error state in the UI.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
