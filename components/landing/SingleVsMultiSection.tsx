"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Camera, Layers, CheckCircle } from "lucide-react";

export function SingleVsMultiSection() {
  const [activeTab, setActiveTab] = useState<"single" | "multi">("single");

  return (
    <section id="single-vs-multi" className="bg-[#050505] py-24 lg:py-32 border-y border-[#111111]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Single Image or Multi-view: Which Should You Use?
          </h2>
          <p className="text-base sm:text-lg text-[#888888] mt-4 max-w-2xl mx-auto">
            Start with one photo, or capture the same object from up to 4 angles.
          </p>

          {/* Tab Toggle */}
          <div className="mt-10 inline-flex items-center gap-2 p-1 rounded-xl bg-[#0e0e0e] border border-[#222222]">
            <button
              onClick={() => setActiveTab("single")}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "single"
                  ? "bg-white text-black shadow-sm"
                  : "bg-[#111111] text-[#888888] hover:text-white"
              }`}
            >
              Single Image
            </button>
            <button
              onClick={() => setActiveTab("multi")}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "multi"
                  ? "bg-white text-black shadow-sm"
                  : "bg-[#111111] text-[#888888] hover:text-white"
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
                className="bg-[#0a0a0a] rounded-3xl border border-[#1f1f1f] overflow-hidden grid grid-cols-1 lg:grid-cols-2"
              >
                {/* Left Half: Copy & CTA */}
                <div className="p-8 sm:p-12 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-white uppercase tracking-widest font-semibold">
                      Upload Image
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mt-3">
                      One Photo, One Model
                    </h3>
                    <p className="text-sm sm:text-base text-[#888888] mt-4 leading-relaxed">
                      Upload a single image and Studio3D rebuilds it as a fully
                      textured 3D model in about a minute — the fastest path from
                      photo to 3D, ideal for symmetric or front-facing subjects.
                    </p>

                    <div className="mt-6 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-white" />
                        <span>Instant 60-second generation turnaround</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-white" />
                        <span>AI predictive depth reconstruction for back surfaces</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-white" />
                        <span>Optimized for characters, props, assets, and icons</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/workspace"
                      className="group inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-semibold shadow-md px-6 py-3 rounded-xl text-sm transition-colors"
                    >
                      <span>Convert to 3D Now</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Right Half: Studio Workspace UI Mockup */}
                <div className="bg-[#0f0f0f] border-t lg:border-t-0 lg:border-l border-[#1f1f1f] p-6 flex flex-col justify-center">
                  <div className="rounded-xl border border-[#222222] bg-[#141414] overflow-hidden shadow-inner">
                    {/* Workspace Top Toolbar */}
                    <div className="bg-[#1a1a1a] px-3 py-2 border-b border-[#262626] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-white" />
                        <span className="text-[11px] text-zinc-300 font-mono">
                          Single-Image Mode
                        </span>
                      </div>
                      <span className="text-[10px] text-[#666666]">Meshy 7 Core</span>
                    </div>

                    <div className="grid grid-cols-2 divide-x divide-[#222222] min-h-[220px]">
                      {/* Left sub-panel: Upload zone with preview */}
                      <div className="p-3 bg-[#0f0f0f] flex flex-col justify-between">
                        <span className="text-[10px] uppercase tracking-wider text-[#666666] font-medium">
                          Source 2D
                        </span>
                        <div className="my-auto aspect-square rounded-lg border border-[#262626] bg-gradient-to-tr from-amber-950/30 to-violet-950/20 p-2 flex flex-col items-center justify-center">
                          <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                            <span className="text-zinc-200 text-xs font-bold">2D</span>
                          </div>
                          <span className="text-[10px] text-zinc-400 mt-2 truncate w-full text-center">
                            knight_concept.png
                          </span>
                        </div>
                        <span className="text-[9px] text-[#555555] text-center">
                          Ready for inference
                        </span>
                      </div>

                      {/* Right sub-panel: 3D model viewport */}
                      <div className="p-3 bg-[#0d0d0d] flex flex-col justify-between relative overflow-hidden">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-wider text-[#666666] font-medium">
                            3D Result
                          </span>
                          <span className="text-[9px] text-emerald-400 bg-emerald-950/60 px-1 rounded">
                            Done
                          </span>
                        </div>
                        <div className="my-auto flex flex-col items-center justify-center">
                          {/* Stylized 3D mesh wire cube */}
                          <div className="w-16 h-16 rounded-xl border border-white/30 bg-gradient-to-tr from-white/20 to-neutral-700/20 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                            <Layers className="w-8 h-8 text-zinc-200" />
                          </div>
                          <span className="text-[10px] text-zinc-300 mt-2 font-mono">
                            knight_mesh.glb
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[9px] text-[#555555]">
                          <span>520K Tris</span>
                          <span className="text-white">PBR 4K</span>
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
                className="bg-[#0a0a0a] rounded-3xl border border-[#1f1f1f] overflow-hidden grid grid-cols-1 lg:grid-cols-2"
              >
                {/* Left Half: Copy & CTA */}
                <div className="p-8 sm:p-12 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-white uppercase tracking-widest font-semibold">
                      Multiple Images to 3D
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mt-3">
                      4 Angles, Maximum Accuracy
                    </h3>
                    <p className="text-sm sm:text-base text-[#888888] mt-4 leading-relaxed">
                      Upload up to 4 angles (Front, Back, Left, Right) to reconstruct
                      complex, non-symmetrical models with zero hallucination on
                      obscured sides. Perfect for real-world products and photogrammetry.
                    </p>

                    <div className="mt-6 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-white" />
                        <span>Multi-angle fusion with automatic alignment</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-white" />
                        <span>Zero backside blind spots or texture stretching</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-white" />
                        <span>Ideal for industrial prototypes & precision 3D printing</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/workspace"
                      className="group inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-semibold shadow-md px-6 py-3 rounded-xl text-sm transition-colors"
                    >
                      <span>Try Multi-view Now</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Right Half: Multi-view 2x2 Grid Mockup */}
                <div className="bg-[#0f0f0f] border-t lg:border-t-0 lg:border-l border-[#1f1f1f] p-6 flex flex-col justify-center">
                  <div className="rounded-xl border border-[#222222] bg-[#141414] p-4">
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="font-semibold text-zinc-300">
                        Multi-view Input Slots
                      </span>
                      <span className="text-[10px] text-white bg-white/10 border border-white/20 px-2 py-0.5 rounded">
                        4 Angles Loaded
                      </span>
                    </div>

                    {/* 2x2 Image Slot Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Front View", tag: "0°", color: "from-neutral-900 to-neutral-800" },
                        { label: "Back View", tag: "180°", color: "from-purple-900/30 to-indigo-900/20" },
                        { label: "Left View", tag: "270°", color: "from-teal-900/30 to-blue-900/20" },
                        { label: "Right View", tag: "90°", color: "from-emerald-900/30 to-cyan-900/20" },
                      ].map((slot, idx) => (
                        <div
                          key={idx}
                          className={`rounded-lg border border-[#262626] bg-gradient-to-br ${slot.color} p-3 flex flex-col justify-between h-28 relative overflow-hidden`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-zinc-300">
                              {slot.label}
                            </span>
                            <span className="text-[9px] text-[#777777] font-mono">
                              {slot.tag}
                            </span>
                          </div>
                          <div className="flex items-center justify-center my-auto">
                            <Camera className="w-5 h-5 text-zinc-400 opacity-60" />
                          </div>
                          <div className="flex items-center justify-between text-[9px] text-[#888888]">
                            <span>Angle {idx + 1}</span>
                            <span className="text-emerald-400">Aligned ✓</span>
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
