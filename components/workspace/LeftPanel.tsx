"use client";

import React, { useRef, useState } from "react";
import {
  ChevronDown,
  Info,
  Crown,
  Clock,
  Sparkles,
  Lightbulb,
  LayoutList,
  Image as ImageIcon,
  X,
  Check,
  FolderOpen,
  Box,
  Search,
  Wand2,
  Ratio,
  Palette,
} from "lucide-react";
import { WorkspaceState } from "@/hooks/useWorkspace";

interface LeftPanelProps {
  workspace: WorkspaceState;
}

const ART_STYLES = [
  { id: "realistic", label: "Realistic" },
  { id: "anime", label: "Anime" },
  { id: "cartoon", label: "Cartoon" },
  { id: "low-poly", label: "Low-Poly" },
  { id: "cinematic", label: "Cinematic" },
];

const PROMPT_SUGGESTIONS = [
  "Cyberpunk neon samurai helmet with glowing horns",
  "Cute chibi adventurer penguin with gold breastplate",
  "Ancient ornate dragon medallion with glowing ruby core",
  "Futuristic sci-fi tactical backpack with solar panels",
];

export function LeftPanel({ workspace }: LeftPanelProps) {
  const {
    activeFeature,
    subMode,
    setSubMode,
    promptText,
    setPromptText,
    artStyle,
    setArtStyle,
    aspectRatio,
    setAspectRatio,
    startImageGeneration,
    uploadedImage,
    uploadedFileName,
    handleFileUpload,
    handleRemoveUpload,
    isGenerating,
    start3DGeneration,
    modelTopology,
    setModelTopology,
    resolution,
    setResolution,
    multiView,
    setMultiView,
    split,
    setSplit,
    showImageGenSuggestion,
    setShowImageGenSuggestion,
    selectedPose,
    setSelectedPose,
    activeTab,
    setActiveTab,
  } = workspace;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Meshy 7.1 - Flagship");

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (e.clipboardData.files && e.clipboardData.files[0]) {
      handleFileUpload(e.clipboardData.files[0]);
    }
  };

  // If user selected "Assets" feature
  if (activeFeature === "assets") {
    return (
      <aside className="fixed left-[56px] top-[48px] w-[345px] h-[calc(100vh-48px)] bg-bg-surface border-r border-border-subtle z-30 select-none overflow-y-auto no-scrollbar scrollbar-none flex flex-col transition-colors">
        <div className="p-4 border-b border-border-subtle">
          <h2 className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-neon-green" />
            Asset Library
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            Browse and manage all your generated 2D images and 3D models.
          </p>
        </div>

        <div className="p-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-text-muted" />
            <input
              type="text"
              placeholder="Filter assets..."
              className="w-full bg-bg-surface-secondary border border-border-subtle rounded-xl pl-8 pr-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted outline-none focus:border-neon-green/60 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            {workspace.galleryItems.map((item) => (
              <div
                key={item.id}
                onClick={() => workspace.setSelectedCard(item.id)}
                className={`p-2.5 rounded-xl bg-bg-surface-secondary/50 hover:bg-bg-surface-hover cursor-pointer transition-all border ${
                  workspace.selectedCard === item.id
                    ? "border-neon-green ring-1 ring-neon-green/30 shadow-md"
                    : "border-border-subtle"
                }`}
              >
                <div
                  className="w-full h-20 rounded-lg flex items-center justify-center mb-2"
                  style={{
                    background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
                  }}
                >
                  {item.type === "image" ? (
                    <ImageIcon className="w-8 h-8 text-white/70" />
                  ) : (
                    <Box className="w-8 h-8 text-white/70" />
                  )}
                </div>
                <div className="text-xs font-medium text-text-primary truncate">
                  {item.title}
                </div>
                <div className="text-[10px] text-text-muted flex items-center justify-between mt-1">
                  <span>{item.category}</span>
                  <span className="text-neon-green font-semibold">{item.type.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  // If user selected any other non-Image feature
  if (activeFeature !== "image") {
    return (
      <aside className="fixed left-[56px] top-[48px] w-[345px] h-[calc(100vh-48px)] bg-bg-surface border-r border-border-subtle z-30 select-none overflow-y-auto no-scrollbar scrollbar-none flex flex-col items-center justify-center p-6 text-center transition-colors">
        <div className="w-14 h-14 rounded-2xl bg-bg-surface-secondary border border-border-subtle flex items-center justify-center mb-4 text-neon-green shadow-sm">
          <Sparkles className="w-7 h-7 text-neon-green" />
        </div>
        <h3 className="text-base font-semibold text-text-primary capitalize">
          {activeFeature} Mode
        </h3>
        <p className="text-xs text-text-secondary mt-2 max-w-xs leading-relaxed">
          The {activeFeature} workflow module is coming soon. Switch back to Image mode to generate 2D images or 3D models.
        </p>
        <button
          onClick={() => workspace.setActiveFeature("image")}
          className="mt-6 btn-primary font-bold text-xs px-5 py-2.5 rounded-xl shadow-[0_0_15px_rgba(0,255,163,0.3)] transition-all cursor-pointer"
        >
          Return to Studio
        </button>
      </aside>
    );
  }

  return (
    <aside
      onPaste={handlePaste}
      className="fixed left-[56px] top-[48px] w-[345px] h-[calc(100vh-48px)] bg-bg-surface border-r border-border-subtle z-30 select-none overflow-y-auto no-scrollbar scrollbar-none flex flex-col transition-colors"
    >
      {/* 1. TOP — Asset Type Tabs (3 tabs row) */}
      <div className="mt-3 mx-3 flex items-center justify-between gap-2">
        {/* Tab 1: Image-to-3D */}
        <button
          onClick={() => {
            setActiveTab(0);
            setSubMode("image-to-3d");
          }}
          className={`rounded-xl w-[95px] h-[72px] flex flex-col items-center justify-center gap-1.5 cursor-pointer border transition-all ${
            activeTab === 0 && subMode === "image-to-3d"
              ? "border-neon-green/40 bg-neon-green/10 shadow-sm text-text-primary font-semibold"
              : "border-border-subtle bg-bg-surface-secondary text-text-secondary hover:text-text-primary hover:border-border-secondary"
          }`}
          title="Image-to-3D Mode"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderBottom: "15px solid #00ffa3",
                transform: "rotate(-12deg)",
                position: "absolute",
                left: "4px",
                top: "4px",
                filter: "drop-shadow(0 0 6px rgba(0,255,163,0.4))",
              }}
            />
            <div className="w-4 h-4 rounded-full bg-[#00c3ff] absolute right-2 bottom-1 opacity-90 shadow-[0_0_6px_rgba(0,195,255,0.4)]" />
          </div>
          <span className="text-[9px] font-medium">3D Model</span>
        </button>

        {/* Tab 2: Text-to-Image Generation */}
        <button
          onClick={() => {
            setActiveTab(1);
            setSubMode("image-gen");
          }}
          className={`rounded-xl w-[95px] h-[72px] flex flex-col items-center justify-center gap-1.5 cursor-pointer border transition-all ${
            activeTab === 1 || subMode === "image-gen"
              ? "border-neon-green/40 bg-neon-green/10 shadow-sm text-text-primary font-semibold"
              : "border-border-subtle bg-bg-surface-secondary text-text-secondary hover:text-text-primary hover:border-border-secondary"
          }`}
          title="Text-to-Image Generation"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="w-3.5 h-3.5 rounded-full bg-[#00ffa3] absolute top-1 left-2 shadow-[0_0_6px_rgba(0,255,163,0.4)]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#00c3ff] absolute top-3 right-1.5 shadow-[0_0_6px_rgba(0,195,255,0.4)]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#6300ff] absolute bottom-1 left-3.5 shadow-[0_0_6px_rgba(99,0,255,0.4)]" />
          </div>
          <span className="text-[9px] font-medium">Generate 2D</span>
        </button>

        {/* Tab 3: Asset Library Quick View */}
        <button
          onClick={() => {
            setActiveTab(2);
            workspace.setActiveFeature("assets");
          }}
          className={`rounded-xl w-[95px] h-[72px] flex flex-col items-center justify-center gap-1.5 cursor-pointer border transition-all ${
            activeTab === 2
              ? "border-neon-green/40 bg-neon-green/10 shadow-sm text-text-primary font-semibold"
              : "border-border-subtle bg-bg-surface-secondary text-text-secondary hover:text-text-primary hover:border-border-secondary"
          }`}
          title="Assets Library"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="w-4 h-4 rounded-[3px] bg-[#00ffa3] absolute top-1 left-1.5 rotate-[-8deg] shadow opacity-90" />
            <div className="w-4 h-4 rounded-[3px] bg-[#00c3ff] absolute top-2 right-1.5 rotate-[12deg] shadow opacity-90" />
            <div className="w-4 h-4 rounded-[3px] bg-[#6300ff] absolute bottom-1 left-2.5 rotate-[4deg] shadow opacity-95" />
          </div>
          <span className="text-[9px] font-medium">Library</span>
        </button>
      </div>

      {/* Synchronized Mode Switcher Pill */}
      <div className="mt-3 mx-3 bg-bg-surface-secondary rounded-xl p-1 flex border border-border-subtle">
        <button
          onClick={() => setSubMode("image-to-3d")}
          className={`flex-1 text-xs py-1.5 text-center rounded-lg font-medium transition-all cursor-pointer ${
            subMode === "image-to-3d"
              ? "bg-bg-surface text-text-primary shadow-sm font-bold border border-border-subtle"
              : "text-text-muted hover:text-text-primary"
          }`}
        >
          Image to 3D
        </button>
        <button
          onClick={() => setSubMode("image-gen")}
          className={`flex-1 text-xs py-1.5 text-center rounded-lg font-medium transition-all cursor-pointer ${
            subMode === "image-gen"
              ? "bg-bg-surface text-text-primary shadow-sm font-bold border border-border-subtle"
              : "text-text-muted hover:text-text-primary"
          }`}
        >
          Generate Image
        </button>
      </div>

      {/* ======================================================== */}
      {/* WORKFLOW 1: TEXT-TO-IMAGE GENERATION                     */}
      {/* ======================================================== */}
      {subMode === "image-gen" ? (
        <div className="flex flex-col mt-4">
          {/* Prompt Section */}
          <div className="mx-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-text-primary flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-neon-green" />
                Prompt
              </span>
              <button
                onClick={() => {
                  const randomPrompt =
                    PROMPT_SUGGESTIONS[
                      Math.floor(Math.random() * PROMPT_SUGGESTIONS.length)
                    ];
                  setPromptText(randomPrompt);
                }}
                className="text-[11px] text-neon-green hover:underline font-medium transition-colors cursor-pointer"
              >
                Surprise me
              </button>
            </div>

            <textarea
              rows={3}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Describe the 3D asset you envision (e.g. Cyberpunk samurai helmet with glowing horns)..."
              className="w-full bg-bg-surface-secondary/60 border border-border-subtle focus:border-neon-green/60 rounded-xl p-3 text-xs text-text-primary placeholder:text-text-muted outline-none resize-none leading-relaxed transition-colors"
            />

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {PROMPT_SUGGESTIONS.slice(0, 2).map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setPromptText(item)}
                  className="bg-bg-surface-secondary hover:bg-bg-surface-hover border border-border-subtle text-text-secondary hover:text-text-primary text-[10px] px-2 py-1 rounded-md transition-colors truncate max-w-full text-left cursor-pointer"
                >
                  ✦ {item}
                </button>
              ))}
            </div>
          </div>

          {/* Art Style Selector */}
          <div className="mt-5 mx-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Palette className="w-3.5 h-3.5 text-text-muted" />
              <span className="text-xs font-medium text-text-primary">Art Style</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {ART_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setArtStyle(style.id)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium text-center transition-all cursor-pointer ${
                    artStyle === style.id
                      ? "bg-neon-green/10 text-neon-green border border-neon-green/30 shadow-sm font-semibold"
                      : "bg-bg-surface-secondary border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover"
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio */}
          <div className="mt-5 mx-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Ratio className="w-3.5 h-3.5 text-text-muted" />
              <span className="text-xs font-medium text-text-primary">Aspect Ratio</span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {["1:1", "16:9", "9:16", "4:3"].map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`py-1.5 text-xs font-medium rounded-lg text-center transition-all cursor-pointer ${
                    aspectRatio === ratio
                      ? "bg-neon-green/10 text-neon-green border border-neon-green/30 shadow-sm font-semibold"
                      : "bg-bg-surface-secondary border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover"
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          {/* Cost Row */}
          <div className="mt-5 mx-3 flex items-center justify-between py-1">
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <Clock className="w-3 h-3 text-text-muted" />
              <span>~15 sec</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm" role="img" aria-label="coins">
                🪙
              </span>
              <span className="text-sm font-semibold text-text-primary">10</span>
            </div>
          </div>

          {/* Generate 2D Image Button */}
          <div className="mt-4 mx-3 mb-6">
            <button
              disabled={isGenerating}
              onClick={startImageGeneration}
              className={`btn-primary w-full h-[52px] rounded-xl flex items-center justify-center gap-2 select-none ${
                isGenerating ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#050508] stroke-[2.5]" />
              <span className="text-base font-bold tracking-tight text-[#050508]">
                {isGenerating ? "Synthesizing 2D..." : "Generate 2D Image"}
              </span>
            </button>
          </div>
        </div>
      ) : (
        /* ======================================================== */
        /* WORKFLOW 2: IMAGE-TO-3D MODELING                         */
        /* ======================================================== */
        <div className="flex flex-col">
          {/* AI Model Selector */}
          <div className="mt-4 mx-3">
            <div className="bg-bg-surface-secondary border border-border-subtle rounded-xl p-1 flex">
              <button
                onClick={() => setModelTopology("high-detail")}
                className={`flex-1 text-xs py-2 text-center rounded-lg cursor-pointer transition-all ${
                  modelTopology === "high-detail"
                    ? "bg-bg-surface text-text-primary border border-border-subtle font-semibold shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                High Detail
              </button>
              <button
                onClick={() => setModelTopology("smart-topology")}
                className={`flex-1 text-xs py-2 text-center rounded-lg cursor-pointer transition-all ${
                  modelTopology === "smart-topology"
                    ? "bg-bg-surface text-text-primary border border-border-subtle font-semibold shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Smart Topology
              </button>
            </div>

            {/* Model dropdown pill */}
            <div className="relative mt-2">
              <div
                onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                className="w-full bg-bg-surface-secondary/70 border border-border-subtle rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-bg-surface-hover hover:border-border-secondary transition-colors"
              >
                <div>
                  <div className="text-sm font-medium text-text-primary">
                    {selectedModel}
                  </div>
                  <div className="text-[11px] text-text-muted mt-0.5">
                    Most detail, highest precision
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-text-muted transition-transform ${
                    modelDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {modelDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-bg-surface border border-border-subtle rounded-xl shadow-2xl py-1 z-50 text-xs backdrop-blur-2xl">
                  {[
                    { name: "Meshy 7.1 - Flagship", desc: "Most detail, highest precision" },
                    { name: "Meshy 7.0 - Pro", desc: "Balanced speed and detail" },
                    { name: "Meshy Fast - Turbo", desc: "Ultra-fast preview generation" },
                  ].map((m) => (
                    <div
                      key={m.name}
                      onClick={() => {
                        setSelectedModel(m.name);
                        setModelDropdownOpen(false);
                      }}
                      className="px-4 py-2.5 hover:bg-bg-surface-hover cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div>
                        <div className="font-medium text-text-primary">{m.name}</div>
                        <div className="text-[10px] text-text-muted">{m.desc}</div>
                      </div>
                      {selectedModel === m.name && (
                        <Check className="w-3.5 h-3.5 text-neon-green" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* IMAGE UPLOAD SECTION */}
          <div className="mt-6 mx-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-primary">Image</span>
              <div className="flex items-center gap-2">
                <button
                  className="text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                  title="Tip: Use clean high-contrast images for best 3D meshes"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                </button>
                <button
                  className="text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                  title="Recent upload history"
                >
                  <LayoutList className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Upload zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`mt-2 bg-bg-surface-secondary/40 border-2 border-dashed rounded-xl h-[140px] flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group ${
                isDragging
                  ? "border-neon-green bg-neon-green/5"
                  : uploadedImage
                  ? "border-border-secondary hover:border-neon-green/40"
                  : "border-border-subtle hover:border-neon-green/40"
              }`}
            >
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

              {uploadedImage ? (
                <div className="relative w-full h-full flex items-center justify-center p-2 bg-bg-surface-secondary/80">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={uploadedImage}
                    alt="Uploaded preview"
                    className="max-h-full max-w-full object-contain rounded-lg shadow-md"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveUpload();
                    }}
                    className="absolute top-2 right-2 w-6 h-6 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors shadow border border-white/20"
                    title="Remove image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-bg-surface/90 backdrop-blur px-2 py-0.5 rounded text-[10px] text-text-primary max-w-[200px] truncate border border-border-subtle">
                    {uploadedFileName || "Source Image Ready"}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center px-4">
                  <ImageIcon className="w-7 h-7 text-text-muted group-hover:text-neon-green transition-colors" />
                  <p className="text-sm text-text-primary mt-2 font-medium">
                    Click / Drag & Drop / Paste Image
                  </p>
                  <p className="text-[11px] text-text-muted mt-1">
                    Supported Formats: .png, .jpg, .jpeg, .webp
                  </p>
                  <p className="text-[11px] text-text-faint">Max size: 20MB</p>
                </div>
              )}
            </div>

            {/* 3 small character pose reference thumbnails */}
            <div className="flex items-center gap-2 mt-2.5 justify-between">
              {[0, 1, 2].map((idx) => {
                const isPoseSelected = selectedPose === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedPose(isPoseSelected ? null : idx)}
                    className={`flex-1 h-16 bg-bg-surface-secondary rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                      isPoseSelected
                        ? "border-neon-green bg-neon-green/10 shadow-sm text-neon-green"
                        : "border-border-subtle hover:border-border-secondary text-text-muted hover:text-text-primary"
                    }`}
                    title={`Pose Reference ${idx + 1}`}
                  >
                    <svg
                      viewBox="0 0 32 32"
                      className="w-8 h-8 transition-colors"
                      fill="currentColor"
                    >
                      {idx === 0 && (
                        <>
                          <circle cx="16" cy="7" r="3.5" />
                          <path
                            d="M16 11 L16 22 M16 22 L11 30 M16 22 L21 30 M8 15 L24 15"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </>
                      )}
                      {idx === 1 && (
                        <>
                          <circle cx="16" cy="6.5" r="3.5" />
                          <path
                            d="M16 10.5 L16 21 M16 21 L12 30 M16 21 L20 30 M16 13 L9 22 M16 13 L23 22"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </>
                      )}
                      {idx === 2 && (
                        <>
                          <circle cx="17" cy="6.5" r="3.5" />
                          <path
                            d="M16 10.5 L15 20 M15 20 L8 28 M15 20 L22 27 M16 13 L10 17 M16 13 L23 11"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </>
                      )}
                    </svg>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MULTI-VIEW TOGGLE */}
          <div className="mt-4 mx-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-text-primary">Multi-view</span>
              <Info className="w-3 h-3 text-text-muted" />
            </div>
            <div className="flex items-center gap-2">
              <Crown className="w-3.5 h-3.5 text-[#0284c7] dark:text-[#00c3ff]" />
              <button
                onClick={() => setMultiView(!multiView)}
                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                  multiView ? "bg-gradient-to-r from-[#00ffa3] to-[#00c3ff]" : "bg-border-secondary dark:bg-white/[0.08]"
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full transition-transform absolute top-[3px] shadow-sm ${
                    multiView ? "left-[19px] bg-[#050508]" : "left-[3px] bg-white dark:bg-white/80"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* GENERATE IMAGE SUGGESTION (Switch to Image-Gen) */}
          {showImageGenSuggestion && (
            <div className="mt-3 mx-3 bg-bg-surface-secondary border border-border-subtle rounded-xl px-3 py-2.5 flex items-start gap-2 relative">
              <Info className="w-3 h-3 text-text-muted mt-0.5 flex-shrink-0" />
              <div className="flex-1 pr-4">
                <p className="text-xs text-text-secondary">
                  No image yet? Generate one first.
                </p>
                <button
                  onClick={() => setSubMode("image-gen")}
                  className="text-xs text-neon-green underline cursor-pointer hover:opacity-80 mt-0.5 inline-block text-left font-medium transition-opacity"
                >
                  🖼 Generate Image
                </button>
              </div>
              <button
                onClick={() => setShowImageGenSuggestion(false)}
                className="absolute top-2.5 right-2.5 text-text-muted hover:text-text-primary cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* MEMORY TO HOLD */}
          <div className="mt-2 mx-3">
            <button className="w-full bg-bg-surface-secondary hover:bg-bg-surface-hover border border-border-subtle rounded-xl px-4 py-2 flex items-center gap-2 cursor-pointer transition-colors">
              <div className="w-5 h-5 bg-gradient-to-tr from-[#00ffa3] to-[#00c3ff] rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_0_8px_rgba(0,255,163,0.3)]">
                <Sparkles className="w-2.5 h-2.5 text-[#050508]" />
              </div>
              <span className="text-xs text-text-secondary font-medium">Memory to Hold</span>
            </button>
          </div>

          {/* RESOLUTION */}
          <div className="mt-5 mx-3">
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-text-primary">Resolution</span>
              <Info className="w-3 h-3 text-text-muted" />
            </div>

            <div className="mt-2 flex gap-2">
              <button
                onClick={() => setResolution("standard")}
                className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  resolution === "standard"
                    ? "bg-neon-green/10 text-neon-green border border-neon-green/30 shadow-sm font-semibold"
                    : "bg-bg-surface-secondary border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover"
                }`}
              >
                Standard
              </button>

              <button
                onClick={() => setResolution("ultra-2k")}
                className={`flex-1 text-xs py-1.5 rounded-lg font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  resolution === "ultra-2k"
                    ? "bg-neon-green/10 text-neon-green border border-neon-green/30 shadow-sm font-semibold"
                    : "bg-bg-surface-secondary border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover"
                }`}
              >
                <span>Ultra 2K</span>
                <Crown className="w-2.5 h-2.5 text-[#0284c7] dark:text-[#00c3ff]" />
              </button>

              <button
                onClick={() => setResolution("ultra-4k")}
                className={`flex-1 text-xs py-1.5 rounded-lg font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  resolution === "ultra-4k"
                    ? "bg-neon-green/10 text-neon-green border border-neon-green/30 shadow-sm font-semibold"
                    : "bg-bg-surface-secondary border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover"
                }`}
              >
                <span>Ultra 4K</span>
                <Crown className="w-2.5 h-2.5 text-[#0284c7] dark:text-[#00c3ff]" />
              </button>
            </div>
          </div>

          {/* SPLIT TOGGLE */}
          <div className="mt-4 mx-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-text-primary">Split</span>
              <Info className="w-3 h-3 text-text-muted" />
              <Crown className="w-3.5 h-3.5 text-[#0284c7] dark:text-[#00c3ff] ml-0.5" />
            </div>
            <button
              onClick={() => setSplit(!split)}
              className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                split ? "bg-gradient-to-r from-[#00ffa3] to-[#00c3ff]" : "bg-border-secondary dark:bg-white/[0.08]"
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full transition-transform absolute top-[3px] shadow-sm ${
                  split ? "left-[19px] bg-[#050508]" : "left-[3px] bg-white dark:bg-white/80"
                }`}
              />
            </button>
          </div>

          {/* COST DISPLAY */}
          <div className="mt-3 mx-3 flex items-center justify-between py-1">
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <Clock className="w-3 h-3 text-text-muted" />
              <span>1 min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm" role="img" aria-label="coins">
                🪙
              </span>
              <span className="text-sm font-semibold text-text-primary">20</span>
            </div>
          </div>

          {/* GENERATE 3D MODEL BUTTON */}
          <div className="mt-4 mx-3 mb-6">
            <button
              disabled={isGenerating}
              onClick={start3DGeneration}
              className={`btn-primary w-full h-[52px] rounded-xl flex items-center justify-center gap-2 select-none ${
                isGenerating ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#050508] stroke-[2.5]" />
              <span className="text-base font-bold tracking-tight text-[#050508]">
                {isGenerating ? "Generating 3D..." : "Generate 3D Model"}
              </span>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
