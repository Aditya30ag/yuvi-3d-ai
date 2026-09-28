"use client";

import React from "react";
import dynamic from "next/dynamic";
import {
  ArrowUp,
  Sparkles,
  Loader2,
  Download,
  Share2,
  X,
  Wand2,
  ArrowRight,
} from "lucide-react";
import { WorkspaceState } from "@/hooks/useWorkspace";

const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#050505] rounded-2xl border border-white/10">
      <Loader2 className="w-8 h-8 text-white animate-spin mb-2" />
      <span className="text-xs text-zinc-400">Loading 3D Canvas Engine...</span>
    </div>
  ),
});

interface CenterCanvasProps {
  workspace: WorkspaceState;
}

export function CenterCanvas({ workspace }: CenterCanvasProps) {
  const {
    isGenerating,
    generationType,
    generationProgress,
    generationStage,
    cancelGeneration,
    start3DGeneration,
    setSubMode,
    selectedCard,
    setSelectedCard,
    galleryItems,
    convertImageTo3D,
    generatedImageUrl,
  } = workspace;

  const currentItem = galleryItems.find((item) => item.id === selectedCard);

  return (
    <main
      className="flex-1 h-[calc(100vh-48px)] bg-[#050508] overflow-hidden relative select-none flex flex-col"
      style={{
        marginLeft: "401px", // 56px icon sidebar + 345px left panel
        marginRight: "420px", // 420px right panel
      }}
    >
      {/* 1. UPGRADE BANNER (top of center panel) */}
      <div className="w-full bg-white/[0.02] border-b border-white/[0.08] px-6 py-2.5 flex items-center justify-between z-20 flex-shrink-0">
        <p className="text-sm text-white/70 truncate pr-4">
          More assets, faster workflows, and private, commercial-safe exports – just ₹849.5 for your first month.
        </p>
        <button className="btn-primary text-xs font-bold px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(0,255,163,0.25)] flex-shrink-0 cursor-pointer">
          <ArrowUp className="w-3.5 h-3.5 stroke-[2.5] text-[#050508]" />
          <span>Upgrade</span>
        </button>
      </div>

      {/* 2. MAIN STAGE */}
      <div className="relative flex-1 w-full h-full overflow-hidden bg-[#050508]">

        {/* 3. GENERATION IN-PROGRESS STATE */}
        {isGenerating ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-md px-4">
            <div className="glass-card border border-white/[0.08] rounded-2xl p-6 shadow-2xl text-center backdrop-blur-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00ffa3]/50 to-transparent animate-shimmer" />

              <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-4 relative shadow-inner">
                {generationType === "image" ? (
                  <Wand2 className="w-8 h-8 text-[#00ffa3] animate-pulse" />
                ) : (
                  <Loader2 className="w-8 h-8 text-[#00ffa3] animate-spin" />
                )}
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                {generationType === "image"
                  ? "Synthesizing 2D Artwork"
                  : "Generating 3D Asset"}
              </h3>
              <p className="text-xl font-extrabold text-[#00ffa3] mb-2 tracking-wide">
                Generating... {generationProgress}%
              </p>
              <p className="text-xs text-white/50 mb-5">
                {generationStage}
              </p>

              {/* Progress bar */}
              <div className="w-full bg-white/[0.06] h-2.5 rounded-full overflow-hidden mb-6 border border-white/[0.08]">
                <div
                  className="bg-gradient-to-r from-[#00ffa3] to-[#00c3ff] h-full transition-all duration-300 rounded-full shadow-[0_0_12px_rgba(0,255,163,0.5)]"
                  style={{ width: `${generationProgress}%` }}
                />
              </div>

              <button
                onClick={cancelGeneration}
                className="btn-secondary text-xs text-white/70 hover:text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancel Generation
              </button>
            </div>
          </div>
        ) : selectedCard && currentItem ? (
          /* ======================================================== */
          /* 4. ACTIVE SELECTION VIEW: 2D IMAGE OR 3D MODEL           */
          /* ======================================================== */
          <div className="absolute inset-4 z-20 flex flex-col items-center justify-center">
            {currentItem.type === "image" ? (
              /* 4A. 2D GENERATED IMAGE PREVIEW WITH DIRECT CONVERT-TO-3D */
              <div className="w-full max-w-2xl h-[72vh] glass-card border border-white/[0.08] rounded-2xl p-5 flex flex-col relative backdrop-blur-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between mb-3 z-10">
                  <div className="flex items-center gap-2">
                    <span className="badge-cyan text-xs">
                      2D IMAGE SOURCE
                    </span>
                    <h3 className="text-base font-bold text-white truncate max-w-sm">
                      {currentItem.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedCard(null)}
                    className="p-1.5 rounded-lg btn-secondary text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Image canvas display */}
                <div className="flex-1 rounded-xl relative overflow-hidden flex items-center justify-center bg-[#050508]/80 border border-white/[0.08]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentItem.imageUrl || generatedImageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"}
                    alt={currentItem.title}
                    className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                  />
                </div>

                {/* Synchronization Bridge Actions */}
                <div className="mt-4 flex items-center justify-between pt-2 border-t border-white/[0.08]">
                  <div className="text-xs text-white/50 truncate max-w-xs">
                    Style: <span className="text-white font-medium">{currentItem.category}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* The Sync Bridge: Convert 2D image to 3D */}
                    <button
                      onClick={() => convertImageTo3D(currentItem.imageUrl)}
                      className="btn-primary text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,163,0.3)] hover:scale-105 active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5 stroke-[2.5] text-[#050508]" />
                      <span>Convert to 3D Model</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#050508]" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* 4B. 3D MODEL PREVIEW WITH MODEL-VIEWER */
              <div className="w-full max-w-3xl h-[75vh] glass-card border border-white/[0.08] rounded-2xl p-4 flex flex-col relative backdrop-blur-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between mb-3 z-10 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="badge-cyan text-xs">
                      3D MODEL ASSET
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {currentItem.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedCard(null)}
                    className="p-1.5 rounded-lg btn-secondary text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Interactive 3D Model Viewer */}
                <div className="flex-1 rounded-xl overflow-hidden relative border border-white/[0.08] bg-[#050508]/80">
                  <ModelViewer
                    src={currentItem.modelUrl || "https://modelviewer.dev/shared-assets/models/Astronaut.glb"}
                    alt={currentItem.title}
                    className="w-full h-full min-h-[360px]"
                  />
                </div>

                {/* 3D Action Footer */}
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/[0.08] flex-shrink-0">
                  <div className="text-xs text-white/50">
                    Faces:{" "}
                    <span className="text-white font-medium">
                      {currentItem.statistics?.faces ? `${(currentItem.statistics.faces / 1000).toFixed(1)}k` : "35.2k"}
                    </span>{" "}
                    • Vertices:{" "}
                    <span className="text-white font-medium">
                      {currentItem.statistics?.vertices ? `${(currentItem.statistics.vertices / 1000).toFixed(1)}k` : "18.4k"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="btn-secondary text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors">
                      <Share2 className="w-3.5 h-3.5" />
                      Share
                    </button>
                    <a
                      href={currentItem.modelUrl || "https://modelviewer.dev/shared-assets/models/Astronaut.glb"}
                      download="model.glb"
                      className="btn-primary text-xs font-bold px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,255,163,0.3)]"
                    >
                      <Download className="w-3.5 h-3.5 stroke-[2.5] text-[#050508]" />
                      <span>Download GLB</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ======================================================== */
          /* 5. EMPTY STATE WITH NEON SHAPES                          */
          /* ======================================================== */
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 select-none max-w-lg w-full px-4">
            {/* Minimalist Monochrome Neon Shapes */}
            <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "14px solid transparent",
                  borderRight: "14px solid transparent",
                  borderBottom: "28px solid #00ffa3",
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  zIndex: 4,
                  transform: "rotate(-10deg)",
                  filter: "drop-shadow(0 0 12px rgba(0,255,163,0.5))",
                }}
              />
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: "#00c3ff",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "2px",
                  right: "0px",
                  zIndex: 3,
                  boxShadow: "0 0 12px rgba(0,195,255,0.45)",
                }}
              />
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  backgroundColor: "#6300ff",
                  borderRadius: "6px",
                  position: "absolute",
                  bottom: "0px",
                  left: "2px",
                  zIndex: 2,
                  boxShadow: "0 0 12px rgba(99,0,255,0.35)",
                }}
              />
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  backgroundColor: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(4px)",
                  borderRadius: "4px",
                  position: "absolute",
                  bottom: "2px",
                  right: "4px",
                  zIndex: 1,
                  transform: "rotate(45deg)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              />
            </div>

            <h2 className="text-2xl font-bold tracking-tight hero-title mb-2">
              <span className="text-white">What will you </span>
              <span className="accent">create today?</span>
            </h2>

            <p className="mt-3 text-sm text-white/50 max-w-md mx-auto leading-relaxed">
              Generate a new model from image or text, or edit one from your asset library. Your next masterpiece awaits.
            </p>

            {/* Dual Quick Action CTA Buttons */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSubMode("image-gen");
                }}
                className="btn-secondary text-white font-semibold text-sm px-6 py-3 rounded-full flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
              >
                <Wand2 className="w-4 h-4 text-[#00c3ff]" />
                <span>Generate 2D Image</span>
              </button>

              <button
                onClick={start3DGeneration}
                className="btn-primary text-sm px-7 py-3 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,163,0.35)] transition-all hover:scale-105 active:scale-95 cursor-pointer font-bold"
              >
                <Sparkles className="w-4 h-4 text-[#050508] stroke-[2.5]" />
                <span>✦ Generate 3D Model</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
