"use client";

import { motion } from "framer-motion";
import { Download, Upload, Wand2 } from "lucide-react";

const STEPS = [
  {
    icon: Upload,
    title: "Upload a photo",
    body: "Drop in a single JPG, PNG, WebP or GIF up to 10 MB. A clear shot of one object on a plain background works best.",
    chips: [".jpg", ".png", ".webp", ".gif"],
  },
  {
    icon: Wand2,
    title: "Pick an engine",
    body: "Choose the AI engine that fits the job and add a short description so you can find the design later.",
    chips: ["Hyperbolic", "TRELLIS", "Tripo"],
  },
  {
    icon: Download,
    title: "Preview & download",
    body: "Watch the status update live, spin the model in 3D, then download an STL that's ready for your slicer.",
    chips: [".stl", ".glb preview"],
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative scroll-mt-20 px-6 py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="How it works"
          title="From photo to printable file in three steps"
          subtitle="Everything runs in the browser. Your designs are saved to your account so you can come back to them anytime."
        />

        <div className="relative mt-14 grid gap-5 md:grid-cols-3">
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-11 hidden h-px bg-gradient-to-r from-transparent via-border-secondary to-transparent md:block" />
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card relative p-6"
            >
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-[#00ffa3] to-[#00c3ff] shadow-[0_0_20px_rgba(0,255,163,0.25)]">
                  <step.icon className="h-5 w-5 text-[#050508]" />
                </div>
                <span className="text-xs font-semibold tracking-wider text-text-muted">STEP {i + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-text-primary">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.body}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {step.chips.map((chip) => (
                  <span key={chip} className="meta-pill text-[11px]">
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl text-center"
    >
      <div className="section-label mb-3">{label}</div>
      <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-text-secondary">{subtitle}</p>}
    </motion.div>
  );
}
