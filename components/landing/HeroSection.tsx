"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Box, Download, ImageIcon, Mail } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { MeshVisual, PhotoVisual } from "./MeshVisual";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
});

export function HeroSection() {
  const { isSignedIn } = useAuth();

  return (
    <section className="relative overflow-hidden px-6 pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full bg-neon-green/10 blur-[140px]" />
      <div className="pointer-events-none absolute top-20 right-0 h-[480px] w-[480px] rounded-full bg-neon-blue/10 blur-[140px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <motion.div {...fadeUp()} className="live-pill mb-6 inline-flex">
            <span className="dot" />
            <span className="text-xs font-semibold tracking-wide">Image to 3D · STL ready to print</span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="hero-title text-4xl font-bold leading-[1.08] tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
          >
            Turn a product photo into a <span className="accent">printable 3D model</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg lg:mx-0"
          >
            Upload one image, pick an AI engine, and get an STL you can slice and print, plus a 3D preview
            you can spin right in your browser. No modeling software, no setup.
          </motion.p>

          <motion.div
            {...fadeUp(0.24)}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Link
              href={isSignedIn ? "/workspace" : "/sign-up"}
              className="btn-primary group inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold shadow-xl"
            >
              {isSignedIn ? "Open workspace" : "Create your first model"}
              <ArrowRight className="h-4 w-4 text-[#050508] transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="#how-it-works" className="btn-secondary inline-flex items-center px-6 py-3.5 text-sm font-semibold">
              See how it works
            </a>
          </motion.div>

          <motion.p
            {...fadeUp(0.32)}
            className="mt-5 flex items-center justify-center gap-1.5 text-xs text-text-muted lg:justify-start"
          >
            <Mail className="h-3.5 w-3.5" />
            Sign in with a one-time email code. No password to remember.
          </motion.p>
        </div>

        {/* Photo → mesh visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="pointer-events-none absolute -inset-6 rounded-[32px] bg-gradient-to-tr from-neon-green/15 via-neon-blue/10 to-neon-purple/10 blur-3xl" />
          <div className="hero-mock-border-glow">
            <div className="relative overflow-hidden rounded-[20px] border border-border-subtle bg-bg-surface/95 p-5 shadow-2xl backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-border-secondary" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border-secondary" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border-secondary" />
                </div>
                <span className="badge-cyan">Completed</span>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <figure>
                  <div className="overflow-hidden rounded-xl border border-border-subtle shadow-sm">
                    <PhotoVisual className="block h-auto w-full" />
                  </div>
                  <figcaption className="mt-2 flex items-center gap-1.5 text-[11px] text-text-muted">
                    <ImageIcon className="h-3 w-3" /> vase.jpg
                  </figcaption>
                </figure>

                <div className="flex flex-col items-center gap-1 text-text-muted">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-bg-surface-secondary">
                    <ArrowRight className="h-4 w-4 text-neon-green" />
                  </div>
                </div>

                <figure>
                  <div className="flex aspect-[4/5] items-center justify-center rounded-xl border border-border-subtle bg-gradient-to-b from-bg-surface-secondary to-bg-surface">
                    <MeshVisual className="h-[88%] w-auto" />
                  </div>
                  <figcaption className="mt-2 flex items-center gap-1.5 text-[11px] text-text-muted">
                    <Box className="h-3 w-3" /> vase.stl
                  </figcaption>
                </figure>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border-subtle pt-4">
                <div className="text-xs text-text-muted">
                  Engine <span className="font-medium text-text-primary">TRELLIS</span>
                </div>
                <span className="btn-primary inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold">
                  <Download className="h-3.5 w-3.5 text-[#050508]" /> Download STL
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
