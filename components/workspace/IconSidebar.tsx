"use client";

import React from "react";
import {
  LayoutGrid,
  Bot,
  Image as ImageIcon,
  Box,
  Printer,
  PersonStanding,
  Zap,
} from "lucide-react";
import { FeatureType } from "@/hooks/useWorkspace";

interface IconSidebarProps {
  activeFeature: FeatureType;
  onSelectFeature: (feature: FeatureType) => void;
}

export function IconSidebar({
  activeFeature,
  onSelectFeature,
}: IconSidebarProps) {
  return (
    <aside className="fixed left-0 top-[48px] w-[56px] h-[calc(100vh-48px)] bg-[#050508] border-r border-white/[0.08] flex flex-col items-center py-2.5 z-40 select-none overflow-y-auto no-scrollbar scrollbar-none">
      {/* 1. Assets */}
      <button
        onClick={() => onSelectFeature("assets")}
        className={`w-[56px] h-[54px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors group relative ${
          activeFeature === "assets"
            ? "text-white"
            : "text-white/40 hover:text-white"
        }`}
        title="Assets"
      >
        <div
          className={`w-[42px] h-[42px] rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
            activeFeature === "assets"
              ? "bg-gradient-to-br from-[#00ffa3] to-[#00c3ff] text-[#050508] shadow-[0_0_15px_rgba(0,255,163,0.35)] font-bold"
              : "group-hover:bg-white/[0.04] text-white/40 group-hover:text-white"
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span className="text-[9px] leading-none tracking-tight">
            Assets
          </span>
        </div>
      </button>

      {/* Divider */}
      <div className="w-7 my-1 border-t border-white/[0.08]" />

      {/* 3. Agent (with neon green dot) */}
      <button
        onClick={() => onSelectFeature("agent")}
        className={`w-[56px] h-[54px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors group relative ${
          activeFeature === "agent"
            ? "text-white"
            : "text-white/40 hover:text-white"
        }`}
        title="Agent"
      >
        <div
          className={`w-[42px] h-[42px] rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all relative ${
            activeFeature === "agent"
              ? "bg-gradient-to-br from-[#00ffa3] to-[#00c3ff] text-[#050508] shadow-[0_0_15px_rgba(0,255,163,0.35)] font-bold"
              : "group-hover:bg-white/[0.04] text-white/40 group-hover:text-white"
          }`}
        >
          <div className="relative">
            <Bot className="w-4 h-4" />
            <span className="w-1.5 h-1.5 bg-[#00ffa3] rounded-full absolute -top-0.5 -right-0.5 shadow-[0_0_6px_#00ffa3]" />
          </div>
          <span className="text-[9px] leading-none tracking-tight">
            Agent
          </span>
        </div>
      </button>

      {/* 4. Image */}
      <button
        onClick={() => onSelectFeature("image")}
        className={`w-[56px] h-[54px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors group relative ${
          activeFeature === "image"
            ? "text-white"
            : "text-white/40 hover:text-white"
        }`}
        title="Image to 3D"
      >
        <div
          className={`w-[42px] h-[42px] rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
            activeFeature === "image"
              ? "bg-gradient-to-br from-[#00ffa3] to-[#00c3ff] text-[#050508] shadow-[0_0_15px_rgba(0,255,163,0.35)] font-bold"
              : "group-hover:bg-white/[0.04] text-white/40 group-hover:text-white"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span className="text-[9px] leading-none tracking-tight">
            Image
          </span>
        </div>
      </button>

      {/* 5. Model */}
      <button
        onClick={() => onSelectFeature("model")}
        className={`w-[56px] h-[54px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors group relative ${
          activeFeature === "model"
            ? "text-white"
            : "text-white/40 hover:text-white"
        }`}
        title="Model"
      >
        <div
          className={`w-[42px] h-[42px] rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
            activeFeature === "model"
              ? "bg-gradient-to-br from-[#00ffa3] to-[#00c3ff] text-[#050508] shadow-[0_0_15px_rgba(0,255,163,0.35)] font-bold"
              : "group-hover:bg-white/[0.04] text-white/40 group-hover:text-white"
          }`}
        >
          <Box className="w-4 h-4" />
          <span className="text-[9px] leading-none tracking-tight">
            Model
          </span>
        </div>
      </button>

      {/* 6. Print */}
      <button
        onClick={() => onSelectFeature("print")}
        className={`w-[56px] h-[54px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors group relative ${
          activeFeature === "print"
            ? "text-white"
            : "text-white/40 hover:text-white"
        }`}
        title="3D Print"
      >
        <div
          className={`w-[42px] h-[42px] rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
            activeFeature === "print"
              ? "bg-gradient-to-br from-[#00ffa3] to-[#00c3ff] text-[#050508] shadow-[0_0_15px_rgba(0,255,163,0.35)] font-bold"
              : "group-hover:bg-white/[0.04] text-white/40 group-hover:text-white"
          }`}
        >
          <Printer className="w-4 h-4" />
          <span className="text-[9px] leading-none tracking-tight">
            Print
          </span>
        </div>
      </button>

      {/* 7. Animate */}
      <button
        onClick={() => onSelectFeature("animate")}
        className={`w-[56px] h-[54px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors group relative ${
          activeFeature === "animate"
            ? "text-white"
            : "text-white/40 hover:text-white"
        }`}
        title="Animate"
      >
        <div
          className={`w-[42px] h-[42px] rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
            activeFeature === "animate"
              ? "bg-gradient-to-br from-[#00ffa3] to-[#00c3ff] text-[#050508] shadow-[0_0_15px_rgba(0,255,163,0.35)] font-bold"
              : "group-hover:bg-white/[0.04] text-white/40 group-hover:text-white"
          }`}
        >
          <PersonStanding className="w-4 h-4" />
          <span className="text-[9px] leading-none tracking-tight">
            Animate
          </span>
        </div>
      </button>

      {/* Divider */}
      <div className="w-7 my-1 border-t border-white/[0.08]" />

      {/* 9. Inspiration */}
      <button
        onClick={() => onSelectFeature("inspiration")}
        className={`w-[56px] h-[54px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors group relative ${
          activeFeature === "inspiration"
            ? "text-white"
            : "text-white/40 hover:text-white"
        }`}
        title="Inspiration"
      >
        <div
          className={`w-[42px] h-[42px] rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
            activeFeature === "inspiration"
              ? "bg-gradient-to-br from-[#00ffa3] to-[#00c3ff] text-[#050508] shadow-[0_0_15px_rgba(0,255,163,0.35)] font-bold"
              : "group-hover:bg-white/[0.04] text-white/40 group-hover:text-white"
          }`}
        >
          <Zap className="w-4 h-4" />
          <span className="text-[9px] leading-none tracking-tight">
            Inspiration
          </span>
        </div>
      </button>
    </aside>
  );
}
