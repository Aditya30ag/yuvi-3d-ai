"use client";

import { motion } from "framer-motion";
import { Upload, Zap, Download, Clock } from "lucide-react";
import { useState } from "react";

export function HowItWorksSection() {
  const [selectedFormat, setSelectedFormat] = useState(".glb");
  const formats = [".fbx", ".obj", ".glb", ".usdz", ".stl", ".blend"];

  const steps = [
    {
      num: "01",
      icon: Upload,
      chipClass: "icon-chip blue",
      title: "Upload Your Image",
      desc: "Drag and drop a PNG, JPG, or WebP image (up to 20MB) into Studio3D's Image to 3D tool.",
      renderVisual: () => (
        <div className="mt-6 flex flex-col gap-3">
          <div className="rounded-[16px] border-2 border-dashed border-white/15 bg-white/[0.03] backdrop-blur-[16px] p-6 text-center transition-colors hover:border-[#00ffa3]/50">
            <Upload className="mx-auto h-6 w-6 text-[#00c3ff] opacity-90 mb-2" />
            <p className="text-xs text-white/60">
              Drag and drop image here to upload
            </p>
            <p className="text-[10px] text-white/40 mt-1">
              Supported: .png / .jpg / .webp · Max 20MB
            </p>
          </div>

          <div className="rounded-[16px] border border-white/10 bg-white/[0.04] backdrop-blur-[16px] p-2.5 flex items-center justify-between gap-2 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-md bg-gradient-to-r from-[#00ffa3] to-[#00c3ff] flex items-center justify-center text-[10px] text-[#050508] font-bold shrink-0">
                2D
              </div>
              <span className="text-xs text-white/90 truncate">
                Adventurer&apos;s Backpack
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] bg-white/[0.06] text-white/70 px-2 py-0.5 rounded border border-white/10">
                Meshy 7
              </span>
              <span className="btn-primary text-[11px] px-2.5 py-1">
                Generate
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: "02",
      icon: Zap,
      chipClass: "icon-chip green",
      title: "Generate Your 3D Model",
      desc: "Click Generate and Studio3D turns your image into a fully textured 3D model in about a minute.",
      renderVisual: () => (
        <div className="mt-6 rounded-[16px] border border-white/10 bg-white/[0.03] backdrop-blur-[16px] p-3.5 flex flex-col gap-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
          {/* Active Generation Card with Shimmering Progress Bar */}
          <div className="rounded-[12px] border border-[#00ffa3]/30 bg-white/[0.04] p-3">
            <div className="flex items-center justify-between text-xs mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00ffa3] animate-ping" />
                <span className="font-medium text-white text-xs">
                  Adventurer&apos;s Backpack
                </span>
              </div>
              <span className="text-[#00ffa3] font-mono text-xs font-semibold">23%</span>
            </div>
            {/* Shimmer progress bar */}
            <div className="relative w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00ffa3] to-[#00c3ff] rounded-full"
                style={{ width: "23%" }}
              />
              <div className="absolute inset-0 bg-white/20 animate-shimmer" />
            </div>
            <p className="text-[10px] text-white/50 mt-2 flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#00c3ff]" />
              Estimated time remaining: 42s
            </p>
          </div>

          {/* Previous finished cards */}
          <div className="space-y-1.5 pt-1">
            {[
              { name: "Wooden Tankard", time: "2m ago", badge: "GLB" },
              { name: "Potion Flask", time: "15m ago", badge: "OBJ" },
              { name: "Large Stone Axe", time: "1h ago", badge: "FBX" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg bg-white/[0.03] border border-white/10 px-2.5 py-1.5 text-xs"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-[10px] text-[#00c3ff]">
                    3D
                  </div>
                  <span className="text-white/70">{item.name}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-white/40">
                  <span>{item.time}</span>
                  <span className="text-white/80 bg-white/[0.06] border border-white/10 px-1.5 py-0.5 rounded">
                    {item.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      num: "03",
      icon: Download,
      chipClass: "icon-chip purple",
      title: "Download & Use",
      desc: "Download your 3D model in FBX, OBJ, GLB, USDZ, STL for any 3D workflow.",
      renderVisual: () => (
        <div className="mt-6 rounded-[16px] border border-white/10 bg-white/[0.03] backdrop-blur-[16px] p-4 flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-white/70">
                Export Format
              </span>
              <span className="badge-cyan">
                Mesh Verified
              </span>
            </div>

            {/* Format Pills Grid - Glassmorphism style */}
            <div className="grid grid-cols-3 gap-2">
              {formats.map((fmt) => {
                const isActive = selectedFormat === fmt;
                return (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`rounded-[16px] px-3 py-2 text-xs font-mono font-medium transition-all shadow-[0_4px_30px_rgba(0,0,0,0.4)] ${
                      isActive
                        ? "border border-[#00ffa3] text-[#00ffa3] bg-[#00ffa3]/10"
                        : "bg-white/[0.05] border border-white/10 backdrop-blur-[16px] text-white/70 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {fmt}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-white/50">
              <span>Geometry: Quad/Triangle</span>
              <span>Textures: PBR Maps 4K</span>
            </div>
          </div>

          <button
            className="btn-primary mt-5 w-full py-2.5 text-xs font-bold flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#050508]" />
            Download {selectedFormat.toUpperCase()} Model
          </button>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="relative bg-[#050508] py-24 lg:py-32 overflow-hidden">
      {/* Subtle ambient radial glow behind section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#00ffa3]/10 to-[#00c3ff]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="section-label mb-3">
            Simple Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 tracking-tight">
            How to Convert an Image to a 3D Model
          </h2>
        </motion.div>

        {/* 3 Step Cards Container with connecting line */}
        <div className="relative mt-16">
          {/* Subtle neon line connecting steps on large screens */}
          <div className="hidden lg:block absolute top-[52px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-[#00ffa3]/40 via-[#00c3ff]/40 to-[#6300ff]/30 z-0 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="glass-card relative p-8 flex flex-col justify-between overflow-hidden group transition-all duration-300"
                >
                  {/* Top Bar with Icon & Glowing Numbered Badge (Gradient Circle) */}
                  <div className="flex items-center justify-between mb-2">
                    <div className={`${step.chipClass} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Glowing numbered badge (gradient circle) */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00ffa3] to-[#00c3ff] flex items-center justify-center text-[#050508] font-bold text-sm shadow-[0_0_20px_rgba(0,255,163,0.45)]">
                      {step.num}
                    </div>
                  </div>

                  <div>
                    <h3 className="card-title text-xl font-semibold mt-4">
                      {step.title}
                    </h3>
                    <p className="text-sm text-white/60 mt-2 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Card Mockup Visual */}
                  {step.renderVisual()}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
