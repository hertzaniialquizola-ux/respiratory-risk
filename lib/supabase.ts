import {
  createClient as createSupabaseClient,
  type SupabaseClient,
} from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase: SupabaseClient | null =
  !supabaseUrl || !supabaseKey
    ? null
    : createSupabaseClient(supabaseUrl, supabaseKey);

export function createClient(): SupabaseClient {
  return createSupabaseClient(supabaseUrl, supabaseKey);
}
