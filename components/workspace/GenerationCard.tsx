"use client";

import React from "react";
import { GalleryItem } from "@/hooks/useWorkspace";

interface GenerationCardProps {
  item: GalleryItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function GenerationCard({ item, isSelected, onSelect }: GenerationCardProps) {
  const isTemplate = item.badge === "TEMPLATE";

  const renderArtwork = () => {
    switch (item.svgType) {
      case "hooded":
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="hoodGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#0f766e" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#134e4a" />
              </linearGradient>
              <linearGradient id="cloakGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            {/* Background aura */}
            <circle cx="60" cy="52" r="38" fill="#14b8a6" fillOpacity="0.15" filter="blur(6px)" />
            {/* Shoulders / Cloak */}
            <path d="M22 110 C26 78, 40 70, 60 70 C80 70, 94 78, 98 110 Z" fill="url(#cloakGrad)" />
            {/* Hood cowl */}
            <path d="M38 72 C35 52, 42 30, 60 22 C78 30, 85 52, 82 72 C74 76, 46 76, 38 72 Z" fill="url(#hoodGrad)" />
            {/* Inner shadow of hood */}
            <ellipse cx="60" cy="52" rx="16" ry="20" fill="#091414" />
            {/* Teal hair bangs peaking out */}
            <path d="M48 42 Q52 54 50 60 Q56 48 58 43 Q62 50 64 58 Q66 48 72 45" fill="none" stroke="#5eead4" strokeWidth="2.5" strokeLinecap="round" />
            {/* Glowing eyes */}
            <ellipse cx="54" cy="52" rx="2.5" ry="1.5" fill="#2dd4bf" />
            <ellipse cx="66" cy="52" rx="2.5" ry="1.5" fill="#2dd4bf" />
            <circle cx="54" cy="52" r="4" fill="#2dd4bf" fillOpacity="0.35" />
            <circle cx="66" cy="52" r="4" fill="#2dd4bf" fillOpacity="0.35" />
            {/* Scarf / clasp */}
            <polygon points="56,70 64,70 60,78" fill="#0d9488" />
          </svg>
        );

      case "skull-bird":
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="darkCowl" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3f3f46" />
                <stop offset="100%" stopColor="#18181b" />
              </linearGradient>
            </defs>
            {/* Ambient glow */}
            <circle cx="56" cy="50" r="32" fill="#a1a1aa" fillOpacity="0.08" />
            {/* Torso */}
            <path d="M26 112 C28 82, 42 76, 58 76 C74 76, 88 82, 90 112 Z" fill="#121214" />
            {/* Hood outline */}
            <path d="M36 76 C32 45, 42 26, 58 24 C74 26, 84 45, 80 76 Z" fill="url(#darkCowl)" stroke="#27272a" strokeWidth="1" />
            {/* Deep dark void */}
            <ellipse cx="58" cy="53" rx="14" ry="18" fill="#050505" />
            {/* Faint skull contour / mask */}
            <path d="M50 48 Q58 45 66 48 Q64 62 58 64 Q52 62 50 48 Z" fill="#27272a" opacity="0.6" />
            {/* Bird companion on right shoulder */}
            <g transform="translate(74, 52) scale(0.65)">
              {/* Bird body */}
              <ellipse cx="14" cy="22" rx="10" ry="14" fill="#0f0f10" />
              {/* Bird head */}
              <circle cx="10" cy="10" r="7" fill="#18181b" />
              {/* Beak */}
              <polygon points="3,10 8,8 8,13" fill="#ca8a04" />
              {/* Eye */}
              <circle cx="11" cy="9" r="1.5" fill="#facc15" />
              {/* Tail / wing */}
              <path d="M18 20 Q28 32 26 38 Q18 30 16 26 Z" fill="#09090a" />
            </g>
          </svg>
        );

      case "chibi":
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="pinkCap" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#db2777" />
              </linearGradient>
            </defs>
            {/* Soft pink halo */}
            <circle cx="60" cy="56" r="36" fill="#f472b6" fillOpacity="0.2" filter="blur(5px)" />
            {/* Little body */}
            <path d="M38 112 C40 92, 50 86, 60 86 C70 86, 80 92, 82 112 Z" fill="#fce7f3" />
            {/* Chibi Head */}
            <circle cx="60" cy="62" r="22" fill="#fed7aa" />
            {/* Twin tails */}
            <path d="M38 60 Q24 72 26 84 Q34 78 40 70 Z" fill="#fda4af" />
            <path d="M82 60 Q96 72 94 84 Q86 78 80 70 Z" fill="#fda4af" />
            {/* Pink Cap / Beanie */}
            <path d="M36 56 C36 34, 50 26, 60 26 C70 26, 84 34, 84 56 C74 54, 46 54, 36 56 Z" fill="url(#pinkCap)" />
            {/* Cap Brim */}
            <path d="M32 56 Q60 50 88 56 Q60 60 32 56 Z" fill="#be185d" />
            {/* Big cute eyes */}
            <ellipse cx="52" cy="64" rx="3.5" ry="5" fill="#4c0519" />
            <ellipse cx="68" cy="64" rx="3.5" ry="5" fill="#4c0519" />
            <circle cx="51" cy="62" r="1.5" fill="#ffffff" />
            <circle cx="67" cy="62" r="1.5" fill="#ffffff" />
            {/* Blush */}
            <ellipse cx="46" cy="69" rx="3" ry="1.5" fill="#fb7185" opacity="0.6" />
            <ellipse cx="74" cy="69" rx="3" ry="1.5" fill="#fb7185" opacity="0.6" />
          </svg>
        );

      case "medallion":
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <defs>
              <radialGradient id="rubyGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="60%" stopColor="#991b1b" />
                <stop offset="100%" stopColor="#450a0a" />
              </radialGradient>
              <linearGradient id="goldRim" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#fef08a" />
              </linearGradient>
            </defs>
            {/* Ribbon / loop top */}
            <path d="M54 18 Q60 10 66 18 L63 28 L57 28 Z" fill="#991b1b" />
            {/* Outer decorative rim with teeth */}
            <circle cx="60" cy="62" r="42" fill="none" stroke="url(#goldRim)" strokeWidth="4" strokeDasharray="6 3" />
            {/* Outer gold ring */}
            <circle cx="60" cy="62" r="37" fill="url(#goldRim)" />
            {/* Inner ruby seal */}
            <circle cx="60" cy="62" r="32" fill="url(#rubyGrad)" />
            {/* Cat heraldry crest */}
            <g fill="#fef08a" transform="translate(60, 62) scale(0.65) translate(-26, -26)">
              {/* Cat ears */}
              <polygon points="12,18 20,4 26,14" />
              <polygon points="40,18 32,4 26,14" />
              {/* Cat face */}
              <circle cx="26" cy="26" r="16" />
              {/* Eyes cut out */}
              <ellipse cx="20" cy="24" rx="2" ry="3.5" fill="#7f1d1d" />
              <ellipse cx="32" cy="24" rx="2" ry="3.5" fill="#7f1d1d" />
              {/* Nose & whiskers */}
              <polygon points="26,29 24,27 28,27" fill="#7f1d1d" />
              <line x1="12" y1="28" x2="18" y2="29" stroke="#7f1d1d" strokeWidth="1.2" />
              <line x1="12" y1="32" x2="19" y2="31" stroke="#7f1d1d" strokeWidth="1.2" />
              <line x1="34" y1="29" x2="40" y2="28" stroke="#7f1d1d" strokeWidth="1.2" />
              <line x1="33" y1="31" x2="40" y2="32" stroke="#7f1d1d" strokeWidth="1.2" />
            </g>
          </svg>
        );

      case "penguin":
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="armorSteel" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#475569" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
            </defs>
            {/* Ambient ice blue glow */}
            <circle cx="60" cy="60" r="36" fill="#38bdf8" fillOpacity="0.12" />
            {/* Penguin belly white plate */}
            <ellipse cx="60" cy="74" rx="18" ry="24" fill="#f8fafc" />
            {/* Outer body / back */}
            <path d="M38 108 C32 80, 36 48, 60 40 C84 48, 88 80, 82 108 Z" fill="#0f172a" />
            <ellipse cx="60" cy="76" rx="13" ry="18" fill="#e2e8f0" />
            {/* Knight Breastplate armor */}
            <path d="M46 72 C46 62, 52 58, 60 58 C68 58, 74 62, 74 72 C74 84, 60 92, 60 92 C60 92, 46 84, 46 72 Z" fill="url(#armorSteel)" stroke="#cbd5e1" strokeWidth="1.2" />
            {/* Pauldrons (shoulder armor) */}
            <ellipse cx="40" cy="68" rx="6" ry="10" fill="url(#armorSteel)" stroke="#cbd5e1" strokeWidth="0.8" />
            <ellipse cx="80" cy="68" rx="6" ry="10" fill="url(#armorSteel)" stroke="#cbd5e1" strokeWidth="0.8" />
            {/* Helmet / Visor with Crest */}
            <path d="M44 48 C44 32, 52 24, 60 24 C68 24, 76 32, 76 48 Z" fill="url(#armorSteel)" />
            {/* Feather plume / crest */}
            <path d="M58 24 Q52 10 60 8 Q66 12 62 24 Z" fill="#38bdf8" />
            {/* Yellow Beak */}
            <polygon points="54,46 66,46 60,53" fill="#f59e0b" />
            {/* Beady penguin eyes peering out */}
            <circle cx="52" cy="40" r="2.5" fill="#f8fafc" />
            <circle cx="68" cy="40" r="2.5" fill="#f8fafc" />
            <circle cx="52" cy="40" r="1.2" fill="#0f172a" />
            <circle cx="68" cy="40" r="1.2" fill="#0f172a" />
          </svg>
        );

      case "backpack":
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="leatherGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b45309" />
                <stop offset="40%" stopColor="#78350f" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>
            </defs>
            {/* Top rolled bedroll / blanket */}
            <rect x="36" y="24" width="48" height="12" rx="6" fill="#57534e" stroke="#292524" strokeWidth="1.5" />
            <line x1="48" y1="24" x2="48" y2="36" stroke="#d97706" strokeWidth="2" />
            <line x1="72" y1="24" x2="72" y2="36" stroke="#d97706" strokeWidth="2" />
            {/* Main backpack body */}
            <rect x="34" y="38" width="52" height="58" rx="10" fill="url(#leatherGrad)" stroke="#292524" strokeWidth="1.5" />
            {/* Top Flap */}
            <path d="M34 44 C34 40, 86 40, 86 44 L82 66 C72 70, 48 70, 38 66 Z" fill="#92400e" stroke="#451a03" strokeWidth="1" />
            {/* Front pocket */}
            <rect x="42" y="70" width="36" height="22" rx="4" fill="#78350f" stroke="#451a03" strokeWidth="1" />
            {/* Leather straps & brass buckles */}
            <line x1="46" y1="42" x2="46" y2="92" stroke="#d97706" strokeWidth="2" strokeDasharray="3 1" />
            <line x1="74" y1="42" x2="74" y2="92" stroke="#d97706" strokeWidth="2" strokeDasharray="3 1" />
            {/* Buckles */}
            <rect x="43" y="62" width="6" height="5" rx="1" fill="#fef08a" stroke="#78350f" strokeWidth="0.8" />
            <rect x="71" y="62" width="6" height="5" rx="1" fill="#fef08a" stroke="#78350f" strokeWidth="0.8" />
            {/* Side pockets */}
            <rect x="26" y="58" width="8" height="24" rx="2" fill="#78350f" />
            <rect x="86" y="58" width="8" height="24" rx="2" fill="#78350f" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      onClick={() => onSelect(item.id)}
      className={`aspect-square bg-[#0e0e0e] rounded-xl overflow-hidden relative cursor-pointer group transition-all duration-150 select-none border ${
        isSelected
          ? "border-white ring-2 ring-white shadow-xl shadow-white/10 scale-[1.02]"
          : "border-white/5 hover:border-white/25 hover:scale-[1.02]"
      }`}
      style={{
        background: `radial-gradient(circle at 50% 40%, ${item.gradientFrom} 0%, ${item.gradientTo} 100%)`,
      }}
    >
      {/* Badge Top-Left */}
      <div className="absolute top-2 left-2 z-10 flex items-center gap-1">
        {item.badge === "GENERATED" ? (
          <span className="bg-white text-black text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
            {item.type === "image" ? "IMAGE" : "3D MESH"}
          </span>
        ) : isTemplate ? (
          <span className="bg-neutral-900/90 text-zinc-200 text-[9px] font-medium px-1.5 py-0.5 rounded backdrop-blur border border-white/20">
            TEMPLATE
          </span>
        ) : (
          <span className="bg-black/85 text-zinc-400 text-[9px] font-medium px-1.5 py-0.5 rounded backdrop-blur border border-white/10">
            EXAMPLE
          </span>
        )}
      </div>

      {/* SVG artwork or Image preview area */}
      <div className="w-full h-full flex items-center justify-center p-2 transition-transform duration-200 group-hover:scale-105">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          renderArtwork()
        )}
      </div>

      {/* Bottom subtle shadow/vignette */}
      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
}
