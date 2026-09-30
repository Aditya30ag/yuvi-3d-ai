"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  Grid3X3,
  Sun,
  Eye,
  Settings2,
  Download,
  Share2,
  Wand2,
  Trash2,
  RefreshCw,
  Upload,
  Loader2,
  ArrowDownToLine,
  Check,
} from "lucide-react";
import { GenerationItem, MeshyImageTask, MeshyImage3DTask } from "@/lib/meshy";

interface CenterViewerProps {
  generation: GenerationItem | null;
  isGenerating: boolean;
  generatingProgress: number;
  onUseFor3D: (imageUrl: string) => void;
  onRegenerate?: () => void;
  bgColor?: string;
}

export function CenterViewer({
  generation,
  isGenerating,
  generatingProgress,
  onUseFor3D,
  onRegenerate,
  bgColor = "transparent",
}: CenterViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelViewerRef = useRef<(HTMLElement & {
    cameraOrbit?: string;
    fieldOfView?: string;
    jumpCameraToGoal?: () => void;
    model?: {
      materials?: Array<{
        pbrMetallicRoughness?: {
          setRoughnessFactor: (val: number) => void;
        };
      }>;
    };
  }) | null>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wireframeActive, setWireframeActive] = useState(false);
  const [lightingExposure, setLightingExposure] = useState(1.0);
  const [showStats, setShowStats] = useState(true);
  const [showDownloadPopover, setShowDownloadPopover] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Dynamically ensure model-viewer is loaded
  useEffect(() => {
    import("@google/model-viewer").catch((err) => {
      console.warn("Could not import @google/model-viewer:", err);
    });
  }, []);

  // Determine if generation is Image or 3D
  const isImageTask = generation && (
    generation.type === "image" ||
    ("image_urls" in generation && Boolean(generation.image_urls?.length))
  );

  const is3DTask = generation && (
    generation.type === "3d" ||
    ("model_urls" in generation && Boolean(generation.model_urls?.glb))
  );

  const glbUrl = is3DTask
    ? (generation as MeshyImage3DTask).model_urls?.glb
    : null;

  const imageUrl = isImageTask
    ? (generation as MeshyImageTask).image_urls?.[0]
    : null;

  // Camera reset
  const handleResetCamera = () => {
    if (modelViewerRef.current) {
      modelViewerRef.current.cameraOrbit = "0deg 75deg 105%";
      modelViewerRef.current.fieldOfView = "auto";
      modelViewerRef.current.jumpCameraToGoal?.();
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Wireframe toggle (roughness emulation on material)
  const toggleWireframe = () => {
    setWireframeActive((prev) => !prev);
    if (modelViewerRef.current?.model?.materials?.[0]?.pbrMetallicRoughness) {
      const pbr = modelViewerRef.current.model.materials[0].pbrMetallicRoughness;
      pbr.setRoughnessFactor(wireframeActive ? 0.4 : 1.0);
    }
  };

  // Lighting toggle: rotate exposures [0.6, 1.0, 1.5, 2.0]
  const toggleLighting = () => {
    const exposures = [0.6, 1.0, 1.5, 2.0];
    const currentIndex = exposures.indexOf(lightingExposure);
    const nextIndex = (currentIndex + 1) % exposures.length;
    setLightingExposure(exposures[nextIndex]);
  };

  // Download GLB or Image
  const handleDownloadFile = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(url, "_blank");
    }
  };

  // Share link
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const formatNumber = (val: number | undefined) => {
    if (val === undefined || val === null) return "0";
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const stats = (generation as MeshyImage3DTask)?.statistics || {
    faces: 3133220,
    vertices: 1631084,
  };
  const topology = (generation as MeshyImage3DTask)?.topology || "Triangle";

  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: bgColor !== "transparent" ? bgColor : undefined }}
      className="flex-1 h-full relative flex flex-col min-w-0 select-none overflow-hidden bg-bg-base transition-colors"
    >
      {/* ================= TOP BAR (inside center panel) ================= */}
      <div className="h-[40px] w-full bg-bg-surface border-b border-border-subtle flex items-center justify-between px-3 z-20 flex-shrink-0">
        <div className="flex items-center gap-1">
          {/* Reset Camera */}
          <button
            onClick={handleResetCamera}
            title="Reset Camera"
            className="p-1.5 rounded text-text-muted hover:text-text-primary hover:bg-bg-surface-hover transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            className="p-1.5 rounded text-text-muted hover:text-text-primary hover:bg-bg-surface-hover transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Wireframe toggle */}
          <button
            onClick={toggleWireframe}
            title={wireframeActive ? "Shaded View" : "Wireframe Toggle"}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              wireframeActive
                ? "text-text-primary bg-bg-surface-secondary border border-border-subtle"
                : "text-text-muted hover:text-text-primary hover:bg-bg-surface-hover"
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>

          {/* Sun / Lighting toggle */}
          <button
            onClick={toggleLighting}
            title={`Exposure: ${lightingExposure.toFixed(1)}`}
            className="p-1.5 rounded text-text-muted hover:text-text-primary hover:bg-bg-surface-hover transition-colors cursor-pointer"
          >
            <Sun className="w-4 h-4" />
          </button>

          {/* Eye / Visibility toggle */}
          <button
            onClick={() => setShowStats(!showStats)}
            title={showStats ? "Hide Mesh Info" : "Show Mesh Info"}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              showStats
                ? "text-text-primary"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Separator */}
          <div className="w-[1px] h-4 bg-border-subtle mx-1" />

          {/* Settings2 */}
          <button
            title="Viewer Settings"
            className="p-1.5 rounded text-text-muted hover:text-text-primary hover:bg-bg-surface-hover transition-colors cursor-pointer"
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </div>

        {/* Right tag / indicator */}
        <div className="flex items-center gap-2">
          {is3DTask && (
            <span className="text-[11px] text-text-muted uppercase tracking-wider font-mono">
              WebGL 2.0 / PBR
            </span>
          )}
        </div>
      </div>

      {/* ================= MAIN VIEWER CANVAS ================= */}
      <div className="relative flex-1 w-full h-[calc(100%-88px)] flex items-center justify-center overflow-hidden">
        {/* State 1: Generation In Progress */}
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center gap-4 z-10">
            <div className="relative w-24 h-24 rounded-full flex items-center justify-center animate-pulse bg-neon-green/10 border border-neon-green/30">
              <Loader2 className="w-10 h-10 animate-spin text-neon-green" />
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="text-text-primary text-sm font-semibold">
                Synthesizing Neural Asset
              </span>
              <span className="text-xs text-text-muted">
                {generatingProgress}% completed
              </span>
            </div>
          </div>
        ) : !generation ? (
          /* State 2: Empty State */
          <div className="flex flex-col items-center justify-center text-center p-6 select-none">
            <div className="w-12 h-12 rounded-xl bg-bg-surface-secondary border border-border-subtle flex items-center justify-center mb-3">
              <Upload className="w-6 h-6 text-text-muted" />
            </div>
            <p className="text-text-primary text-[14px] font-semibold">
              No generation selected
            </p>
            <p className="text-text-secondary text-[12px] mt-1 max-w-xs">
              Select a generation from the panel or create a new one
            </p>
          </div>
        ) : isImageTask && imageUrl ? (
          /* State 3: Generated Image Viewer */
          <div className="relative w-full h-full flex items-center justify-center p-6 animate-fadeIn">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={generation.name || "Generated concept"}
              className="max-w-2xl max-h-full object-contain rounded-lg shadow-xl transition-opacity duration-300"
            />
          </div>
        ) : is3DTask && glbUrl ? (
          /* State 4: 3D Model Viewer with Stats Overlay */
          <div className="relative w-full h-full">
            {/* Top-left Stats Overlay */}
            {showStats && (
              <div className="absolute top-3 left-3 z-10 bg-bg-surface/90 backdrop-blur-md rounded-md px-3 py-2 border border-border-subtle shadow-md flex flex-col gap-1 min-w-[130px] pointer-events-none">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-muted">Topology</span>
                  <span className="text-text-primary font-medium ml-3">{topology}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-muted">Faces</span>
                  <span className="text-text-primary font-medium ml-3 font-mono">
                    {formatNumber(stats.faces)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-muted">Vertices</span>
                  <span className="text-text-primary font-medium ml-3 font-mono">
                    {formatNumber(stats.vertices)}
                  </span>
                </div>
              </div>
            )}

            {/* <model-viewer> filling full center panel */}
            <model-viewer
              ref={modelViewerRef}
              src={glbUrl}
              auto-rotate
              camera-controls
              background-color="transparent"
              exposure={lightingExposure}
              rotation-per-second="25deg"
              shadow-intensity="1.5"
              shadow-softness="0.9"
              touch-action="pan-y"
              style={{
                width: "100%",
                height: "100%",
                background: bgColor !== "transparent" ? bgColor : undefined,
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-6">
            <span className="text-text-muted text-sm">Asset unavailable</span>
          </div>
        )}
      </div>

      {/* ================= BOTTOM ACTION BAR (48px) ================= */}
      {generation && !isGenerating && (
        <div className="h-[48px] w-full bg-bg-surface border-t border-border-subtle flex items-center justify-center px-4 gap-2 z-20 flex-shrink-0 relative">
          {isImageTask ? (
            /* Image Bottom Bar Actions */
            <div className="flex items-center gap-2">
              {/* Download */}
              <button
                onClick={() => imageUrl && handleDownloadFile(imageUrl, "concept-art.png")}
                title="Download Image"
                className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-surface-hover transition-colors cursor-pointer"
              >
                <ArrowDownToLine className="w-4 h-4" />
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                title="Share Image"
                className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-surface-hover transition-colors cursor-pointer"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              </button>

              {/* Wand2 ("Use for 3D") */}
              <button
                onClick={() => imageUrl && onUseFor3D(imageUrl)}
                title="Use for 3D"
                className="p-2 rounded-lg text-neon-green hover:underline hover:bg-neon-green/10 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              >
                <Wand2 className="w-4 h-4 text-neon-green" />
                <span>Use for 3D</span>
              </button>

              {/* Trash */}
              <button
                title="Delete"
                className="p-2 rounded-lg text-text-muted hover:text-red-500 hover:bg-bg-surface-hover transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Separator */}
              <div className="w-[1px] h-4 bg-border-subtle mx-1" />

              {/* Neon pill button: "NEW" badge + download icon */}
              <button
                onClick={() => imageUrl && handleDownloadFile(imageUrl, "hd-concept.png")}
                className="btn-primary text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(0,255,163,0.25)] cursor-pointer"
              >
                <span className="badge-cyan text-[8px] py-0 px-1 leading-tight">
                  NEW
                </span>
                <Download className="w-3.5 h-3.5 text-[#050508]" />
              </button>
            </div>
          ) : (
            /* 3D Bottom Bar Actions */
            <div className="flex items-center gap-2 relative">
              {/* RefreshCw (regenerate) */}
              <button
                onClick={onRegenerate}
                title="Regenerate"
                className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-surface-hover transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              {/* Share2 */}
              <button
                onClick={handleShare}
                title="Share 3D Model"
                className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-surface-hover transition-colors cursor-pointer"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              </button>

              {/* Settings2 (post-processing) */}
              <button
                title="Post-processing"
                className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-surface-hover transition-colors cursor-pointer"
              >
                <Settings2 className="w-4 h-4" />
              </button>

              {/* Separator */}
              <div className="w-[1px] h-4 bg-border-subtle mx-1" />

              {/* Download green pill button with format selector popover */}
              <div className="relative">
                <button
                  onClick={() => setShowDownloadPopover(!showDownloadPopover)}
                  className="btn-primary text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(0,255,163,0.25)] cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#050508]" />
                  <span>Download</span>
                </button>

                {/* Popover above the button */}
                {showDownloadPopover && (
                  <div className="absolute bottom-[44px] left-1/2 -translate-x-1/2 w-48 bg-bg-surface rounded-xl border border-border-subtle p-3 shadow-2xl z-50 flex flex-col gap-1.5 animate-fadeIn">
                    <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium px-1 mb-1">
                      Export Formats
                    </span>
                    {["GLB", "OBJ", "FBX", "STL", "USDZ"].map((format) => {
                      const modelUrls = (generation as MeshyImage3DTask)?.model_urls;
                      const downloadUrl =
                        format === "GLB"
                          ? modelUrls?.glb
                          : format === "OBJ"
                          ? modelUrls?.obj || modelUrls?.glb
                          : format === "FBX"
                          ? modelUrls?.fbx || modelUrls?.glb
                          : format === "STL"
                          ? modelUrls?.stl || modelUrls?.glb
                          : modelUrls?.usdz || modelUrls?.glb;

                      return (
                        <button
                          key={format}
                          onClick={() => {
                            if (downloadUrl) {
                              handleDownloadFile(downloadUrl, `model.${format.toLowerCase()}`);
                            }
                          }}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-bg-surface-hover text-left transition-colors group cursor-pointer"
                        >
                          <span className="text-sm text-text-primary font-medium">{format}</span>
                          <Download className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary transition-colors" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
