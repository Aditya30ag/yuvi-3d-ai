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
      title: "Upload Your Image",
      desc: "Drag and drop a PNG, JPG, or WebP image (up to 20MB) into Studio3D's Image to 3D tool.",
      renderVisual: () => (
        <div className="mt-6 flex flex-col gap-3">
          <div className="rounded-xl border-2 border-dashed border-[#2a2a2a] bg-[#080808] p-6 text-center transition-colors hover:border-white/30">
            <Upload className="mx-auto h-6 w-6 text-white opacity-80 mb-2" />
            <p className="text-xs text-[#555555]">
              Drag and drop image here to upload
            </p>
            <p className="text-[10px] text-[#333333] mt-1">
              Supported: .png / .jpg / .webp · Max 20MB
            </p>
          </div>

          <div className="rounded-xl border border-[#1f1f1f] bg-[#121212] p-2.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-[10px] text-white font-bold shrink-0">
                2D
              </div>
              <span className="text-xs text-zinc-200 truncate">
                Adventurer&apos;s Backpack
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] bg-[#1a1a1a] text-[#888888] px-2 py-0.5 rounded border border-[#2a2a2a]">
                Meshy 7
              </span>
              <span className="text-[11px] bg-white text-black font-semibold px-2.5 py-1 rounded-md">
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
      title: "Generate Your 3D Model",
      desc: "Click Generate and Studio3D turns your image into a fully textured 3D model in about a minute.",
      renderVisual: () => (
        <div className="mt-6 rounded-xl border border-[#1f1f1f] bg-[#080808] p-3 flex flex-col gap-2">
          {/* Active Generation Card with Shimmering Progress Bar */}
          <div className="rounded-lg border border-white/20 bg-[#141414] p-3">
            <div className="flex items-center justify-between text-xs mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span className="font-medium text-white text-xs">
                  Adventurer&apos;s Backpack
                </span>
              </div>
              <span className="text-white font-mono text-xs">23%</span>
            </div>
            {/* Shimmer progress bar */}
            <div className="relative w-full h-1.5 rounded-full bg-[#1e1e24] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-white to-zinc-300 rounded-full"
                style={{ width: "23%" }}
              />
              <div className="absolute inset-0 bg-white/20 animate-shimmer" />
            </div>
            <p className="text-[10px] text-[#666666] mt-2 flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#555555]" />
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
                className="flex items-center justify-between rounded-lg bg-[#0e0e0e] border border-[#191919] px-2.5 py-1.5 text-xs"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-[#1c1c1c] flex items-center justify-center text-[10px] text-zinc-400">
                    3D
                  </div>
                  <span className="text-[#888888]">{item.name}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#555555]">
                  <span>{item.time}</span>
                  <span className="text-zinc-400 bg-[#161616] px-1.5 py-0.5 rounded">
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
      title: "Download & Use",
      desc: "Download your 3D model in FBX, OBJ, GLB, USDZ, STL for any 3D workflow.",
      renderVisual: () => (
        <div className="mt-6 rounded-xl border border-[#1f1f1f] bg-[#080808] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[#888888]">
                Export Format
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/30 px-1.5 py-0.5 rounded">
                Mesh Verified
              </span>
            </div>

            {/* Format Pills Grid */}
            <div className="grid grid-cols-3 gap-2">
              {formats.map((fmt) => {
                const isActive = selectedFormat === fmt;
                return (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`rounded px-3 py-1.5 text-xs font-mono font-medium transition-colors ${
                      isActive
                        ? "border border-violet-500 text-white bg-white/10"
                        : "bg-[#141414] border border-[#2a2a2a] text-[#888888] hover:border-[#3a3a3a] hover:text-white"
                    }`}
                  >
                    {fmt}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-[#666666]">
              <span>Geometry: Quad/Triangle</span>
              <span>Textures: PBR Maps 4K</span>
            </div>
          </div>

          <button className="mt-5 w-full rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium py-2.5 text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-violet-950/30">
            <Download className="w-3.5 h-3.5" />
            Download {selectedFormat.toUpperCase()} Model
          </button>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="bg-black py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-white">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 tracking-tight">
            How to Convert an Image to a 3D Model
          </h2>
        </motion.div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative bg-[#0d0d0d] rounded-2xl border border-[#1f1f1f] p-8 flex flex-col justify-between overflow-hidden group hover:border-[#2a2a2a] transition-all"
              >
                {/* Huge Background Step Number */}
                <span className="absolute top-6 right-6 text-6xl font-black text-[#1a1a1a] select-none pointer-events-none group-hover:text-[#222222] transition-colors">
                  {step.num}
                </span>

                <div>
                  <div className="w-12 h-12 rounded-xl bg-violet-950/40 border border-violet-800/30 flex items-center justify-center text-white">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mt-5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#888888] mt-2 leading-relaxed">
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
    </section>
  );
}
