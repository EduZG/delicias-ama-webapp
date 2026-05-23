import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv, hasSupabaseEnv } from "@/lib/supabase/env";
import type { Database } from "@/types/database";

export function createSupabaseBrowserClient() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const { supabaseAnonKey, supabaseUrl } = getSupabaseEnv();

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}
