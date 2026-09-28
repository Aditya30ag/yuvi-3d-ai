"use client";

import { motion } from "framer-motion";

export function SharpEdgesSection() {
  const cards = [
    {
      title: "Smart Topology",
      renderShape: () => (
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-[#00ffa3] drop-shadow-[0_0_12px_rgba(0,255,163,0.35)]">
          <polygon
            points="50,15 85,35 85,75 50,95 15,75 15,35"
            fill="rgba(0,255,163,0.12)"
            stroke="#00ffa3"
            strokeWidth="1.5"
          />
          {/* Wireframe facets */}
          <line x1="50" y1="15" x2="50" y2="95" stroke="#00c3ff" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="15" y1="35" x2="85" y2="75" stroke="#00c3ff" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="15" y1="75" x2="85" y2="35" stroke="#00c3ff" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="50" cy="55" r="4" fill="#00ffa3" />
        </svg>
      ),
    },
    {
      title: "Auto Split",
      renderShape: () => (
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-[#00c3ff] drop-shadow-[0_0_12px_rgba(0,195,255,0.35)]">
          {/* Top segment */}
          <path d="M25 35 L50 20 L75 35 L50 45 Z" fill="rgba(0,195,255,0.7)" opacity="0.9" stroke="#00c3ff" strokeWidth="1.5" />
          {/* Middle segment floating */}
          <path d="M22 55 L50 40 L78 55 L50 67 Z" fill="rgba(0,255,163,0.5)" opacity="0.8" stroke="#00ffa3" strokeWidth="1.5" />
          {/* Bottom segment */}
          <path d="M20 75 L50 62 L80 75 L50 88 Z" fill="rgba(99,0,255,0.7)" opacity="0.9" stroke="#a78bfa" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      title: "Clean Geometry",
      renderShape: () => (
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-zinc-200 drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]">
          <circle cx="50" cy="50" r="35" fill="rgba(255,255,255,0.04)" stroke="#00c3ff" strokeWidth="1.5" />
          <ellipse cx="50" cy="50" rx="35" ry="14" fill="none" stroke="#00ffa3" strokeWidth="1" />
          <ellipse cx="50" cy="50" rx="14" ry="35" fill="none" stroke="#00ffa3" strokeWidth="1" />
          <line x1="15" y1="50" x2="85" y2="50" stroke="#00c3ff" strokeWidth="1" />
          <line x1="50" y1="15" x2="50" y2="85" stroke="#00c3ff" strokeWidth="1" />
        </svg>
      ),
    },
    {
      title: "Sharp Details",
      renderShape: () => (
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-[#00ffa3] drop-shadow-[0_0_12px_rgba(0,255,163,0.35)]">
          {/* Angular faceted crystal / creature silhouette */}
          <polygon
            points="50,12 70,35 85,60 68,85 50,92 32,85 15,60 30,35"
            fill="rgba(0,255,163,0.12)"
            stroke="#00ffa3"
            strokeWidth="1.5"
          />
          <polygon points="50,12 60,45 50,75 40,45" fill="rgba(0,195,255,0.25)" stroke="#00c3ff" strokeWidth="1" />
          <polygon points="50,75 68,85 50,92 32,85" fill="#050508" stroke="#00ffa3" strokeWidth="1" />
          <circle cx="50" cy="45" r="3" fill="#00ffa3" />
        </svg>
      ),
    },
    {
      title: "Precise Topology",
      renderShape: () => (
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-[#00c3ff] drop-shadow-[0_0_12px_rgba(0,195,255,0.3)]">
          {/* Cylinder trunk topology with cross contours */}
          <ellipse cx="50" cy="25" rx="30" ry="10" fill="rgba(99,0,255,0.15)" stroke="#a78bfa" strokeWidth="1.5" />
          <ellipse cx="50" cy="50" rx="27" ry="9" fill="none" stroke="#00c3ff" strokeWidth="1" strokeDasharray="3 3" />
          <ellipse cx="50" cy="75" rx="28" ry="9.5" fill="rgba(0,255,163,0.15)" stroke="#00ffa3" strokeWidth="1.5" />
          <line x1="20" y1="25" x2="22" y2="75" stroke="#00c3ff" strokeWidth="1.5" />
          <line x1="80" y1="25" x2="78" y2="75" stroke="#00c3ff" strokeWidth="1.5" />
          <line x1="50" y1="35" x2="50" y2="85" stroke="#a78bfa" strokeWidth="1" />
        </svg>
      ),
    },
  ];

  return (
    <section id="sharp-edges" className="relative bg-[#050508] py-24 lg:py-32 overflow-hidden border-y border-white/[0.06]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#00ffa3]/10 to-[#00c3ff]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="section-label mb-3">
            High Definition
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mt-2">
            Sharp and Well-Defined Edges
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto mt-4 leading-relaxed">
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
                className="group relative glass-card aspect-square w-56 flex-shrink-0 flex flex-col justify-between overflow-hidden transition-all duration-300"
              >
                {/* Decorative Grid Dot Pattern Background */}
                <div
                  className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{
                    backgroundImage:
                      "radial-gradient(#ffffff 1px, transparent 1px)",
                    backgroundSize: "12px 12px",
                  }}
                />

                {/* Top Subtle Status Badge */}
                <div className="relative z-10 p-3 flex justify-between items-center text-[10px] text-white/40">
                  <span className="font-mono">M7-EDGE</span>
                  <div className="status-dot" />
                </div>

                {/* Center Geometric Shape */}
                <div className="relative z-10 my-auto flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
                  {card.renderShape()}
                </div>

                {/* Bottom Label */}
                <div className="relative z-10 pb-4 text-center">
                  <span className="card-title text-xs font-semibold block">
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
