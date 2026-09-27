"use client";

import React, { useRef, useState } from "react";
import {
  Search,
  Upload,
  LayoutGrid,
  Box,
  Layers,
  PersonStanding,
  Filter,
  Square,
  LayoutList,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { WorkspaceState } from "@/hooks/useWorkspace";
import { GenerationCard } from "./GenerationCard";

interface RightPanelProps {
  workspace: WorkspaceState;
}

export function RightPanel({ workspace }: RightPanelProps) {
  const {
    galleryItems,
    selectedCard,
    setSelectedCard,
    searchQuery,
    setSearchQuery,
    handleFileUpload,
  } = workspace;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeFilter, setActiveFilter] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter items by search query and active tab
  const filteredItems = galleryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.badge.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 1) return item.type === "3d";
    if (activeFilter === 2) return item.type === "image";
    if (activeFilter === 3)
      return (
        item.category.toLowerCase().includes("character") ||
        item.category.toLowerCase().includes("chibi") ||
        item.category.toLowerCase().includes("creature")
      );

    return true;
  });

  return (
    <aside className="fixed right-0 top-[48px] w-[420px] h-[calc(100vh-48px)] bg-[#080808] border-l border-white/10 z-30 select-none flex flex-col">
      {/* Hidden file input for right panel Upload button */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.webp"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
          }
        }}
      />

      {/* 1. TOP ROW: Search input + Upload button */}
      <div className="px-4 pt-3 flex items-center gap-2 flex-shrink-0">
        {/* Search input (flex-1) */}
        <div className="flex-1 bg-[#121212] border border-white/10 rounded-lg h-9 flex items-center px-2.5 gap-2 transition-colors focus-within:border-white/30">
          <Search className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search my generation..."
            className="w-full bg-transparent text-xs text-white placeholder-zinc-600 outline-none"
          />
        </div>

        {/* Upload button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-[#121212] border border-white/10 rounded-lg h-9 px-3 flex items-center gap-1.5 hover:bg-[#1a1a1a] transition-colors cursor-pointer text-xs text-zinc-300 hover:text-white"
        >
          <Upload className="w-3.5 h-3.5 text-zinc-400" />
          <span>Upload</span>
        </button>
      </div>

      {/* 2. FILTER ICON ROW */}
      <div className="mt-2.5 px-4 flex items-center gap-2.5 flex-shrink-0">
        {/* LayoutGrid icon (active) */}
        <button
          onClick={() => setActiveFilter(0)}
          className={`p-1.5 rounded transition-all ${
            activeFilter === 0
              ? "text-black bg-white shadow-sm font-semibold"
              : "text-zinc-500 hover:text-white"
          }`}
          title="All assets"
        >
          <LayoutGrid className="w-4 h-4" />
        </button>

        {/* Cube / Box icon */}
        <button
          onClick={() => setActiveFilter(1)}
          className={`p-1.5 rounded transition-all ${
            activeFilter === 1
              ? "text-black bg-white shadow-sm font-semibold"
              : "text-zinc-500 hover:text-white"
          }`}
          title="3D Meshes"
        >
          <Box className="w-4 h-4" />
        </button>

        {/* Layers icon */}
        <button
          onClick={() => setActiveFilter(2)}
          className={`p-1.5 rounded transition-all ${
            activeFilter === 2
              ? "text-black bg-white shadow-sm font-semibold"
              : "text-zinc-500 hover:text-white"
          }`}
          title="2D Images"
        >
          <Layers className="w-4 h-4" />
        </button>

        {/* PersonStanding icon */}
        <button
          onClick={() => setActiveFilter(3)}
          className={`p-1.5 rounded transition-all ${
            activeFilter === 3
              ? "text-black bg-white shadow-sm font-semibold"
              : "text-zinc-500 hover:text-white"
          }`}
          title="Characters & Avatars"
        >
          <PersonStanding className="w-4 h-4" />
        </button>

        {/* Separator */}
        <div className="w-[1px] h-4 bg-white/10 mx-0.5" />

        {/* Filter icon */}
        <button
          className="p-1.5 rounded text-zinc-500 hover:text-white transition-colors"
          title="Filter options"
        >
          <Filter className="w-4 h-4" />
        </button>

        {/* Flex-1 spacer */}
        <div className="flex-1" />

        {/* Square icon (collapse panel) */}
        <button
          className="p-1 text-zinc-500 hover:text-white transition-colors"
          title="Collapse panel"
        >
          <Square className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3. GENERATION GALLERY (Scrollable) */}
      <div className="flex-1 overflow-y-auto no-scrollbar scrollbar-none mt-3 px-3 pb-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 text-xs">
            No generations found matching &quot;{searchQuery}&quot;
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {filteredItems.map((item) => (
              <GenerationCard
                key={item.id}
                item={item}
                isSelected={selectedCard === item.id}
                onSelect={(id) =>
                  setSelectedCard(selectedCard === id ? null : id)
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* 4. BOTTOM PAGINATION BAR */}
      <div className="border-t border-white/10 bg-[#080808] px-4 py-2.5 flex items-center justify-between flex-shrink-0">
        {/* Left: List & Grid icons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setViewMode("list")}
            className={`p-1 rounded transition-colors ${
              viewMode === "list" ? "text-white" : "text-zinc-500 hover:text-white"
            }`}
            title="List view"
          >
            <LayoutList className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1 rounded transition-colors ${
              viewMode === "grid" ? "text-white" : "text-zinc-500 hover:text-white"
            }`}
            title="Grid view"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right side pagination */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Previous page */}
          <button
            className="bg-[#121212] border border-white/10 hover:bg-[#1a1a1a] rounded px-2 py-1 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Previous page"
          >
            <ChevronLeft className="w-3 h-3" />
          </button>

          {/* Page index */}
          <span className="text-xs text-zinc-400 font-medium px-1">1/1</span>

          {/* Next page */}
          <button
            className="bg-[#121212] border border-white/10 hover:bg-[#1a1a1a] rounded px-2 py-1 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Next page"
          >
            <ChevronRight className="w-3 h-3" />
          </button>

          {/* Separator */}
          <div className="w-[1px] h-3 bg-white/10 mx-0.5" />

          {/* Items per page dropdown */}
          <button className="bg-[#121212] border border-white/10 hover:bg-[#1a1a1a] rounded px-2 py-1 text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer">
            <span>20</span>
            <ChevronDown className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
