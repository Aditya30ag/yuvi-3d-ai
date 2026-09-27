"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Gamepad2, Box, Printer } from "lucide-react";

export function WorkflowsSection() {
  const workflows = [
    {
      title: "Game Development",
      icon: Gamepad2,
      desc: "Generate game-ready 3D assets from concept art or reference photos in seconds. Smart Topology outputs low-poly meshes for Unity, Unreal Engine, Blender, Godot and Maya.",
      topVisual: () => (
        <div className="h-48 w-full rounded-t-2xl bg-gradient-to-b from-neutral-800/40 to-[#0d0d0d] flex items-center justify-center relative overflow-hidden">
          {/* Animated floating pixel art shapes */}
          <div className="relative flex items-center justify-center w-full h-full">
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              {/* Pixel sword / character icon */}
              <div className="grid grid-cols-5 gap-1 p-2 bg-[#161616] border border-white/20 rounded-lg shadow-lg">
                <div className="w-2.5 h-2.5 bg-white" />
                <div className="w-2.5 h-2.5 bg-white" />
                <div className="w-2.5 h-2.5 bg-white" />
                <div className="w-2.5 h-2.5 bg-white" />
                <div className="w-2.5 h-2.5 bg-transparent" />

                <div className="w-2.5 h-2.5 bg-white" />
                <div className="w-2.5 h-2.5 bg-white" />
                <div className="w-2.5 h-2.5 bg-white" />
                <div className="w-2.5 h-2.5 bg-white" />
                <div className="w-2.5 h-2.5 bg-white" />

                <div className="w-2.5 h-2.5 bg-white" />
                <div className="w-2.5 h-2.5 bg-white" />
                <div className="w-2.5 h-2.5 bg-white" />
                <div className="w-2.5 h-2.5 bg-white" />
                <div className="w-2.5 h-2.5 bg-white" />

                <div className="w-2.5 h-2.5 bg-transparent" />
                <div className="w-2.5 h-2.5 bg-white" />
                <div className="w-2.5 h-2.5 bg-white" />
                <div className="w-2.5 h-2.5 bg-white" />
                <div className="w-2.5 h-2.5 bg-transparent" />
              </div>
              <span className="text-[10px] text-zinc-300 font-mono mt-2">
                Unity · Unreal · Blender
              </span>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      title: "Product Prototyping",
      icon: Box,
      desc: "Turn product photos into detailed 3D models for visualization, pitch decks, or review. Export GLB/OBJ/USDZ for CAD workflows and interactive configurators.",
      topVisual: () => (
        <div className="h-48 w-full rounded-t-2xl bg-gradient-to-b from-blue-900/30 to-[#0d0d0d] flex items-center justify-center relative overflow-hidden">
          <div className="relative flex items-center justify-center">
            {/* Isometric product box shapes */}
            <motion.div
              animate={{ rotateY: [0, 180, 360] }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="w-20 h-20 relative flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <svg viewBox="0 0 100 100" className="w-20 h-20 text-blue-400">
                {/* Isometric Top */}
                <polygon points="50,15 85,32 50,49 15,32" fill="#60a5fa" opacity="0.8" stroke="#93c5fd" strokeWidth="1" />
                {/* Isometric Left */}
                <polygon points="15,32 50,49 50,85 15,68" fill="#2563eb" opacity="0.9" stroke="#93c5fd" strokeWidth="1" />
                {/* Isometric Right */}
                <polygon points="50,49 85,32 85,68 50,85" fill="#1d4ed8" stroke="#93c5fd" strokeWidth="1" />
              </svg>
            </motion.div>
            <div className="absolute bottom-2 text-center">
              <span className="text-[10px] text-blue-300 font-mono">
                CAD · GLB · USDZ
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "3D Printing",
      icon: Printer,
      desc: "Convert any image into a print-ready 3D file with a 97% slicer pass rate. Export STL/3MF/OBJ for Bambu Studio, OrcaSlicer, Creality Print and more.",
      topVisual: () => (
        <div className="h-48 w-full rounded-t-2xl bg-gradient-to-b from-orange-900/30 to-[#0d0d0d] flex items-center justify-center relative overflow-hidden">
          <div className="flex flex-col items-center justify-center w-full px-8">
            {/* Horizontal layered lines simulating 3D print slicing */}
            <div className="w-32 flex flex-col gap-1.5 p-3 rounded-lg bg-[#14100c] border border-orange-500/30">
              <div className="h-1 w-full bg-orange-400/80 rounded" />
              <div className="h-1 w-11/12 mx-auto bg-orange-400/70 rounded" />
              <div className="h-1 w-10/12 mx-auto bg-orange-400/60 rounded" />
              <div className="h-1 w-9/12 mx-auto bg-orange-400/50 rounded" />
              <div className="h-1 w-7/12 mx-auto bg-orange-400/40 rounded animate-pulse" />
            </div>
            <span className="text-[10px] text-orange-300 font-mono mt-3">
              STL · 3MF · 97% Slicer Pass Rate
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="workflows" className="bg-black py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Built for Every 3D Workflow
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-16">
          {workflows.map((workflow, idx) => (
            <motion.div
              key={workflow.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col rounded-2xl border border-[#1f1f1f] bg-[#0d0d0d] overflow-hidden hover:border-[#2a2a2a] transition-all group"
            >
              {/* Top Graphic Panel */}
              {workflow.topVisual()}

              {/* Body Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between border-t border-[#1a1a1a]">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {workflow.title}
                  </h3>
                  <p className="text-sm text-[#888888] mt-3 leading-relaxed">
                    {workflow.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#181818]">
                  <Link
                    href="/workspace"
                    className="inline-flex items-center gap-1.5 text-white text-sm font-medium hover:text-zinc-300 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
