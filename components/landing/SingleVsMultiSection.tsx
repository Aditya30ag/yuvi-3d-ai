"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Camera, Layers, CheckCircle } from "lucide-react";

export function SingleVsMultiSection() {
  const [activeTab, setActiveTab] = useState<"single" | "multi">("single");

  return (
    <section id="single-vs-multi" className="relative bg-[#050508] py-24 lg:py-32 overflow-hidden border-y border-white/[0.06]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[500px] bg-gradient-to-r from-[#00ffa3]/10 to-[#00c3ff]/10 blur-[150px] rounded-full pointer-events-none" />

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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mt-2">
            Single Image or Multi-view: Which Should You Use?
          </h2>
          <p className="text-base sm:text-lg text-white/60 mt-4 max-w-2xl mx-auto">
            Start with one photo, or capture the same object from up to 4 angles.
          </p>

          {/* Tab Toggle */}
          <div className="mt-10 inline-flex items-center gap-1.5 p-1.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <button
              onClick={() => setActiveTab("single")}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === "single"
                  ? "btn-primary shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Single Image
            </button>
            <button
              onClick={() => setActiveTab("multi")}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === "multi"
                  ? "btn-primary shadow-md"
                  : "text-white/60 hover:text-white"
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
                    <p className="text-sm sm:text-base text-white/60 mt-4 leading-relaxed">
                      Upload a single image and Studio3D rebuilds it as a fully
                      textured 3D model in about a minute — the fastest path from
                      photo to 3D, ideal for symmetric or front-facing subjects.
                    </p>

                    <div className="mt-6 space-y-2.5">
                      <div className="flex items-center gap-2.5 text-xs text-white/80">
                        <CheckCircle className="w-4 h-4 text-[#00ffa3]" />
                        <span>Instant 60-second generation turnaround</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-white/80">
                        <CheckCircle className="w-4 h-4 text-[#00ffa3]" />
                        <span>AI predictive depth reconstruction for back surfaces</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-white/80">
                        <CheckCircle className="w-4 h-4 text-[#00ffa3]" />
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
                <div className="bg-white/[0.02] border-t lg:border-t-0 lg:border-l border-white/10 p-6 flex flex-col justify-center">
                  <div className="rounded-[16px] border border-white/10 bg-white/[0.03] backdrop-blur-[16px] overflow-hidden shadow-inner">
                    {/* Workspace Top Toolbar */}
                    <div className="bg-white/[0.04] px-3 py-2 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00ffa3] animate-pulse" />
                        <span className="text-[11px] text-white/80 font-mono">
                          Single-Image Mode
                        </span>
                      </div>
                      <span className="text-[10px] text-white/50">Meshy 7 Core</span>
                    </div>

                    <div className="grid grid-cols-2 divide-x divide-white/10 min-h-[220px]">
                      {/* Left sub-panel: Upload zone with preview */}
                      <div className="p-3 bg-white/[0.01] flex flex-col justify-between">
                        <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
                          Source 2D
                        </span>
                        <div className="my-auto aspect-square rounded-[12px] border border-white/10 bg-gradient-to-tr from-[#00ffa3]/15 to-[#00c3ff]/15 p-2 flex flex-col items-center justify-center">
                          <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">2D</span>
                          </div>
                          <span className="text-[10px] text-white/70 mt-2 truncate w-full text-center">
                            knight_concept.png
                          </span>
                        </div>
                        <span className="text-[9px] text-white/40 text-center">
                          Ready for inference
                        </span>
                      </div>

                      {/* Right sub-panel: 3D model viewport */}
                      <div className="p-3 bg-white/[0.02] flex flex-col justify-between relative overflow-hidden">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
                            3D Result
                          </span>
                          <span className="badge-cyan">
                            Done
                          </span>
                        </div>
                        <div className="my-auto flex flex-col items-center justify-center">
                          {/* Stylized 3D mesh wire cube */}
                          <div className="w-16 h-16 rounded-[14px] border border-[#00ffa3]/40 bg-gradient-to-tr from-[#00ffa3]/20 to-[#00c3ff]/20 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,163,0.3)]">
                            <Layers className="w-8 h-8 text-[#00c3ff]" />
                          </div>
                          <span className="text-[10px] text-white/80 mt-2 font-mono">
                            knight_mesh.glb
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[9px] text-white/40">
                          <span>520K Tris</span>
                          <span className="text-[#00c3ff]">PBR 4K</span>
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
                    <p className="text-sm sm:text-base text-white/60 mt-4 leading-relaxed">
                      Upload up to 4 angles (Front, Back, Left, Right) to reconstruct
                      complex, non-symmetrical models with zero hallucination on
                      obscured sides. Perfect for real-world products and photogrammetry.
                    </p>

                    <div className="mt-6 space-y-2.5">
                      <div className="flex items-center gap-2.5 text-xs text-white/80">
                        <CheckCircle className="w-4 h-4 text-[#00ffa3]" />
                        <span>Multi-angle fusion with automatic alignment</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-white/80">
                        <CheckCircle className="w-4 h-4 text-[#00ffa3]" />
                        <span>Zero backside blind spots or texture stretching</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-white/80">
                        <CheckCircle className="w-4 h-4 text-[#00ffa3]" />
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
                <div className="bg-white/[0.02] border-t lg:border-t-0 lg:border-l border-white/10 p-6 flex flex-col justify-center">
                  <div className="rounded-[16px] border border-white/10 bg-white/[0.03] backdrop-blur-[16px] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="font-semibold text-white/90">
                        Multi-view Input Slots
                      </span>
                      <span className="badge-cyan">
                        4 Angles Loaded
                      </span>
                    </div>

                    {/* 2x2 Image Slot Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Front View", tag: "0°", color: "from-white/[0.03] to-[#00ffa3]/10" },
                        { label: "Back View", tag: "180°", color: "from-white/[0.03] to-[#00c3ff]/10" },
                        { label: "Left View", tag: "270°", color: "from-white/[0.03] to-[#6300ff]/10" },
                        { label: "Right View", tag: "90°", color: "from-white/[0.03] to-[#00c3ff]/10" },
                      ].map((slot, idx) => (
                        <div
                          key={idx}
                          className={`rounded-[12px] border border-white/10 bg-gradient-to-br ${slot.color} p-3 flex flex-col justify-between h-28 relative overflow-hidden backdrop-blur-md`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-white/80">
                              {slot.label}
                            </span>
                            <span className="text-[9px] text-white/40 font-mono">
                              {slot.tag}
                            </span>
                          </div>
                          <div className="flex items-center justify-center my-auto">
                            <Camera className="w-5 h-5 text-white/50" />
                          </div>
                          <div className="flex items-center justify-between text-[9px] text-white/50">
                            <span>Angle {idx + 1}</span>
                            <span className="text-[#00ffa3]">Aligned ✓</span>
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
