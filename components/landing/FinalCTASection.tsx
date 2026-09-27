"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function FinalCTASection() {
  return (
    <section id="final-cta" className="relative bg-black py-28 lg:py-36 overflow-hidden">
      {/* Radial soft white glow behind content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-white/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 border border-white/10 bg-[#0d0d0d] px-3.5 py-1.5 rounded-full mb-6">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="text-xs text-zinc-400 font-medium">
              Start Free · No Credit Card Required
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Start Converting Images to 3D — Free
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 mt-5 max-w-xl mx-auto leading-relaxed">
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
              className="group inline-flex items-center gap-3 bg-white hover:bg-neutral-200 text-black font-semibold px-10 py-4 rounded-xl text-lg transition-colors shadow-2xl shadow-white/10"
            >
              <span>Start Converting to 3D</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-black" />
            </Link>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Free monthly credits
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Commercial license available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Direct GLB / FBX / OBJ export
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
