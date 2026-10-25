"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Loader2, Mail, Pencil, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { requestOtp } from "@/lib/api";
import { useAuth } from "@/components/auth/AuthProvider";

interface OtpSignInFormProps {
  mode: "sign-in" | "sign-up";
  onUsePassword?: () => void;
}

const CODE_LENGTH = 6;
// Matches the backend's OTP_RESEND_COOLDOWN_SECONDS
const RESEND_COOLDOWN_SECONDS = 60;

export function OtpSignInForm({ mode, onUsePassword }: OtpSignInFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoaded, isSignedIn, signIn } = useAuth();

  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const digitRefs = useRef<(HTMLInputElement | null)[]>([]);

  const redirectParam = searchParams.get("redirect_url");
  const redirectTo = redirectParam && redirectParam.startsWith("/") ? redirectParam : "/workspace";
  const code = digits.join("");

  useEffect(() => {
    if (isLoaded && isSignedIn) router.replace(redirectTo);
  }, [isLoaded, isSignedIn, redirectTo, router]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const sendCode = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await requestOtp(email.trim());
      setStep("code");
      setCooldown(RESEND_COOLDOWN_SECONDS);
      if (res.dev_code) {
        // Backend runs with DEBUG=true and returns the code for local testing
        setDigits(res.dev_code.slice(0, CODE_LENGTH).split(""));
        toast.info("Dev mode: login code pre-filled");
      } else {
        setDigits(Array(CODE_LENGTH).fill(""));
        toast.success("Check your inbox for a 6-digit code");
        setTimeout(() => digitRefs.current[0]?.focus(), 50);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send code");
    } finally {
      setIsSubmitting(false);
    }
  };

  const verify = async (value: string) => {
    if (value.length !== CODE_LENGTH || isSubmitting) return;
    setError(null);
    setIsSubmitting(true);
    try {
      await signIn(email.trim(), value);
      toast.success("Signed in");
      router.replace(redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
      setDigits(Array(CODE_LENGTH).fill(""));
      setTimeout(() => digitRefs.current[0]?.focus(), 50);
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "email") sendCode();
    else verify(code);
  };

  const fillDigits = (startIndex: number, raw: string) => {
    const chars = raw.replace(/\D/g, "").slice(0, CODE_LENGTH - startIndex).split("");
    if (chars.length === 0) return;
    const next = [...digits];
    chars.forEach((char, i) => (next[startIndex + i] = char));
    setDigits(next);
    const focusIndex = Math.min(startIndex + chars.length, CODE_LENGTH - 1);
    digitRefs.current[focusIndex]?.focus();
    const joined = next.join("");
    if (joined.length === CODE_LENGTH) verify(joined);
  };

  const handleDigitKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = [...digits];
      if (next[index]) {
        next[index] = "";
      } else if (index > 0) {
        next[index - 1] = "";
        digitRefs.current[index - 1]?.focus();
      }
      setDigits(next);
    } else if (e.key === "ArrowLeft" && index > 0) {
      digitRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < CODE_LENGTH - 1) {
      digitRefs.current[index + 1]?.focus();
    }
  };

  const isSignUp = mode === "sign-up";

  return (
    <div className="w-full max-w-[400px]">
      <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#00ffa3] to-[#00c3ff] shadow-[0_0_30px_rgba(0,255,163,0.3)]">
        {step === "email" ? (
          <Sparkles className="h-6 w-6 stroke-[2.5] text-[#050508]" />
        ) : (
          <Mail className="h-6 w-6 stroke-[2.5] text-[#050508]" />
        )}
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        {step === "code" ? "Check your email" : isSignUp ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {step === "email" ? (
          isSignUp
            ? "Start turning photos into 3D models. We'll email you a code, no password needed."
            : "Sign in with a one-time code sent to your email."
        ) : (
          <>
            We sent a 6-digit code to{" "}
            <span className="inline-flex items-center gap-1 font-medium text-text-primary">
              {email}
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setError(null);
                }}
                className="rounded p-0.5 text-text-muted hover:text-neon-green"
                aria-label="Change email"
                title="Change email"
              >
                <Pencil className="h-3 w-3" />
              </button>
            </span>
          </>
        )}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        {step === "email" ? (
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-text-primary">Email address</span>
            <div className="flex items-center gap-2.5 rounded-xl border border-border-subtle bg-bg-surface px-3.5 shadow-sm transition-colors focus-within:border-neon-green/60 focus-within:ring-4 focus-within:ring-neon-green/10">
              <Mail className="h-4 w-4 text-text-muted" />
              <input
                type="email"
                required
                autoFocus
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent py-3 text-sm text-text-primary outline-none placeholder:text-text-muted"
              />
            </div>
          </label>
        ) : (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-text-primary">Login code</span>
            <div className="flex justify-between gap-2">
              {digits.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    digitRefs.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete={i === 0 ? "one-time-code" : "off"}
                  aria-label={`Digit ${i + 1}`}
                  maxLength={CODE_LENGTH}
                  value={digit}
                  disabled={isSubmitting}
                  onChange={(e) => fillDigits(i, e.target.value)}
                  onKeyDown={(e) => handleDigitKeyDown(i, e)}
                  onPaste={(e) => {
                    e.preventDefault();
                    fillDigits(0, e.clipboardData.getData("text"));
                  }}
                  onFocus={(e) => e.target.select()}
                  className={`h-14 w-full min-w-0 rounded-xl border bg-bg-surface text-center text-xl font-semibold text-text-primary shadow-sm outline-none transition-all focus:border-neon-green/70 focus:ring-4 focus:ring-neon-green/10 disabled:opacity-60 ${
                    error ? "border-red-400" : digit ? "border-neon-green/40" : "border-border-subtle"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {error && (
          <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-500" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || (step === "code" && code.length !== CODE_LENGTH)}
          className="btn-primary group mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin text-[#050508]" />
          ) : (
            <>
              {step === "email" ? "Continue with email" : "Verify & continue"}
              <ArrowRight className="h-4 w-4 text-[#050508] transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>

        {step === "code" && (
          <p className="text-center text-xs text-text-muted">
            Didn&apos;t get it? Check spam, or{" "}
            {cooldown > 0 ? (
              <span>resend in {cooldown}s</span>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={sendCode}
                className="font-semibold text-neon-green hover:underline"
              >
                resend the code
              </button>
            )}
          </p>
        )}

        {onUsePassword && (
          <button
            type="button"
            onClick={onUsePassword}
            className="text-center text-xs font-semibold text-text-muted hover:text-neon-green"
          >
            Use a password instead
          </button>
        )}
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
