"use client";

import { motion } from "framer-motion";

export function SharpEdgesSection() {
  const cards = [
    {
      title: "Smart Topology",
      renderShape: () => (
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-violet-400 drop-shadow-[0_0_12px_rgba(124,58,237,0.4)]">
          <polygon
            points="50,15 85,35 85,75 50,95 15,75 15,35"
            fill="rgba(124,58,237,0.15)"
            stroke="#a78bfa"
            strokeWidth="1.5"
          />
          {/* Wireframe facets */}
          <line x1="50" y1="15" x2="50" y2="95" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="15" y1="35" x2="85" y2="75" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="15" y1="75" x2="85" y2="35" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="50" cy="55" r="4" fill="#c4b5fd" />
        </svg>
      ),
    },
    {
      title: "Auto Split",
      renderShape: () => (
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-orange-400 drop-shadow-[0_0_12px_rgba(249,115,22,0.4)]">
          {/* Top segment */}
          <path d="M25 35 L50 20 L75 35 L50 45 Z" fill="#ea580c" opacity="0.8" stroke="#fb923c" strokeWidth="1.5" />
          {/* Middle segment floating */}
          <path d="M22 55 L50 40 L78 55 L50 67 Z" fill="#f97316" opacity="0.6" stroke="#fdba74" strokeWidth="1.5" />
          {/* Bottom segment */}
          <path d="M20 75 L50 62 L80 75 L50 88 Z" fill="#9a3412" opacity="0.9" stroke="#ea580c" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      title: "Clean Geometry",
      renderShape: () => (
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-zinc-300 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
          <circle cx="50" cy="50" r="35" fill="#18181b" stroke="#71717a" strokeWidth="1.5" />
          <ellipse cx="50" cy="50" rx="35" ry="14" fill="none" stroke="#a1a1aa" strokeWidth="1" />
          <ellipse cx="50" cy="50" rx="14" ry="35" fill="none" stroke="#a1a1aa" strokeWidth="1" />
          <line x1="15" y1="50" x2="85" y2="50" stroke="#d4d4d8" strokeWidth="1" />
          <line x1="50" y1="15" x2="50" y2="85" stroke="#d4d4d8" strokeWidth="1" />
        </svg>
      ),
    },
    {
      title: "Sharp Details",
      renderShape: () => (
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-teal-400 drop-shadow-[0_0_12px_rgba(45,212,191,0.4)]">
          {/* Angular faceted crystal / creature silhouette */}
          <polygon
            points="50,12 70,35 85,60 68,85 50,92 32,85 15,60 30,35"
            fill="rgba(20,184,166,0.15)"
            stroke="#2dd4bf"
            strokeWidth="1.5"
          />
          <polygon points="50,12 60,45 50,75 40,45" fill="rgba(45,212,191,0.3)" stroke="#5eead4" strokeWidth="1" />
          <polygon points="50,75 68,85 50,92 32,85" fill="#0f766e" />
          <circle cx="50" cy="45" r="3" fill="#99f6e4" />
        </svg>
      ),
    },
    {
      title: "Precise Topology",
      renderShape: () => (
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-amber-500 drop-shadow-[0_0_12px_rgba(217,119,6,0.3)]">
          {/* Cylinder trunk topology with cross contours */}
          <ellipse cx="50" cy="25" rx="30" ry="10" fill="rgba(180,83,9,0.2)" stroke="#f59e0b" strokeWidth="1.5" />
          <ellipse cx="50" cy="50" rx="27" ry="9" fill="none" stroke="#d97706" strokeWidth="1" strokeDasharray="3 3" />
          <ellipse cx="50" cy="75" rx="28" ry="9.5" fill="rgba(120,53,15,0.4)" stroke="#b45309" strokeWidth="1.5" />
          <line x1="20" y1="25" x2="22" y2="75" stroke="#f59e0b" strokeWidth="1.5" />
          <line x1="80" y1="25" x2="78" y2="75" stroke="#f59e0b" strokeWidth="1.5" />
          <line x1="50" y1="35" x2="50" y2="85" stroke="#fbbf24" strokeWidth="1" />
        </svg>
      ),
    },
  ];

  return (
    <section id="sharp-edges" className="bg-[#050505] py-24 lg:py-32 border-y border-[#111111]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Sharp and Well-Defined Edges
          </h2>
          <p className="text-base sm:text-lg text-[#888888] max-w-xl mx-auto mt-4 leading-relaxed">
            Bring your creations to life with sharp, clear edges that add depth and
            realism.
          </p>
        </motion.div>

        {/* 5-Card Horizontal Scrollable Row */}
        <div className="mt-16 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex justify-start lg:justify-center items-center gap-4 min-w-max px-2">
            {cards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl aspect-square w-56 flex-shrink-0 flex flex-col justify-between overflow-hidden hover:border-[#2a2a2a] transition-all"
              >
                {/* Decorative Grid Dot Pattern Background */}
                <div
                  className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity"
                  style={{
                    backgroundImage:
                      "radial-gradient(#222222 1px, transparent 1px)",
                    backgroundSize: "12px 12px",
                  }}
                />

                {/* Top Subtle Status Badge */}
                <div className="relative z-10 p-3 flex justify-between items-center text-[10px] text-[#555555]">
                  <span className="font-mono">M7-EDGE</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500/60" />
                </div>

                {/* Center Geometric Shape */}
                <div className="relative z-10 my-auto flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
                  {card.renderShape()}
                </div>

                {/* Bottom Label */}
                <div className="relative z-10 pb-4 text-center">
                  <span className="text-xs text-white font-medium block">
                    {card.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
