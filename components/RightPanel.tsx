"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  LayoutGrid,
  Zap,
  User,
  SlidersHorizontal,
  MoreHorizontal,
  Loader2,
} from "lucide-react";
import { GenerationItem, MeshyImage3DTask, MeshyImageTask } from "@/lib/meshy";

interface RightPanelProps {
  generations: GenerationItem[];
  selectedGeneration: GenerationItem | null;
  onSelectGeneration: (item: GenerationItem) => void;
  isGenerating: boolean;
  generatingProgress: number;
}

export function RightPanel({
  generations,
  selectedGeneration,
  onSelectGeneration,
  isGenerating,
  generatingProgress,
}: RightPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "fast" | "mine" | "filter">("all");

  const filterButtons = [
    { id: "all" as const, icon: LayoutGrid, title: "All Generations" },
    { id: "fast" as const, icon: Zap, title: "Fast Mode" },
    { id: "mine" as const, icon: User, title: "My Creations" },
    { id: "filter" as const, icon: SlidersHorizontal, title: "Filters" },
  ];

  const filteredGenerations = useMemo(() => {
    return generations.filter((item) => {
      const name = item.name || item.prompt || "";
      const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      if (activeFilter === "mine") {
        return !item.badge; // User generated (no EXAMPLE/TEMPLATE badge)
      }
      if (activeFilter === "fast") {
        return item.badge === "TEMPLATE";
      }
      return true;
    });
  }, [generations, searchQuery, activeFilter]);

  return (
    <aside className="w-[280px] h-full bg-[#050508] border-l border-white/[0.08] flex flex-col p-3 overflow-y-auto no-scrollbar scrollbar-none flex-shrink-0 select-none z-10">
      {/* Header Row: Search Input */}
      <div className="flex flex-col gap-2.5 mb-3">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-white/40 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search my generation"
            className="w-full h-8 pl-8 pr-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#00ffa3]/40 transition-colors"
          />
        </div>

        {/* Row of 4 icon filter buttons */}
        <div className="flex items-center gap-1">
          {filterButtons.map((btn) => {
            const Icon = btn.icon;
            const isActive = activeFilter === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => setActiveFilter(btn.id)}
                title={btn.title}
                className={`p-1.5 rounded-lg transition-colors ${
                  isActive
                    ? "text-[#00ffa3] bg-[rgba(0,255,163,0.12)] border border-[rgba(0,255,163,0.3)] shadow-[0_0_8px_rgba(0,255,163,0.15)]"
                    : "text-white/40 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Generation Gallery (masonry-style 2-column grid) */}
      <div className="grid grid-cols-2 gap-2 flex-1">
        {/* In-progress card with spinner overlay and progress % text */}
        {isGenerating && (
          <div className="bg-white/[0.03] rounded-xl overflow-hidden border border-[#00ffa3]/50 shadow-md ring-1 ring-[#00ffa3]/40 relative flex flex-col animate-pulse">
            <div className="aspect-square w-full bg-white/[0.02] flex flex-col items-center justify-center p-3 relative">
              <Loader2 className="w-6 h-6 animate-spin text-[#00ffa3] mb-1" />
              <span className="text-white text-xs font-semibold">{generatingProgress}%</span>
              <span className="text-[10px] text-white/50 mt-0.5">Generating...</span>
            </div>
            <div className="p-2 bg-white/[0.03]">
              <span className="text-xs text-white truncate block">New Creation</span>
              <span className="text-[10px] text-[#00ffa3]">Processing</span>
            </div>
          </div>
        )}

        {/* Gallery Cards */}
        {filteredGenerations.map((card) => {
          const isSelected = selectedGeneration?.id === card.id;
          const thumbnail =
            ("thumbnail_url" in card && (card as MeshyImage3DTask).thumbnail_url) ||
            ("image_urls" in card && (card as MeshyImageTask).image_urls?.[0]) ||
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80";

          const badge = card.badge;
          const name = card.name || card.prompt || "3D Asset";
          const timestamp = (card as MeshyImage3DTask).created_at
            ? "Recent"
            : "2 min ago";

          return (
            <div
              key={card.id}
              onClick={() => onSelectGeneration(card)}
              className={`bg-white/[0.03] rounded-xl overflow-hidden cursor-pointer flex flex-col group transition-all duration-150 border ${
                isSelected
                  ? "border-[#00ffa3] ring-1 ring-[#00ffa3] shadow-[0_0_15px_rgba(0,255,163,0.25)]"
                  : "border-white/[0.06] hover:border-[#00ffa3]/30"
              }`}
            >
              {/* Top Section */}
              <div className="relative aspect-square w-full bg-[#050508] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbnail}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Top-left Badge */}
                {badge && (
                  <div className="absolute top-1.5 left-1.5 z-10 pointer-events-none">
                    <span className="meta-pill text-[9px] py-0.5 px-1.5 leading-none bg-[#050508]/85 backdrop-blur-sm">
                      {badge}
                    </span>
                  </div>
                )}

                {/* Top-right action dots visible on hover */}
                <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="p-1 rounded-lg bg-[#050508]/80 hover:bg-[#050508] text-white border border-white/10"
                  >
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="p-2 flex flex-col justify-center">
                <span className="text-xs text-white truncate font-medium">
                  {name}
                </span>
                <span className="text-[10px] text-white/40 mt-0.5">
                  {timestamp}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
