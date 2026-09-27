/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  Box,
  Upload,
  Link as LinkIcon,
  Download,
  Loader2,
  Sparkles,
  Layers,
  CheckCircle2,
  Clock,
  ChevronRight,
} from "lucide-react";
import {
  ImageTo3DPayload,
  Poll3DResponse,
  createImageTo3DTask,
  poll3DTask,
  uploadImageFile,
} from "@/lib/meshy";
import { ModelViewer } from "./ModelViewer";

interface ModelHistoryItem {
  id: string;
  sourceImageUrl: string;
  modelUrls: {
    glb?: string;
    obj?: string;
    fbx?: string;
    usdz?: string;
  };
  createdAt: number;
}

export function ImageTo3D() {
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);

  // Settings
  const [enablePbr, setEnablePbr] = useState(true);
  const [targetFormats, setTargetFormats] = useState<string[]>(["glb", "obj"]);
  const [poseMode, setPoseMode] = useState<string>("default");

  // Output
  const [currentModel, setCurrentModel] = useState<{
    glb?: string;
    obj?: string;
    fbx?: string;
    usdz?: string;
  } | null>(null);

  const [recentModels, setRecentModels] = useState<ModelHistoryItem[]>([]);
  const [transferredFromGenerator, setTransferredFromGenerator] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check for preloaded image from sessionStorage (from ImageGenerator "Use for 3D →")
  useEffect(() => {
    try {
      const transferredImage = sessionStorage.getItem("studio3d_selected_image");
      if (transferredImage) {
        setImageUrl(transferredImage);
        setPreviewUrl(transferredImage);
        setTransferredFromGenerator(true);
        // Clear after picking up
        sessionStorage.removeItem("studio3d_selected_image");
        toast.success("Loaded concept art from Image Generator!");
      }

      // Load recent 3D models history
      const savedHistory = sessionStorage.getItem("studio3d_recent_models");
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed)) {
          setRecentModels(parsed.slice(0, 3));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveModelToHistory = (item: ModelHistoryItem) => {
    try {
      const updated = [item, ...recentModels.filter((m) => m.id !== item.id)].slice(0, 3);
      setRecentModels(updated);
      sessionStorage.setItem("studio3d_recent_models", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, []);

  // Handle local file upload
  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (PNG, JPG, or WEBP)");
      return;
    }

    setIsUploading(true);
    try {
      // Local immediate object URL for instant UI preview
      const localPreview = URL.createObjectURL(file);
      setPreviewUrl(localPreview);

      // Upload via POST /api/upload
      const uploadedUrl = await uploadImageFile(file);
      setImageUrl(uploadedUrl);
      setTransferredFromGenerator(false);
      toast.success("Image uploaded successfully");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload image";
      toast.error(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleApplyUrlInput = () => {
    if (!urlInput.trim()) return;
    setImageUrl(urlInput.trim());
    setPreviewUrl(urlInput.trim());
    setTransferredFromGenerator(false);
    toast.success("Image URL applied");
  };

  const handleStartConversion = async () => {
    if (!imageUrl) {
      toast.error("Please upload or provide an image URL first");
      return;
    }

    setIsConverting(true);
    setProgress(0);
    setCurrentModel(null);

    try {
      const payload: ImageTo3DPayload = {
        image_url: imageUrl,
        enable_pbr: enablePbr,
        target_formats: targetFormats,
        pose_mode: poseMode !== "default" ? poseMode : undefined,
      };

      const createdTaskId = await createImageTo3DTask(payload);
      toast.success("3D reconstruction started. Polling Meshy engine...");

      // Poll every 3 seconds
      pollIntervalRef.current = setInterval(async () => {
        try {
          const statusData: Poll3DResponse = await poll3DTask(createdTaskId);

          if (statusData.progress) {
            setProgress(statusData.progress);
          }

          if (statusData.status === "SUCCEEDED") {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
            setIsConverting(false);
            setProgress(100);

            const urls = statusData.model_urls || {};
            setCurrentModel(urls);
            toast.success("3D Model reconstructed successfully!");

            // Save to history
            saveModelToHistory({
              id: createdTaskId,
              sourceImageUrl: previewUrl || imageUrl,
              modelUrls: urls,
              createdAt: Date.now(),
            });
          } else if (statusData.status === "FAILED" || statusData.status === "EXPIRED") {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
            setIsConverting(false);
            const errMsg = statusData.task_error?.message || "3D generation failed to complete";
            toast.error(errMsg);
          }
        } catch (pollErr: unknown) {
          console.error("Polling 3D error:", pollErr);
        }
      }, 3000);
    } catch (err: unknown) {
      setIsConverting(false);
      const msg = err instanceof Error ? err.message : "Failed to start 3D generation";
      toast.error(msg);
    }
  };

  const getProgressStage = (pct: number) => {
    if (pct < 25) return "Analyzing depth & surface features...";
    if (pct < 60) return "Generating volumetric mesh & topology...";
    if (pct < 90) return "Synthesizing PBR texture maps...";
    return "Finalizing GLB asset package...";
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-8 h-8 rounded-lg bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center">
              <Box className="w-4 h-4" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Image to 3D
            </h1>
          </div>
          <p className="text-sm text-zinc-400">
            Convert any 2D concept or photo into a textured 3D mesh with standard PBR material maps.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Meshy 3D Engine V1
          </span>
        </div>
      </div>

      {/* Main Grid: Upload & Controls (5 cols) + 3D Viewer (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input and Parameters */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#111115] border border-zinc-800/80 shadow-xl space-y-5">
            {/* Transferred Badge if loaded from image generator */}
            {transferredFromGenerator && (
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-violet-950/40 border border-violet-500/30 text-xs text-violet-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  Transferred from AI Image Generator
                </span>
                <span className="text-[10px] uppercase font-bold text-violet-400">Ready</span>
              </div>
            )}

            {/* Source Image Selector */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center justify-between">
                <span>Input Image</span>
                {imageUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setImageUrl("");
                      setPreviewUrl("");
                      setTransferredFromGenerator(false);
                    }}
                    className="text-[11px] text-zinc-400 hover:text-red-400 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </label>

              {/* Image Preview Box or Dropzone */}
              {previewUrl ? (
                <div className="relative aspect-video rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden flex items-center justify-center group">
                  <img
                    src={previewUrl}
                    alt="Target for 3D synthesis"
                    className="w-full h-full object-contain p-2"
                  />
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-white flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Change File
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files?.[0]) {
                      handleFileUpload(e.dataTransfer.files[0]);
                    }
                  }}
                  className="aspect-video rounded-xl bg-[#18181c] border-2 border-dashed border-zinc-800 hover:border-violet-500/50 cursor-pointer flex flex-col items-center justify-center p-6 text-center transition-all group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700/50 group-hover:border-violet-500/50 flex items-center justify-center text-zinc-400 group-hover:text-violet-400 transition-colors mb-2.5">
                    {isUploading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-violet-400" />
                    ) : (
                      <Upload className="w-5 h-5" />
                    )}
                  </div>
                  <p className="text-xs font-semibold text-zinc-200">
                    {isUploading ? "Uploading image..." : "Click or drag & drop image"}
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-1">PNG, JPG or WEBP (up to 20MB)</p>
                </div>
              )}

              {/* Alternative: Direct URL Input */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Or paste public image URL..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#18181c] border border-zinc-800 text-zinc-200 placeholder:text-zinc-400 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyUrlInput}
                  disabled={!urlInput.trim()}
                  className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-xs font-medium text-zinc-200 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Conversion Options */}
            <div className="space-y-4 pt-2 border-t border-zinc-800/80">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-violet-400" />
                Generation Settings
              </span>

              {/* PBR Textures Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#18181c] border border-zinc-800/80">
                <div>
                  <p className="text-xs font-medium text-zinc-200">Generate PBR Maps</p>
                  <p className="text-[11px] text-zinc-400">Normal, roughness & metallic maps</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEnablePbr(!enablePbr)}
                  className={`w-11 h-6 rounded-full transition-colors relative p-1 ${
                    enablePbr ? "bg-violet-600" : "bg-zinc-800"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      enablePbr ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Target Formats Selection */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Target Formats
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["glb", "obj", "fbx"].map((fmt) => {
                    const isSelected = targetFormats.includes(fmt);
                    return (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            if (targetFormats.length > 1) {
                              setTargetFormats(targetFormats.filter((f) => f !== fmt));
                            }
                          } else {
                            setTargetFormats([...targetFormats, fmt]);
                          }
                        }}
                        className={`p-2 rounded-xl text-center border text-xs font-semibold uppercase transition-all ${
                          isSelected
                            ? "bg-violet-600/20 border-violet-500 text-violet-300"
                            : "bg-[#18181c] border-zinc-800 text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        {fmt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pose Mode */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Character Pose Mode
                </label>
                <select
                  value={poseMode}
                  onChange={(e) => setPoseMode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#18181c] border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500"
                >
                  <option value="default">Default / Automatic</option>
                  <option value="a-pose">A-Pose (Best for humanoid rigging)</option>
                  <option value="t-pose">T-Pose</option>
                </select>
              </div>
            </div>

            {/* Convert Button */}
            <button
              type="button"
              disabled={isConverting || !imageUrl}
              onClick={handleStartConversion}
              className="w-full py-3.5 px-5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-lg shadow-violet-600/25 flex items-center justify-center gap-2.5 transition-all active:scale-[0.99]"
            >
              {isConverting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Converting to 3D ({progress}%)...</span>
                </>
              ) : (
                <>
                  <Box className="w-4 h-4" />
                  <span>Convert to 3D</span>
                </>
              )}
            </button>
          </div>

          {/* Recent 3D Models Panel */}
          <div className="p-5 rounded-2xl bg-[#111115] border border-zinc-800/80 shadow-lg space-y-3.5">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-violet-400" />
                Recent 3D Models (Last 3)
              </span>
              <span className="text-[10px] font-normal text-zinc-400">Session</span>
            </div>

            {recentModels.length === 0 ? (
              <p className="text-xs text-zinc-400 py-3 text-center">
                No 3D conversions in this session yet.
              </p>
            ) : (
              <div className="space-y-2.5">
                {recentModels.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setCurrentModel(item.modelUrls);
                      if (item.sourceImageUrl) {
                        setPreviewUrl(item.sourceImageUrl);
                      }
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-[#18181c] border border-zinc-800/80 hover:border-violet-500/40 cursor-pointer transition-all group"
                  >
                    {item.sourceImageUrl ? (
                      <img
                        src={item.sourceImageUrl}
                        alt="Model thumb"
                        className="w-12 h-12 rounded-lg object-cover bg-zinc-900 border border-zinc-700/40 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                        <Box className="w-5 h-5 text-violet-400" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-zinc-200 font-medium truncate group-hover:text-violet-300">
                        Model {item.id.slice(0, 10)}...
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-zinc-400">
                          Formats: {Object.keys(item.modelUrls).join(", ").toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-violet-400 transition-colors" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: 3D Model Viewer & Downloads */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
              3D Interactive Viewport
            </h3>
            {currentModel?.glb && (
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Mesh Ready (GLB)
              </span>
            )}
          </div>

          {/* Active Generation Progress Indicator */}
          {isConverting && (
            <div className="p-6 rounded-2xl bg-[#111115] border border-violet-500/30 shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-200 font-medium flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-violet-400" />
                  {getProgressStage(progress)}
                </span>
                <span className="font-mono text-violet-400 font-bold">{progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 transition-all duration-500"
                  style={{ width: `${Math.max(5, progress)}%` }}
                />
              </div>
              <p className="text-xs text-zinc-400">
                Meshy AI neural network is processing depth contours, normal vectors, and UV unwrapping.
              </p>
            </div>
          )}

          {/* 3D Viewport Box */}
          <div className="w-full h-[520px]">
            {currentModel?.glb ? (
              <ModelViewer
                src={currentModel.glb}
                alt="Studio3D Reconstructed Mesh"
                poster={previewUrl}
              />
            ) : (
              <div className="w-full h-full rounded-2xl bg-[#111115]/60 border border-dashed border-zinc-800 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 mb-4">
                  <Box className="w-8 h-8" />
                </div>
                <h4 className="text-base font-semibold text-zinc-200">3D Viewport Idle</h4>
                <p className="text-xs text-zinc-400 max-w-sm mt-1 mb-4">
                  Select an image or send one over from the AI Image Generator, adjust your settings, and click &quot;Convert to 3D&quot;.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-400">
                  <Layers className="w-3.5 h-3.5 text-violet-400" />
                  Supports GLB, OBJ, FBX with PBR maps
                </div>
              </div>
            )}
          </div>

          {/* Model Download & Export Panel */}
          {currentModel && (
            <div className="p-5 rounded-2xl bg-[#111115] border border-zinc-800/80 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200">Export 3D Model</h4>
                  <p className="text-xs text-zinc-400">Compatible with Blender, Unity, Unreal Engine & Three.js</p>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
                  SUCCEEDED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentModel.glb && (
                  <a
                    href={currentModel.glb}
                    download="model.glb"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs shadow-md shadow-violet-600/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download GLB</span>
                  </a>
                )}

                {currentModel.obj && (
                  <a
                    href={currentModel.obj}
                    download="model.obj"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-xs border border-zinc-700/60 flex items-center justify-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download OBJ</span>
                  </a>
                )}

                {currentModel.fbx && (
                  <a
                    href={currentModel.fbx}
                    download="model.fbx"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-xs border border-zinc-700/60 flex items-center justify-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download FBX</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ImageTo3D;
