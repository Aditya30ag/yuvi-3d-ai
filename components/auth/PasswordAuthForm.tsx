"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/auth/AuthProvider";

interface PasswordAuthFormProps {
  mode: "sign-in" | "sign-up";
  onUseCode: () => void;
}

// Matches Django's default MinimumLengthValidator
const MIN_PASSWORD_LENGTH = 8;

export function PasswordAuthForm({ mode, onUseCode }: PasswordAuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoaded, isSignedIn, signInWithPassword, signUp } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectParam = searchParams.get("redirect_url");
  const redirectTo = redirectParam && redirectParam.startsWith("/") ? redirectParam : "/workspace";
  const isSignUp = mode === "sign-up";

  useEffect(() => {
    if (isLoaded && isSignedIn) router.replace(redirectTo);
  }, [isLoaded, isSignedIn, redirectTo, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (isSignUp && password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      if (isSignUp) {
        await signUp(identifier.trim(), password);
        toast.success("Account created");
      } else {
        await signInWithPassword(identifier.trim(), password);
        toast.success("Signed in");
      }
      router.replace(redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : isSignUp ? "Sign up failed" : "Sign in failed");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[400px]">
      <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#00ffa3] to-[#00c3ff] shadow-[0_0_30px_rgba(0,255,163,0.3)]">
        <Sparkles className="h-6 w-6 stroke-[2.5] text-[#050508]" />
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        {isSignUp ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {isSignUp
          ? "Start turning photos into 3D models."
          : "Sign in with your email or username and password."}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-text-primary">
            {isSignUp ? "Email address" : "Email or username"}
          </span>
          <div className="flex items-center gap-2.5 rounded-xl border border-border-subtle bg-bg-surface px-3.5 shadow-sm transition-colors focus-within:border-neon-green/60 focus-within:ring-4 focus-within:ring-neon-green/10">
            <Mail className="h-4 w-4 text-text-muted" />
            <input
              type={isSignUp ? "email" : "text"}
              required
              autoFocus
              autoComplete={isSignUp ? "email" : "username"}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-transparent py-3 text-sm text-text-primary outline-none placeholder:text-text-muted"
            />
          </div>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-text-primary">Password</span>
          <div className="flex items-center gap-2.5 rounded-xl border border-border-subtle bg-bg-surface px-3.5 shadow-sm transition-colors focus-within:border-neon-green/60 focus-within:ring-4 focus-within:ring-neon-green/10">
            <Lock className="h-4 w-4 text-text-muted" />
            <input
              type={showPassword ? "text" : "password"}
              required
              autoComplete={isSignUp ? "new-password" : "current-password"}
              minLength={isSignUp ? MIN_PASSWORD_LENGTH : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isSignUp ? `At least ${MIN_PASSWORD_LENGTH} characters` : "Your password"}
              className="w-full bg-transparent py-3 text-sm text-text-primary outline-none placeholder:text-text-muted"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-text-muted hover:text-text-primary"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </label>

        {error && (
          <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-500" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary group mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin text-[#050508]" />
          ) : (
            <>
              {isSignUp ? "Create account" : "Sign in"}
              <ArrowRight className="h-4 w-4 text-[#050508] transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onUseCode}
          className="text-center text-xs font-semibold text-text-muted hover:text-neon-green"
        >
          Email me a one-time code instead
        </button>
      </form>

      <div className="mt-8 border-t border-border-subtle pt-6 text-center text-sm text-text-secondary">
        {isSignUp ? (
          <>
            Already have an account?{" "}
            <Link href="/sign-in" className="font-semibold text-neon-green hover:underline">
              Sign in
            </Link>
          </>
        ) : (
          <>
            New to Studio3D?{" "}
            <Link href="/sign-up" className="font-semibold text-neon-green hover:underline">
              Create an account
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
