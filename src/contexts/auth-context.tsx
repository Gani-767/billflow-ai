import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";

import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    metadata?: { full_name?: string },
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const client = getSupabaseClient();

    client.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value: AuthContextValue = {
    session,
    user: session?.user ?? null,
    loading,
    signIn: async (email, password) => {
      if (!isSupabaseConfigured) {
        return {
          error: new Error(
            "Login is not available yet. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
          ),
        };
      }

      const { error } = await getSupabaseClient().auth.signInWithPassword({ email, password });
      return { error: error ? new Error(error.message) : null };
    },
    signUp: async (email, password, metadata) => {
      if (!isSupabaseConfigured) {
        return {
          error: new Error(
            "Signup is not available yet. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
          ),
        };
      }

      const { error } = await getSupabaseClient().auth.signUp({
        email,
        password,
        options: metadata?.full_name ? { data: { full_name: metadata.full_name } } : undefined,
      });
      return { error: error ? new Error(error.message) : null };
    },
    signOut: async () => {
      if (!isSupabaseConfigured) return;
      await getSupabaseClient().auth.signOut();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
