"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTASection() {
  return (
    <section id="final-cta" className="relative bg-[#050508] py-28 lg:py-36 overflow-hidden">
      {/* Radial green and blue ambient glows behind content */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#00ffa3]/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#00c3ff]/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated live pill */}
          <div className="live-pill mb-6">
            <span className="dot" />
            <span className="text-xs font-semibold">
              Start Free · No Credit Card Required
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Start Converting Images to <span className="accent">3D — Free</span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 mt-5 max-w-xl mx-auto leading-relaxed">
            No credit card required. No software to download. Generate your first
            3D model in under a minute.
          </p>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-block"
          >
            <Link
              href="/workspace"
              className="btn-primary group inline-flex items-center gap-3 font-bold px-10 py-4 text-lg shadow-2xl"
            >
              <span>Start Converting to 3D</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-[#050508]" />
            </Link>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60">
            <span className="flex items-center gap-2">
              <span className="status-dot" />
              Free monthly credits
            </span>
            <span className="flex items-center gap-2">
              <span className="neon-bullet !mt-0" />
              Commercial license available
            </span>
            <span className="flex items-center gap-2">
              <span className="status-dot" />
              Direct GLB / FBX / OBJ export
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
