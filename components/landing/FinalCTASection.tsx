"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

export function FinalCTASection() {
  const { isSignedIn } = useAuth();

  return (
    <section id="get-started" className="relative px-6 pb-24 lg:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-border-subtle bg-bg-surface px-6 py-16 text-center shadow-xl sm:px-12"
      >
        <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-[#00ffa3]/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-[#00c3ff]/20 blur-[100px]" />

        <div className="relative">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Your next print starts with <span className="hero-title"><span className="accent">a photo</span></span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
            Sign in with your email, upload an image and download your first STL in minutes.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={isSignedIn ? "/workspace" : "/sign-up"}
              className="btn-primary group inline-flex items-center gap-2 px-8 py-3.5 text-base font-bold shadow-xl"
            >
              {isSignedIn ? "Open workspace" : "Get started"}
              <ArrowRight className="h-4 w-4 text-[#050508] transition-transform group-hover:translate-x-1" />
            </Link>
            {!isSignedIn && (
              <Link href="/sign-in" className="btn-secondary inline-flex items-center px-6 py-3.5 text-sm font-semibold">
                I already have an account
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
