import { redirect } from "@tanstack/react-router";

import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

export async function requireAuth() {
  if (!isSupabaseConfigured) {
    throw redirect({ to: "/login" });
  }

  const {
    data: { session },
  } = await getSupabaseClient().auth.getSession();
  if (!session) {
    throw redirect({ to: "/login" });
  }
  return session;
}
