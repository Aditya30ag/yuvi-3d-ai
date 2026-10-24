"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  clearSession,
  getStoredEmail,
  getStoredToken,
  logout,
  setUnauthorizedHandler,
  storeSession,
  verifyOtp,
} from "@/lib/api";

interface AuthContextType {
  isLoaded: boolean;
  isSignedIn: boolean;
  email: string | null;
  signIn: (email: string, code: string) => Promise<void>;
  signOut: (redirectTo?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setToken(getStoredToken());
    setEmail(getStoredEmail());
    setIsLoaded(true);
  }, []);

  const signIn = useCallback(async (rawEmail: string, code: string) => {
    const data = await verifyOtp(rawEmail, code);
    storeSession(data.access_token, data.email);
    setToken(data.access_token);
    setEmail(data.email);
  }, []);

  const signOut = useCallback(
    async (redirectTo = "/") => {
      await logout();
      clearSession();
      setToken(null);
      setEmail(null);
      router.push(redirectTo);
    },
    [router]
  );

  // Expired/invalid token on any API call → drop session and go to sign-in
  useEffect(() => {
    setUnauthorizedHandler(() => {
      clearSession();
      setToken(null);
      setEmail(null);
      const redirect = pathname && pathname !== "/sign-in" ? `?redirect_url=${encodeURIComponent(pathname)}` : "";
      router.push(`/sign-in${redirect}`);
    });
    return () => setUnauthorizedHandler(null);
  }, [router, pathname]);

  const value = useMemo(
    () => ({ isLoaded, isSignedIn: Boolean(token), email, signIn, signOut }),
    [isLoaded, token, email, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
