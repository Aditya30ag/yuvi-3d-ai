"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  clearSession,
  getStoredEmail,
  getStoredToken,
  loginWithPassword,
  logout,
  setUnauthorizedHandler,
  signupWithPassword,
  storeSession,
  verifyOtp,
} from "@/lib/api";

interface AuthContextType {
  isLoaded: boolean;
  isSignedIn: boolean;
  email: string | null;
  signIn: (email: string, code: string) => Promise<void>;
  signInWithPassword: (identifier: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
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

  const startSession = useCallback((accessToken: string, sessionEmail: string) => {
    storeSession(accessToken, sessionEmail);
    setToken(accessToken);
    setEmail(sessionEmail);
  }, []);

  const signIn = useCallback(
    async (rawEmail: string, code: string) => {
      const data = await verifyOtp(rawEmail, code);
      startSession(data.access_token, data.email);
    },
    [startSession]
  );

  const signInWithPassword = useCallback(
    async (identifier: string, password: string) => {
      const data = await loginWithPassword(identifier, password);
      startSession(data.access_token, data.email || data.username);
    },
    [startSession]
  );

  const signUp = useCallback(
    async (rawEmail: string, password: string) => {
      const data = await signupWithPassword(rawEmail, password);
      startSession(data.access_token, data.email);
    },
    [startSession]
  );

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
    () => ({
      isLoaded,
      isSignedIn: Boolean(token),
      email,
      signIn,
      signInWithPassword,
      signUp,
      signOut,
    }),
    [isLoaded, token, email, signIn, signInWithPassword, signUp, signOut]
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
