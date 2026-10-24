"use client";

import { motion } from "framer-motion";
import { Gauge, Layers, Sparkles } from "lucide-react";
import { SectionHeading } from "./HowItWorksSection";

const ENGINES = [
  {
    icon: Gauge,
    name: "Hyperbolic",
    tag: "Fastest",
    body: "Builds a relief-style mesh straight from your photo in seconds. Great for quick prints, signs and embossed shapes.",
    outputs: "STL",
    accent: "from-[#00ffa3]/20 to-transparent",
  },
  {
    icon: Layers,
    name: "Hugging Face TRELLIS",
    tag: "Full 3D",
    body: "Microsoft's TRELLIS reconstructs a complete 3D object from one image. Runs on a shared space, so it may queue when busy.",
    outputs: "GLB + STL",
    accent: "from-[#00c3ff]/20 to-transparent",
  },
  {
    icon: Sparkles,
    name: "Fal.ai models",
    tag: "Highest quality",
    body: "TRELLIS, TRELLIS 2 and Tripo H3.1 on dedicated GPUs, for detailed geometry and textured previews.",
    outputs: "GLB + STL",
    accent: "from-[#7c3aed]/20 to-transparent",
  },
];

export function EnginesSection() {
  return (
    <section id="engines" className="relative scroll-mt-20 border-y border-border-subtle bg-bg-surface/40 px-6 py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Engines"
          title="Pick the right engine for each model"
          subtitle="Switch engines from the workspace dropdown. Every result is converted to STL so it's ready to print."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {ENGINES.map((engine, i) => (
            <motion.div
              key={engine.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card relative overflow-hidden p-6"
            >
              <div className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${engine.accent}`} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle bg-bg-surface">
                    <engine.icon className="h-5 w-5 text-neon-green" />
                  </div>
                  <span className="meta-pill text-[11px]">{engine.tag}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-text-primary">{engine.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{engine.body}</p>
                <div className="mt-5 border-t border-border-subtle pt-4 text-xs text-text-muted">
                  Output <span className="ml-1 font-semibold text-text-primary">{engine.outputs}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
