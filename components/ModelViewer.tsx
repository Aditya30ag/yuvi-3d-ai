"use client";

import { useEffect, useRef, useState } from "react";
import {
  RotateCcw,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Sun,
  Loader2,
  Box,
  Eye,
} from "lucide-react";

interface ModelViewerProps {
  src: string;
  alt?: string;
  poster?: string;
  className?: string;
}

export function ModelViewer({
  src,
  alt = "3D Asset preview",
  poster,
  className = "",
}: ModelViewerProps) {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [exposure, setExposure] = useState<number>(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [bgStyle, setBgStyle] = useState<"dark" | "gradient" | "neutral">("gradient");

  const containerRef = useRef<HTMLDivElement>(null);
  const modelViewerRef = useRef<(HTMLElement & { cameraOrbit?: string; fieldOfView?: string; jumpCameraToGoal?: () => void }) | null>(null);

  useEffect(() => {
    setIsClient(true);
    // Dynamically load @google/model-viewer custom element
    import("@google/model-viewer")
      .then(() => {
        // Element registered
      })
      .catch((err) => {
        console.error("Failed to load @google/model-viewer:", err);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    const viewer = modelViewerRef.current;
    if (!viewer) return;

    const handleLoad = () => {
      setIsLoading(false);
      setHasError(false);
    };

    const handleError = (error: Event) => {
      console.error("model-viewer load error:", error);
      setIsLoading(false);
      setHasError(true);
    };

    viewer.addEventListener("load", handleLoad);
    viewer.addEventListener("error", handleError);

    return () => {
      viewer.removeEventListener("load", handleLoad);
      viewer.removeEventListener("error", handleError);
    };
  }, [src, isClient]);

  const handleResetCamera = () => {
    if (modelViewerRef.current) {
      modelViewerRef.current.cameraOrbit = "0deg 75deg 105%";
      modelViewerRef.current.fieldOfView = "auto";
      modelViewerRef.current.jumpCameraToGoal?.();
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error("Fullscreen request failed", err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.error("Exit fullscreen failed", err);
      });
      setIsFullscreen(false);
    }
  };

  const bgClasses = {
    dark: "bg-[#0a0a0c]",
    gradient: "bg-radial from-zinc-900/90 via-[#0d0d12] to-[#070709]",
    neutral: "bg-zinc-900",
  };

  if (!isClient) {
    return (
      <div className={`w-full h-full min-h-[400px] flex items-center justify-center bg-zinc-950 rounded-2xl border border-zinc-800 ${className}`}>
        <div className="flex flex-col items-center gap-3 text-zinc-500">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
          <p className="text-sm text-zinc-400">Preparing 3D engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[460px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col group ${bgClasses[bgStyle]} ${className}`}
    >
      {/* 3D Canvas */}
      <div className="relative w-full flex-1 min-h-[380px] flex items-center justify-center">
        {src && !hasError && (
          <model-viewer
            ref={modelViewerRef}
            src={src}
            alt={alt}
            poster={poster}
            camera-controls
            auto-rotate={autoRotate}
            rotation-per-second="30deg"
            shadow-intensity="1.5"
            shadow-softness="0.8"
            exposure={exposure}
            touch-action="pan-y"
            className="w-full h-full"
          />
        )}

        {/* Loading Spinner Overlay */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#000000]/80 backdrop-blur-sm z-20 pointer-events-none">
            <div className="relative flex items-center justify-center mb-3">
              <div className="w-16 h-16 rounded-full border-2 border-white/20 border-t-white animate-spin" />
              <Box className="w-6 h-6 text-white absolute" />
            </div>
            <p className="text-sm font-medium text-white">Streaming 3D GLB Asset...</p>
            <p className="text-xs text-zinc-400 mt-1">Interpreting meshes and textures</p>
          </div>
        )}

        {/* Error Fallback */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-3 text-red-400">
              <Box className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-zinc-200">Could not render 3D model</h4>
            <p className="text-xs text-zinc-400 max-w-sm mt-1">
              The 3D model file might be processing or blocked by CORS. You can still download the asset directly using the buttons below.
            </p>
          </div>
        )}

        {/* Interactive Helper Overlay (fades out) */}
        {!isLoading && !hasError && (
          <div className="absolute bottom-4 left-4 pointer-events-none z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-zinc-300 transition-opacity opacity-75 group-hover:opacity-100">
            <Eye className="w-3.5 h-3.5 text-white" />
            <span>Drag to rotate • Scroll to zoom • Right-click to pan</span>
          </div>
        )}
      </div>

      {/* Floating Toolbar */}
      <div className="px-4 py-3 bg-[#0a0a0a]/90 backdrop-blur-md border-t border-white/10 flex items-center justify-between gap-2 z-20">
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Play/Pause Auto-rotate */}
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              autoRotate
                ? "bg-white text-black shadow-sm"
                : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
            title={autoRotate ? "Pause auto-rotation" : "Enable auto-rotation"}
          >
            {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{autoRotate ? "Rotating" : "Rotate"}</span>
          </button>

          {/* Reset Camera */}
          <button
            type="button"
            onClick={handleResetCamera}
            className="p-2 rounded-lg bg-zinc-800/70 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors text-xs font-medium flex items-center gap-1.5"
            title="Reset Camera View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Exposure / Lighting */}
          <button
            type="button"
            onClick={() => setExposure(exposure >= 1.5 ? 0.7 : exposure + 0.4)}
            className="p-2 rounded-lg bg-zinc-800/70 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors text-xs font-medium flex items-center gap-1.5"
            title="Toggle Light Exposure"
          >
            <Sun className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Light</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Background tone selector */}
          <div className="flex items-center p-0.5 rounded-lg bg-zinc-900 border border-white/10">
            <button
              type="button"
              onClick={() => setBgStyle("gradient")}
              className={`px-2 py-1 text-[11px] rounded transition-colors ${
                bgStyle === "gradient" ? "bg-white text-black font-semibold shadow-sm" : "text-zinc-400 hover:text-white"
              }`}
            >
              Studio
            </button>
            <button
              type="button"
              onClick={() => setBgStyle("dark")}
              className={`px-2 py-1 text-[11px] rounded transition-colors ${
                bgStyle === "dark" ? "bg-white text-black font-semibold shadow-sm" : "text-zinc-400 hover:text-white"
              }`}
            >
              Dark
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-zinc-800/70 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
export default ModelViewer;
