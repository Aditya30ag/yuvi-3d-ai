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
  Settings as SettingsIcon,
} from "lucide-react";
import { FeatureType } from "@/hooks/useWorkspace";
import { useTheme } from "@/components/theme/ThemeProvider";

interface IconSidebarProps {
  activeFeature: FeatureType;
  onSelectFeature: (feature: FeatureType) => void;
}

export function IconSidebar({
  activeFeature,
  onSelectFeature,
}: IconSidebarProps) {
  const { openSettings } = useTheme();

  return (
    <aside className="fixed left-0 top-[48px] w-[56px] h-[calc(100vh-48px)] bg-sidebar-bg border-r border-border-subtle flex flex-col items-center justify-between py-2.5 z-40 select-none overflow-y-auto no-scrollbar scrollbar-none backdrop-blur-xl transition-colors">
      <div className="flex flex-col items-center w-full">
        {/* 1. Assets */}
        <button
          onClick={() => onSelectFeature("assets")}
          className={`w-[56px] h-[54px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors group relative ${
            activeFeature === "assets"
              ? "text-text-primary"
              : "text-text-muted hover:text-text-primary"
          }`}
          title="Assets"
        >
          <div
            className={`w-[42px] h-[42px] rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
              activeFeature === "assets"
                ? "bg-gradient-to-br from-[#00ffa3] to-[#00c3ff] text-[#050508] shadow-[0_0_15px_rgba(0,255,163,0.35)] font-bold"
                : "group-hover:bg-bg-surface-hover text-text-muted group-hover:text-text-primary"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="text-[9px] leading-none tracking-tight">
              Assets
            </span>
          </div>
        </button>

        {/* Divider */}
        <div className="w-7 my-1 border-t border-border-subtle" />

        {/* 2. Agent (with neon green dot) */}
        <button
          onClick={() => onSelectFeature("agent")}
          className={`w-[56px] h-[54px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors group relative ${
            activeFeature === "agent"
              ? "text-text-primary"
              : "text-text-muted hover:text-text-primary"
          }`}
          title="Agent"
        >
          <div
            className={`w-[42px] h-[42px] rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all relative ${
              activeFeature === "agent"
                ? "bg-gradient-to-br from-[#00ffa3] to-[#00c3ff] text-[#050508] shadow-[0_0_15px_rgba(0,255,163,0.35)] font-bold"
                : "group-hover:bg-bg-surface-hover text-text-muted group-hover:text-text-primary"
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

        {/* 3. Image to 3D */}
        <button
          onClick={() => onSelectFeature("image")}
          className={`w-[56px] h-[54px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors group relative ${
            activeFeature === "image"
              ? "text-text-primary"
              : "text-text-muted hover:text-text-primary"
          }`}
          title="Image to 3D"
        >
          <div
            className={`w-[42px] h-[42px] rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
              activeFeature === "image"
                ? "bg-gradient-to-br from-[#00ffa3] to-[#00c3ff] text-[#050508] shadow-[0_0_15px_rgba(0,255,163,0.35)] font-bold"
                : "group-hover:bg-bg-surface-hover text-text-muted group-hover:text-text-primary"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span className="text-[9px] leading-none tracking-tight">
              Image
            </span>
          </div>
        </button>

        {/* 4. Model */}
        <button
          onClick={() => onSelectFeature("model")}
          className={`w-[56px] h-[54px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors group relative ${
            activeFeature === "model"
              ? "text-text-primary"
              : "text-text-muted hover:text-text-primary"
          }`}
          title="Model"
        >
          <div
            className={`w-[42px] h-[42px] rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
              activeFeature === "model"
                ? "bg-gradient-to-br from-[#00ffa3] to-[#00c3ff] text-[#050508] shadow-[0_0_15px_rgba(0,255,163,0.35)] font-bold"
                : "group-hover:bg-bg-surface-hover text-text-muted group-hover:text-text-primary"
            }`}
          >
            <Box className="w-4 h-4" />
            <span className="text-[9px] leading-none tracking-tight">
              Model
            </span>
          </div>
        </button>

        {/* 5. Print */}
        <button
          onClick={() => onSelectFeature("print")}
          className={`w-[56px] h-[54px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors group relative ${
            activeFeature === "print"
              ? "text-text-primary"
              : "text-text-muted hover:text-text-primary"
          }`}
          title="3D Print"
        >
          <div
            className={`w-[42px] h-[42px] rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
              activeFeature === "print"
                ? "bg-gradient-to-br from-[#00ffa3] to-[#00c3ff] text-[#050508] shadow-[0_0_15px_rgba(0,255,163,0.35)] font-bold"
                : "group-hover:bg-bg-surface-hover text-text-muted group-hover:text-text-primary"
            }`}
          >
            <Printer className="w-4 h-4" />
            <span className="text-[9px] leading-none tracking-tight">
              Print
            </span>
          </div>
        </button>

        {/* 6. Animate */}
        <button
          onClick={() => onSelectFeature("animate")}
          className={`w-[56px] h-[54px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors group relative ${
            activeFeature === "animate"
              ? "text-text-primary"
              : "text-text-muted hover:text-text-primary"
          }`}
          title="Animate"
        >
          <div
            className={`w-[42px] h-[42px] rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
              activeFeature === "animate"
                ? "bg-gradient-to-br from-[#00ffa3] to-[#00c3ff] text-[#050508] shadow-[0_0_15px_rgba(0,255,163,0.35)] font-bold"
                : "group-hover:bg-bg-surface-hover text-text-muted group-hover:text-text-primary"
            }`}
          >
            <PersonStanding className="w-4 h-4" />
            <span className="text-[9px] leading-none tracking-tight">
              Animate
            </span>
          </div>
        </button>

        {/* Divider */}
        <div className="w-7 my-1 border-t border-border-subtle" />

        {/* 7. Inspiration */}
        <button
          onClick={() => onSelectFeature("inspiration")}
          className={`w-[56px] h-[54px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors group relative ${
            activeFeature === "inspiration"
              ? "text-text-primary"
              : "text-text-muted hover:text-text-primary"
          }`}
          title="Inspiration"
        >
          <div
            className={`w-[42px] h-[42px] rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
              activeFeature === "inspiration"
                ? "bg-gradient-to-br from-[#00ffa3] to-[#00c3ff] text-[#050508] shadow-[0_0_15px_rgba(0,255,163,0.35)] font-bold"
                : "group-hover:bg-bg-surface-hover text-text-muted group-hover:text-text-primary"
            }`}
          >
            <Zap className="w-4 h-4" />
            <span className="text-[9px] leading-none tracking-tight">
              Inspiration
            </span>
          </div>
        </button>
      </div>

      {/* Bottom: Settings button */}
      <div className="w-full flex flex-col items-center pt-2 border-t border-border-subtle">
        <button
          onClick={openSettings}
          title="Settings"
          aria-label="Settings"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-surface-hover transition-colors cursor-pointer"
        >
          <SettingsIcon className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
