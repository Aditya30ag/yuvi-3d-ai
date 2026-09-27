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
    <aside className="w-[280px] h-full bg-[#0a0a0a] border-l border-[#1f1f1f] flex flex-col p-3 overflow-y-auto no-scrollbar scrollbar-none flex-shrink-0 select-none z-10">
      {/* Header Row: Search Input */}
      <div className="flex flex-col gap-2.5 mb-3">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-[#555555] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search my generation"
            className="w-full h-8 pl-8 pr-3 bg-[#141414] border border-[#2a2a2a] rounded-md text-xs text-white placeholder-[#555555] focus:outline-none focus:border-[#a3e635] transition-colors"
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
                className={`p-1.5 rounded transition-colors ${
                  isActive
                    ? "text-white bg-[#1f1f1f]"
                    : "text-[#555555] hover:text-[#cccccc]"
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
          <div className="bg-[#141414] rounded-xl overflow-hidden border border-[#a3e635]/50 shadow-md ring-2 ring-[#a3e635]/40 relative flex flex-col animate-pulse">
            <div className="aspect-square w-full bg-[#1b1b22] flex flex-col items-center justify-center p-3 relative">
              <Loader2 className="w-6 h-6 animate-spin text-[#a3e635] mb-1" />
              <span className="text-white text-xs font-semibold">{generatingProgress}%</span>
              <span className="text-[10px] text-[#888888] mt-0.5">Generating...</span>
            </div>
            <div className="p-2 bg-[#141414]">
              <span className="text-xs text-white truncate block">New Creation</span>
              <span className="text-[10px] text-[#a3e635]">Processing</span>
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
              className={`bg-[#141414] rounded-xl overflow-hidden cursor-pointer flex flex-col group transition-all duration-150 ${
                isSelected
                  ? "ring-2 ring-[#a3e635]"
                  : "hover:ring-1 hover:ring-[#3a3a3a]"
              }`}
            >
              {/* Top Section */}
              <div className="relative aspect-square w-full bg-[#111111] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbnail}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Top-left Badge */}
                {badge && (
                  <div className="absolute top-1.5 left-1.5 z-10 pointer-events-none">
                    {badge === "EXAMPLE" ? (
                      <span className="bg-[#1f1f1f]/90 backdrop-blur-sm text-[#888888] text-[10px] font-semibold px-1.5 py-0.5 rounded leading-none shadow-sm">
                        EXAMPLE
                      </span>
                    ) : (
                      <span className="bg-amber-900/60 backdrop-blur-sm text-amber-400 text-[10px] font-semibold px-1.5 py-0.5 rounded leading-none shadow-sm">
                        TEMPLATE
                      </span>
                    )}
                  </div>
                )}

                {/* Top-right action dots visible on hover */}
                <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="p-1 rounded bg-black/60 hover:bg-black text-white"
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
                <span className="text-[10px] text-[#555555] mt-0.5">
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
