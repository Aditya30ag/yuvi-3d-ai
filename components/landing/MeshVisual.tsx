"use client";

import { motion } from "framer-motion";

/** Wireframe "vase" mesh — the visual stand-in for a generated 3D model. */
export function MeshVisual({ className = "" }: { className?: string }) {
  // Profile of the vase (radius at each ring, top → bottom)
  const rings = [
    { y: 30, r: 34 },
    { y: 52, r: 26 },
    { y: 78, r: 30 },
    { y: 108, r: 52 },
    { y: 140, r: 62 },
    { y: 172, r: 56 },
    { y: 200, r: 40 },
    { y: 218, r: 36 },
  ];
  const meridians = [-1, -0.7, -0.38, 0, 0.38, 0.7, 1];
  const tilt = 0.22; // ellipse height relative to radius

  const meridianPath = (k: number) =>
    rings
      .map((ring, i) => `${i === 0 ? "M" : "L"} ${100 + ring.r * k} ${ring.y + ring.r * tilt * Math.sqrt(1 - k * k)}`)
      .join(" ");

  return (
    <motion.svg
      viewBox="0 0 200 250"
      className={className}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="meshFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00ffa3" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#00c3ff" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="meshStroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00ffa3" />
          <stop offset="100%" stopColor="#00c3ff" />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="100" cy="236" rx="58" ry="8" fill="#00c3ff" opacity="0.18" />

      {/* Silhouette fill */}
      <path
        d={`${rings.map((r, i) => `${i === 0 ? "M" : "L"} ${100 - r.r} ${r.y}`).join(" ")} ${[...rings]
          .reverse()
          .map((r) => `L ${100 + r.r} ${r.y}`)
          .join(" ")} Z`}
        fill="url(#meshFill)"
      />

      <g fill="none" stroke="url(#meshStroke)" strokeWidth="1.1" strokeLinejoin="round">
        {/* Rings: back half dashed, front half solid */}
        {rings.map((ring) => (
          <g key={ring.y}>
            <path
              d={`M ${100 - ring.r} ${ring.y} A ${ring.r} ${ring.r * tilt} 0 0 1 ${100 + ring.r} ${ring.y}`}
              strokeOpacity="0.35"
              strokeDasharray="2 3"
            />
            <path d={`M ${100 - ring.r} ${ring.y} A ${ring.r} ${ring.r * tilt} 0 0 0 ${100 + ring.r} ${ring.y}`} />
          </g>
        ))}
        {/* Meridians */}
        {meridians.map((k) => (
          <path key={k} d={meridianPath(k)} strokeOpacity={Math.abs(k) === 1 ? 1 : 0.75} />
        ))}
      </g>

      {/* Vertex dots on the front-most meridian */}
      {rings.map((ring) => (
        <circle key={ring.y} cx="100" cy={ring.y + ring.r * tilt} r="1.8" fill="#00ffa3" />
      ))}
    </motion.svg>
  );
}

/** The "input photo" stand-in: a simple product shot of the same vase. */
export function PhotoVisual({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 250" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="photoBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
        <linearGradient id="vaseBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9a3412" />
          <stop offset="45%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#7c2d12" />
        </linearGradient>
      </defs>
      <rect width="200" height="250" fill="url(#photoBg)" />
      <rect y="190" width="200" height="60" fill="#fcd34d" opacity="0.6" />
      <ellipse cx="100" cy="222" rx="50" ry="7" fill="#78350f" opacity="0.25" />
      <path
        d="M66 30 Q74 30 74 40 Q74 56 70 70 Q50 100 40 140 Q38 180 64 210 L136 210 Q162 180 160 140 Q150 100 130 70 Q126 56 126 40 Q126 30 134 30 Z"
        fill="url(#vaseBody)"
      />
      <ellipse cx="100" cy="31" rx="34" ry="6" fill="#7c2d12" />
      <path d="M58 120 Q100 132 142 120" stroke="#fed7aa" strokeWidth="3" fill="none" opacity="0.7" />
      <path d="M52 150 Q100 162 148 150" stroke="#fed7aa" strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M62 78 Q56 120 60 170" stroke="#fff7ed" strokeWidth="5" fill="none" opacity="0.25" strokeLinecap="round" />
    </svg>
  );
}
