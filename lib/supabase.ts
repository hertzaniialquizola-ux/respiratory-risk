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
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? supabaseUrl;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? supabaseKey;

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local at the project root.",
    );
  }

  return createSupabaseClient(url, key);
}
