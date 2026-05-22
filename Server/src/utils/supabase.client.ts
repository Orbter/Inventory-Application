import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL as string;
const anonKey = process.env.ANON_KEY as string;

if (!supabaseUrl || !anonKey) {
  throw new Error('Missing Supabase environment variables');
}
export const supabase = createClient(supabaseUrl, anonKey);
