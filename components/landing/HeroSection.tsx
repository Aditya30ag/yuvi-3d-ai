"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, RotateCw, Eye, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  const h1Words = [
    "Convert",
    "Photo",
    "to",
    "3D",
    "in",
    "a",
    "Minute",
  ];

  return (
    <section className="relative min-h-[calc(100vh-60px)] bg-bg-base py-20 lg:py-28 flex flex-col items-center justify-center text-center px-6 overflow-hidden transition-colors">
      {/* Background ambient lighting - green on left, blue on right */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-neon-green/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-neon-blue/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Badge Pill with animated live indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="live-pill mb-6"
      >
        <span className="dot" />
        <span className="text-xs font-semibold tracking-wide">
          Image to 3D
        </span>
      </motion.div>

      {/* H1 Title with word-by-word fade-in and gradient hero text effect */}
      <h1 className="hero-title text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.12] max-w-4xl mx-auto flex flex-wrap justify-center gap-x-3 gap-y-1">
        {h1Words.map((word, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: idx * 0.06 }}
            className="accent inline-block drop-shadow-[0_0_25px_rgba(0,255,163,0.25)]"
          >
            {word}
          </motion.span>
        ))}
      </h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto mt-6 leading-relaxed"
      >
        Generate 3D models from images online with high fidelity and ready to use
        for prototyping, gaming, and 3D printing. No expertise required. No
        software to download.
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="mt-8"
      >
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/workspace"
            className="btn-primary group inline-flex items-center gap-2.5 px-8 py-3.5 text-base font-bold shadow-xl"
          >
            <span>Convert to 3D Now</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#050508]" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Hero Visual Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative mt-16 w-full max-w-4xl mx-auto"
      >
        {/* Subtle radial glow behind card */}
        <div className="absolute -inset-4 bg-gradient-to-r from-neon-green/15 via-neon-blue/15 to-neon-purple/15 blur-3xl rounded-3xl pointer-events-none" />

        {/* Studio Window Card with Glowing Gradient Border & Glassmorphism */}
        <div className="hero-mock-border-glow">
          <div className="relative rounded-[20px] border border-border-subtle bg-bg-surface/95 backdrop-blur-[20px] shadow-2xl overflow-hidden text-left">
            {/* Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle bg-bg-surface-secondary/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-border-secondary" />
                  <div className="w-2.5 h-2.5 rounded-full bg-border-secondary" />
                  <div className="w-2.5 h-2.5 rounded-full bg-border-secondary" />
                </div>
                <span className="text-xs text-text-muted font-mono ml-2">
                  studio3d.ai/workspace/image-to-3d
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge-cyan flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#0284c7] dark:text-[#00c3ff]" />
                  Mesh Ready
                </span>
                <div className="h-3 w-px bg-border-subtle" />
                <span className="text-xs text-text-muted">Meshy 7 Engine</span>
              </div>
            </div>

            {/* Interface Workspace */}
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
              {/* Left Half: Choose 2D Image Panel (5 cols) */}
              <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-border-subtle p-5 flex flex-col justify-between bg-bg-surface-secondary/20">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="section-label">
                      Input 2D Reference
                    </span>
                    <span className="badge-cyan">
                      Selected
                    </span>
                  </div>

                  {/* Primary Selected Image Box */}
                  <div className="relative rounded-[16px] border border-border-subtle bg-bg-surface p-3 overflow-hidden group shadow-sm">
                    <div className="aspect-square w-full rounded-lg bg-gradient-to-tr from-neon-green/5 via-neon-blue/5 to-transparent flex items-center justify-center relative overflow-hidden border border-border-subtle">
                      {/* Stylized Warrior Silhouette Illustration */}
                      <svg
                        viewBox="0 0 100 100"
                        className="w-28 h-28 text-text-primary drop-shadow-md"
                        fill="currentColor"
                      >
                        {/* Hood / Helm */}
                        <path d="M50 15 C35 15, 30 28, 30 40 C30 52, 35 62, 50 62 C65 62, 70 52, 70 40 C70 28, 65 15, 50 15 Z" />
                        {/* Visor Glow */}
                        <ellipse cx="50" cy="38" rx="14" ry="4" fill="#00c3ff" />
                        {/* Mantle & Shoulders */}
                        <path d="M22 68 C30 58, 42 63, 50 63 C58 63, 70 58, 78 68 L84 88 C70 90, 30 90, 16 88 Z" fill="#94a3b8" opacity="0.8" />
                        {/* Chest Emblem */}
                        <polygon points="50,68 54,74 50,80 46,74" fill="#00ffa3" />
                      </svg>

                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-text-primary bg-bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-border-subtle shadow-sm">
                        <span className="truncate max-w-[120px]">hero_warrior.png</span>
                        <span className="text-text-muted">4.2 MB</span>
                      </div>
                    </div>
                  </div>

                  {/* Thumbnails Row */}
                  <div className="mt-4">
                    <span className="text-[11px] text-text-muted block mb-2 font-medium">
                      Recent Uploads
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="aspect-square rounded-lg border border-border-subtle bg-bg-surface p-1.5 flex flex-col justify-end relative cursor-pointer hover:border-neon-green/50 transition-colors shadow-sm">
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-5 h-5 rounded bg-bg-surface-secondary rotate-45 border border-border-subtle" />
                        </div>
                        <span className="text-[9px] text-text-muted truncate">shield_tan.png</span>
                      </div>
                      <div className="aspect-square rounded-lg border border-neon-green bg-neon-green/10 p-1.5 flex flex-col justify-end relative shadow-sm">
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-5 h-5 rounded-full bg-[#00c3ff]/40 border border-[#00c3ff]" />
                        </div>
                        <span className="text-[9px] text-text-primary truncate font-medium">hood_teal.png</span>
                      </div>
                      <div className="aspect-square rounded-lg border border-border-subtle bg-bg-surface p-1.5 flex flex-col justify-end relative cursor-pointer hover:border-neon-green/50 transition-colors shadow-sm">
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-6 h-1 bg-border-secondary -rotate-45" />
                        </div>
                        <span className="text-[9px] text-text-muted truncate">blade_axe.png</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs text-text-muted">
                  <span>Resolution: High (Meshy 7)</span>
                  <span className="text-neon-green font-mono font-medium">100% Geometry</span>
                </div>
              </div>

              {/* Right Half: Resulting 3D Model Viewer Mockup (7 cols) */}
              <div className="md:col-span-7 p-5 bg-bg-surface-secondary/10 relative flex flex-col justify-between overflow-hidden">
                {/* Top Viewport Controls */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-1.5 bg-bg-surface border border-border-subtle p-1 rounded-lg backdrop-blur-md shadow-sm">
                    <button className="text-[11px] px-2.5 py-0.5 rounded-md btn-primary font-bold flex items-center gap-1">
                      <Eye className="w-3 h-3 text-[#050508]" /> PBR
                    </button>
                    <button className="text-[11px] px-2 py-0.5 rounded text-text-muted hover:text-text-primary transition-colors">
                      Wireframe
                    </button>
                    <button className="text-[11px] px-2 py-0.5 rounded text-text-muted hover:text-text-primary transition-colors">
                      Solid
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-bg-surface border border-border-subtle px-2.5 py-1 rounded-lg text-xs text-text-secondary backdrop-blur-md shadow-sm">
                      <RotateCw className="w-3 h-3 text-[#0284c7] dark:text-[#00c3ff]" />
                      <span>360° View</span>
                    </div>
                  </div>
                </div>

                {/* 3D Model Visual Display */}
                <div className="my-auto py-8 relative flex items-center justify-center">
                  <div
                    className="absolute bottom-2 w-64 h-24 rounded-full opacity-40"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(0, 195, 255, 0.35) 0%, rgba(99, 0, 255, 0.25) 40%, transparent 70%)",
                      transform: "perspective(300px) rotateX(60deg)",
                    }}
                  />

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="relative w-44 h-52 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-r from-neon-green/15 via-neon-blue/15 to-neon-purple/15 blur-2xl rounded-full" />

                      <svg
                        viewBox="0 0 200 240"
                        className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.25)]"
                      >
                        <defs>
                          <linearGradient id="hoodGradHero" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="50%" stopColor="#00c3ff" />
                            <stop offset="100%" stopColor="#00ffa3" />
                          </linearGradient>
                          <linearGradient id="armorGradHero" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00c3ff" />
                            <stop offset="100%" stopColor="#050508" />
                          </linearGradient>
                        </defs>

                        <polygon points="40,90 100,50 160,90 170,210 30,210" fill="#0f172a" opacity="0.9" />

                        <path d="M35 120 L70 110 L55 170 L25 155 Z" fill="url(#armorGradHero)" stroke="#00c3ff" strokeWidth="1" />
                        <path d="M165 120 L130 110 L145 170 L175 155 Z" fill="url(#armorGradHero)" stroke="#00c3ff" strokeWidth="1" />

                        <polygon points="65,110 135,110 140,195 100,215 60,195" fill="url(#armorGradHero)" stroke="#00ffa3" strokeWidth="1.5" />
                        <polygon points="100,115 125,145 100,185 75,145" fill="#1e293b" />

                        <path
                          d="M100 20 C60 20 50 60 50 95 C50 120 70 135 100 135 C130 135 150 120 150 95 C150 60 140 20 100 20 Z"
                          fill="url(#hoodGradHero)"
                        />

                        <ellipse cx="100" cy="85" rx="36" ry="42" fill="#09090b" />

                        <path
                          d="M75 80 Q100 74 125 80 Q120 92 100 96 Q80 92 75 80 Z"
                          fill="#00ffa3"
                          className="drop-shadow-[0_0_10px_rgba(0,255,163,0.9)]"
                        />
                        <ellipse cx="88" cy="84" rx="3" ry="1.5" fill="#000000" />
                        <ellipse cx="112" cy="84" rx="3" ry="1.5" fill="#000000" />

                        <path
                          d="M100 20 L100 135 M50 95 L150 95 M65 55 L135 55 M75 125 L125 125"
                          stroke="#00c3ff"
                          strokeWidth="0.75"
                          strokeDasharray="2 3"
                          opacity="0.6"
                        />
                      </svg>

                      <div className="absolute top-2 right-2 w-8 h-8 rounded-full border border-border-subtle bg-bg-surface/90 backdrop-blur-md flex items-center justify-center text-[10px] font-mono text-text-primary shadow-sm">
                        <span>3D</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Viewer Status Footer */}
                <div className="flex items-center justify-between text-[11px] text-text-muted pt-3 border-t border-border-subtle">
                  <div className="flex items-center gap-3">
                    <span>Faces: <strong className="text-text-primary">584,210</strong></span>
                    <span>Vertices: <strong className="text-text-primary">294,180</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#0284c7] dark:text-[#00c3ff] font-medium">Export: .glb / .fbx / .obj</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
