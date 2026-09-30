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
        <div className="h-48 w-full rounded-t-[20px] bg-gradient-to-b from-[#00ffa3]/15 to-transparent flex items-center justify-center relative overflow-hidden">
          {/* Animated floating pixel art shapes */}
          <div className="relative flex items-center justify-center w-full h-full">
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              {/* Pixel sword / character icon */}
              <div className="grid grid-cols-5 gap-1 p-2.5 bg-bg-surface/80 backdrop-blur-[16px] border border-border-subtle rounded-xl shadow-lg">
                <div className="w-2.5 h-2.5 bg-[#00c3ff]" />
                <div className="w-2.5 h-2.5 bg-[#00c3ff]" />
                <div className="w-2.5 h-2.5 bg-[#00c3ff]" />
                <div className="w-2.5 h-2.5 bg-[#00c3ff]" />
                <div className="w-2.5 h-2.5 bg-transparent" />

                <div className="w-2.5 h-2.5 bg-[#00c3ff]" />
                <div className="w-2.5 h-2.5 bg-white dark:bg-white bg-slate-300" />
                <div className="w-2.5 h-2.5 bg-white dark:bg-white bg-slate-300" />
                <div className="w-2.5 h-2.5 bg-[#00c3ff]" />
                <div className="w-2.5 h-2.5 bg-[#00c3ff]" />

                <div className="w-2.5 h-2.5 bg-[#00c3ff]" />
                <div className="w-2.5 h-2.5 bg-white dark:bg-white bg-slate-300" />
                <div className="w-2.5 h-2.5 bg-white dark:bg-white bg-slate-300" />
                <div className="w-2.5 h-2.5 bg-[#00ffa3]" />
                <div className="w-2.5 h-2.5 bg-[#00ffa3]" />

                <div className="w-2.5 h-2.5 bg-transparent" />
                <div className="w-2.5 h-2.5 bg-[#00c3ff]" />
                <div className="w-2.5 h-2.5 bg-[#00c3ff]" />
                <div className="w-2.5 h-2.5 bg-[#00ffa3]" />
                <div className="w-2.5 h-2.5 bg-transparent" />
              </div>
              <span className="text-[10px] text-text-muted font-mono mt-2.5">
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
        <div className="h-48 w-full rounded-t-[20px] bg-gradient-to-b from-[#00c3ff]/15 to-transparent flex items-center justify-center relative overflow-hidden">
          <div className="relative flex items-center justify-center">
            {/* Isometric product box shapes */}
            <motion.div
              animate={{ rotateY: [0, 180, 360] }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="w-20 h-20 relative flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <svg viewBox="0 0 100 100" className="w-20 h-20 text-[#00c3ff]">
                {/* Isometric Top */}
                <polygon points="50,15 85,32 50,49 15,32" fill="rgba(0,195,255,0.7)" opacity="0.8" stroke="#00c3ff" strokeWidth="1" />
                {/* Isometric Left */}
                <polygon points="15,32 50,49 50,85 15,68" fill="rgba(0,255,163,0.6)" opacity="0.9" stroke="#00ffa3" strokeWidth="1" />
                {/* Isometric Right */}
                <polygon points="50,49 85,32 85,68 50,85" fill="rgba(99,0,255,0.6)" stroke="#a78bfa" strokeWidth="1" />
              </svg>
            </motion.div>
            <div className="absolute bottom-2 text-center">
              <span className="badge-cyan">
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
        <div className="h-48 w-full rounded-t-[20px] bg-gradient-to-b from-[#00ffa3]/20 via-[#00c3ff]/10 to-transparent flex items-center justify-center relative overflow-hidden">
          <div className="flex flex-col items-center justify-center w-full px-8">
            {/* Horizontal layered lines simulating 3D print slicing */}
            <div className="w-32 flex flex-col gap-1.5 p-3 rounded-xl bg-bg-surface/80 backdrop-blur-[16px] border border-border-subtle">
              <div className="h-1 w-full bg-gradient-to-r from-[#00ffa3] to-[#00c3ff] rounded" />
              <div className="h-1 w-11/12 mx-auto bg-[#00c3ff]/90 rounded" />
              <div className="h-1 w-10/12 mx-auto bg-[#00ffa3]/75 rounded" />
              <div className="h-1 w-9/12 mx-auto bg-[#00c3ff]/60 rounded" />
              <div className="h-1 w-7/12 mx-auto bg-[#6300ff]/50 rounded animate-pulse" />
            </div>
            <span className="text-[10px] text-text-muted font-mono mt-3">
              STL · 3MF · 97% Slicer Pass Rate
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="workflows" className="relative bg-bg-base py-24 lg:py-32 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-[#00ffa3]/10 to-[#00c3ff]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="section-label mb-3">
            Versatile Output
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight mt-2">
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
              className="glass-card flex flex-col overflow-hidden group cursor-default"
            >
              {/* Top Graphic Panel */}
              {workflow.topVisual()}

              {/* Body Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between border-t border-border-subtle">
                <div>
                  <h3 className="card-title text-xl font-semibold group-hover:text-neon-green dark:group-hover:text-white transition-colors">
                    {workflow.title}
                  </h3>
                  <p className="text-sm text-text-muted mt-3 leading-relaxed">
                    {workflow.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border-subtle">
                  <Link
                    href="/workspace"
                    className="inline-flex items-center gap-1.5 text-neon-blue text-sm font-medium hover:text-neon-green transition-colors group-hover:translate-x-1 duration-200"
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
