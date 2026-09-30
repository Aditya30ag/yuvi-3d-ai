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
    <aside className="w-[280px] h-full bg-bg-surface border-l border-border-subtle flex flex-col p-3 overflow-y-auto no-scrollbar scrollbar-none flex-shrink-0 select-none z-10 transition-colors">
      {/* Header Row: Search Input */}
      <div className="flex flex-col gap-2.5 mb-3">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search my generation"
            className="w-full h-8 pl-8 pr-3 bg-bg-surface-secondary border border-border-subtle rounded-xl text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-neon-green/60 transition-colors"
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
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? "text-neon-green bg-neon-green/10 border border-neon-green/30 shadow-sm"
                    : "text-text-muted hover:text-text-primary hover:bg-bg-surface-hover"
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
          <div className="bg-bg-surface rounded-xl overflow-hidden border border-neon-green/50 shadow-md ring-1 ring-neon-green/40 relative flex flex-col animate-pulse">
            <div className="aspect-square w-full bg-bg-surface-secondary flex flex-col items-center justify-center p-3 relative">
              <Loader2 className="w-6 h-6 animate-spin text-neon-green mb-1" />
              <span className="text-[11px] font-bold text-neon-green">
                {generatingProgress}%
              </span>
              <span className="text-[10px] text-text-muted mt-0.5">Generating</span>
            </div>
            <div className="p-2 flex flex-col">
              <span className="text-text-primary text-xs font-medium truncate">Processing</span>
              <span className="text-[10px] text-text-muted">In progress...</span>
            </div>
          </div>
        )}

        {filteredGenerations.map((item) => {
          const isSelected = selectedGeneration?.id === item.id;
          const is3D = item.type === "3d" || ("model_urls" in item && Boolean((item as MeshyImage3DTask).model_urls?.glb));
          const thumb =
            item.thumbnail_url ||
            (item as MeshyImageTask).image_urls?.[0] ||
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80";

          return (
            <div
              key={item.id}
              onClick={() => onSelectGeneration(item)}
              className={`bg-bg-surface-secondary rounded-xl overflow-hidden cursor-pointer border transition-all flex flex-col relative group ${
                isSelected
                  ? "border-neon-green ring-1 ring-neon-green shadow-sm"
                  : "border-border-subtle hover:border-border-secondary"
              }`}
            >
              {/* Badge: "EXAMPLE" or "TEMPLATE" or none */}
              {item.badge && (
                <div className="absolute top-1.5 left-1.5 z-10">
                  <span className="meta-pill text-[9px] py-0 px-1.5 leading-tight bg-bg-surface/80 backdrop-blur shadow-sm">
                    {item.badge}
                  </span>
                </div>
              )}

              {/* 3D icon indicator in top right if it's 3D */}
              {is3D && (
                <div className="absolute top-1.5 right-1.5 z-10">
                  <span className="badge-cyan text-[8px] py-0 px-1 leading-tight">
                    3D
                  </span>
                </div>
              )}

              {/* Thumbnail Image */}
              <div className="aspect-square w-full bg-bg-surface overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb}
                  alt={item.name || item.prompt || "Generation"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>

              {/* Meta row at bottom */}
              <div className="p-2 flex items-center justify-between">
                <div className="flex flex-col min-w-0 pr-1">
                  <span className="text-text-primary text-xs font-medium truncate">
                    {item.name || item.prompt || "Asset"}
                  </span>
                  <span className="text-[10px] text-text-muted mt-0.5">
                    {item.badge ? "Default" : "Recent"}
                  </span>
                </div>
                <button
                  type="button"
                  title="More actions"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 rounded text-text-muted hover:text-text-primary hover:bg-bg-surface-hover opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
