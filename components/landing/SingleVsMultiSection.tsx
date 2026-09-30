"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Camera, Layers, CheckCircle } from "lucide-react";

export function SingleVsMultiSection() {
  const [activeTab, setActiveTab] = useState<"single" | "multi">("single");

  return (
    <section id="single-vs-multi" className="relative bg-bg-base py-24 lg:py-32 overflow-hidden border-y border-border-subtle transition-colors">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[500px] bg-gradient-to-r from-neon-green/10 to-neon-blue/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="section-label mb-3">
            Comparison Guide
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight mt-2">
            Single Image or Multi-view: Which Should You Use?
          </h2>
          <p className="text-base sm:text-lg text-text-secondary mt-4 max-w-2xl mx-auto">
            Start with one photo, or capture the same object from up to 4 angles.
          </p>

          {/* Tab Toggle */}
          <div className="mt-10 inline-flex items-center gap-1.5 p-1.5 rounded-xl bg-bg-surface border border-border-subtle backdrop-blur-[16px] shadow-sm">
            <button
              onClick={() => setActiveTab("single")}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                activeTab === "single"
                  ? "btn-primary shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Single Image
            </button>
            <button
              onClick={() => setActiveTab("multi")}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                activeTab === "multi"
                  ? "btn-primary shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Multi-view
            </button>
          </div>
        </motion.div>

        {/* Tab Content Display */}
        <div className="mt-12 max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === "single" ? (
              <motion.div
                key="single"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-card overflow-hidden grid grid-cols-1 lg:grid-cols-2"
              >
                {/* Left Half: Copy & CTA */}
                <div className="p-8 sm:p-12 flex flex-col justify-between">
                  <div>
                    <span className="badge-cyan">
                      Upload Image
                    </span>
                    <h3 className="card-title text-2xl sm:text-3xl font-bold mt-3">
                      One Photo, One Model
                    </h3>
                    <p className="text-sm sm:text-base text-text-secondary mt-4 leading-relaxed">
                      Upload a single image and Studio3D rebuilds it as a fully
                      textured 3D model in about a minute — the fastest path from
                      photo to 3D, ideal for symmetric or front-facing subjects.
                    </p>

                    <div className="mt-6 space-y-2.5">
                      <div className="flex items-center gap-2.5 text-xs text-text-primary">
                        <CheckCircle className="w-4 h-4 text-neon-green" />
                        <span>Instant 60-second generation turnaround</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-text-primary">
                        <CheckCircle className="w-4 h-4 text-neon-green" />
                        <span>AI predictive depth reconstruction for back surfaces</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-text-primary">
                        <CheckCircle className="w-4 h-4 text-neon-green" />
                        <span>Optimized for characters, props, assets, and icons</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/workspace"
                      className="btn-primary group inline-flex items-center gap-2 px-6 py-3 text-sm font-bold shadow-lg"
                    >
                      <span>Convert to 3D Now</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#050508]" />
                    </Link>
                  </div>
                </div>

                {/* Right Half: Studio Workspace UI Mockup */}
                <div className="bg-bg-surface-secondary/30 border-t lg:border-t-0 lg:border-l border-border-subtle p-6 flex flex-col justify-center">
                  <div className="rounded-[16px] border border-border-subtle bg-bg-surface backdrop-blur-[16px] overflow-hidden shadow-sm">
                    {/* Workspace Top Toolbar */}
                    <div className="bg-bg-surface-secondary/70 px-3 py-2 border-b border-border-subtle flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                        <span className="text-[11px] text-text-primary font-mono font-medium">
                          Single-Image Mode
                        </span>
                      </div>
                      <span className="text-[10px] text-text-muted">Meshy 7 Core</span>
                    </div>

                    <div className="grid grid-cols-2 divide-x divide-border-subtle min-h-[220px]">
                      {/* Left sub-panel: Upload zone with preview */}
                      <div className="p-3 bg-bg-surface flex flex-col justify-between">
                        <span className="text-[10px] uppercase tracking-wider text-text-muted font-medium">
                          Source 2D
                        </span>
                        <div className="my-auto aspect-square rounded-[12px] border border-border-subtle bg-gradient-to-tr from-neon-green/10 to-neon-blue/10 p-2 flex flex-col items-center justify-center">
                          <div className="w-12 h-12 rounded-lg bg-bg-surface border border-border-subtle flex items-center justify-center shadow-xs">
                            <span className="text-text-primary text-xs font-bold">2D</span>
                          </div>
                          <span className="text-[10px] text-text-primary mt-2 truncate w-full text-center font-medium">
                            knight_concept.png
                          </span>
                        </div>
                        <span className="text-[9px] text-text-muted text-center">
                          Ready for inference
                        </span>
                      </div>

                      {/* Right sub-panel: 3D model viewport */}
                      <div className="p-3 bg-bg-surface-secondary/40 flex flex-col justify-between relative overflow-hidden">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-wider text-text-muted font-medium">
                            3D Result
                          </span>
                          <span className="badge-cyan">
                            Done
                          </span>
                        </div>
                        <div className="my-auto flex flex-col items-center justify-center">
                          {/* Stylized 3D mesh wire cube */}
                          <div className="w-16 h-16 rounded-[14px] border border-neon-green/40 bg-gradient-to-tr from-neon-green/20 to-neon-blue/20 flex items-center justify-center shadow-md">
                            <Layers className="w-8 h-8 text-[#0284c7] dark:text-[#00c3ff]" />
                          </div>
                          <span className="text-[10px] text-text-primary mt-2 font-mono font-medium">
                            knight_mesh.glb
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[9px] text-text-muted">
                          <span>520K Tris</span>
                          <span className="text-neon-blue font-medium">PBR 4K</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="multi"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-card overflow-hidden grid grid-cols-1 lg:grid-cols-2"
              >
                {/* Left Half: Copy & CTA */}
                <div className="p-8 sm:p-12 flex flex-col justify-between">
                  <div>
                    <span className="badge-cyan">
                      Multiple Images to 3D
                    </span>
                    <h3 className="card-title text-2xl sm:text-3xl font-bold mt-3">
                      4 Angles, Maximum Accuracy
                    </h3>
                    <p className="text-sm sm:text-base text-text-secondary mt-4 leading-relaxed">
                      Upload up to 4 angles (Front, Back, Left, Right) to reconstruct
                      complex, non-symmetrical models with zero hallucination on
                      obscured sides. Perfect for real-world products and photogrammetry.
                    </p>

                    <div className="mt-6 space-y-2.5">
                      <div className="flex items-center gap-2.5 text-xs text-text-primary">
                        <CheckCircle className="w-4 h-4 text-neon-green" />
                        <span>Multi-angle fusion with automatic alignment</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-text-primary">
                        <CheckCircle className="w-4 h-4 text-neon-green" />
                        <span>Zero backside blind spots or texture stretching</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-text-primary">
                        <CheckCircle className="w-4 h-4 text-neon-green" />
                        <span>Ideal for industrial prototypes & precision 3D printing</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/workspace"
                      className="btn-primary group inline-flex items-center gap-2 px-6 py-3 text-sm font-bold shadow-lg"
                    >
                      <span>Try Multi-view Now</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#050508]" />
                    </Link>
                  </div>
                </div>

                {/* Right Half: Multi-view 2x2 Grid Mockup */}
                <div className="bg-bg-surface-secondary/30 border-t lg:border-t-0 lg:border-l border-border-subtle p-6 flex flex-col justify-center">
                  <div className="rounded-[16px] border border-border-subtle bg-bg-surface backdrop-blur-[16px] p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="font-semibold text-text-primary">
                        Multi-view Input Slots
                      </span>
                      <span className="badge-cyan">
                        4 Angles Loaded
                      </span>
                    </div>

                    {/* 2x2 Image Slot Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Front View", tag: "0°", color: "from-neon-green/5 to-neon-blue/5" },
                        { label: "Back View", tag: "180°", color: "from-neon-blue/5 to-neon-purple/5" },
                        { label: "Left View", tag: "270°", color: "from-neon-purple/5 to-neon-green/5" },
                        { label: "Right View", tag: "90°", color: "from-neon-blue/5 to-neon-green/5" },
                      ].map((slot, idx) => (
                        <div
                          key={idx}
                          className={`rounded-[12px] border border-border-subtle bg-gradient-to-br ${slot.color} p-3 flex flex-col justify-between h-28 relative overflow-hidden backdrop-blur-md shadow-xs`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-text-primary">
                              {slot.label}
                            </span>
                            <span className="text-[9px] text-text-muted font-mono">
                              {slot.tag}
                            </span>
                          </div>
                          <div className="flex items-center justify-center my-auto">
                            <Camera className="w-5 h-5 text-text-muted" />
                          </div>
                          <div className="flex items-center justify-between text-[9px] text-text-muted">
                            <span>Angle {idx + 1}</span>
                            <span className="text-neon-green font-medium">Aligned ✓</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
