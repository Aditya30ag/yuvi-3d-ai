"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Box, Upload, X, Loader2, ArrowRight } from "lucide-react";
import { MeshyImageTask, MeshyImage3DTask, GenerationItem } from "@/lib/meshy";

interface LeftPanelProps {
  activeFeature: "image-gen" | "image-to-3d";
  onGenerateImage: (prompt: string, style: string, aspectRatio: string) => Promise<void>;
  onGenerate3D: (imageUrl: string, aiModel: string, enhancement: boolean, topology: string) => Promise<void>;
  isGeneratingImage: boolean;
  isGenerating3D: boolean;
  imageProgress: number;
  threeDProgress: number;
  imageGenerations: MeshyImageTask[];
  threeDGenerations: MeshyImage3DTask[];
  selectedGeneration: GenerationItem | null;
  onSelectGeneration: (item: GenerationItem) => void;
  onUseFor3D: (imageUrl: string) => void;
  prefilledImageUrl?: string | null;
}

export function LeftPanel({
  activeFeature,
  onGenerateImage,
  onGenerate3D,
  isGeneratingImage,
  isGenerating3D,
  imageProgress,
  threeDProgress,
  imageGenerations,
  threeDGenerations,
  selectedGeneration,
  onSelectGeneration,
  onUseFor3D,
  prefilledImageUrl,
}: LeftPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Image Gen form states
  const [imagePrompt, setImagePrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("realistic");
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("1:1");

  // 3D form states
  const [uploadedImage, setUploadedImage] = useState<string | null>(prefilledImageUrl || null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const [aiModel, setAiModel] = useState<"Meshy 7" | "Meshy 6">("Meshy 7");
  const [imageEnhancement, setImageEnhancement] = useState(true);
  const [topology, setTopology] = useState<"Triangle" | "Quad">("Triangle");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync prefilledImageUrl if changed externally (e.g. "Use for 3D")
  useEffect(() => {
    if (prefilledImageUrl) {
      setUploadedImage(prefilledImageUrl);
      setUploadedFileName("Imported concept");
      panelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [prefilledImageUrl]);

  const styles = ["realistic", "anime", "cartoon", "low-poly", "cinematic"];
  const aspectRatios = ["1:1", "16:9", "9:16"];

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setIsUploading(true);
    setUploadedFileName(file.name);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      setUploadedImage(data.dataUrl || data.url);
    } catch (err) {
      console.error("Upload error:", err);
      const localUrl = URL.createObjectURL(file);
      setUploadedImage(localUrl);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleUrlSubmit = () => {
    if (imageUrlInput.trim()) {
      setUploadedImage(imageUrlInput.trim());
      setUploadedFileName("Remote image");
      setShowUrlInput(false);
    }
  };

  return (
    <div
      ref={panelRef}
      className="w-[280px] h-full bg-bg-surface border-r border-border-subtle flex flex-col p-4 overflow-y-auto no-scrollbar scrollbar-none flex-shrink-0 select-none z-10 transition-colors"
    >
      {activeFeature === "image-gen" ? (
        /* ================= IMAGE GENERATION FORM ================= */
        <div className="flex flex-col gap-4">
          {/* Header */}
          <h2 className="text-[14px] font-semibold text-text-primary">Generate Image</h2>

          {/* 1. Prompt textarea */}
          <div className="flex flex-col gap-1.5">
            <textarea
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              placeholder="Describe what you want to generate..."
              className="w-full min-h-[100px] p-3 bg-bg-surface-secondary border border-border-subtle rounded-xl text-text-primary text-[13px] placeholder:text-text-muted resize-none focus:outline-none focus:border-neon-green/60 transition-colors"
            />
          </div>

          {/* 2. Style selector */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] uppercase tracking-wider text-text-muted font-medium">
              Style
            </label>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar scrollbar-none">
              {styles.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setSelectedStyle(style)}
                  className={`capitalize px-3 py-1 rounded-full text-xs transition-colors whitespace-nowrap cursor-pointer ${
                    selectedStyle === style
                      ? "bg-neon-green/10 border border-neon-green/30 text-neon-green font-semibold shadow-sm"
                      : "bg-bg-surface-secondary border border-border-subtle text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Aspect Ratio */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] uppercase tracking-wider text-text-muted font-medium">
              Aspect Ratio
            </label>
            <div className="flex items-center gap-2">
              {aspectRatios.map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  onClick={() => setSelectedAspectRatio(ratio)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                    selectedAspectRatio === ratio
                      ? "bg-neon-green/10 border border-neon-green/30 text-neon-green font-semibold shadow-sm"
                      : "bg-bg-surface-secondary border border-border-subtle text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Generate Button */}
          <button
            type="button"
            disabled={!imagePrompt.trim() || isGeneratingImage}
            onClick={() => onGenerateImage(imagePrompt, selectedStyle, selectedAspectRatio)}
            className="btn-primary w-full h-10 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-[#050508] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,255,163,0.3)] active:scale-[0.99] cursor-pointer"
          >
            {isGeneratingImage ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#050508]" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#050508] stroke-[2.5]" />
                <span>Generate</span>
              </>
            )}
          </button>

          {/* 5. Progress bar if generating */}
          {isGeneratingImage && (
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="w-full bg-bg-surface-secondary rounded-full h-1.5 overflow-hidden border border-border-subtle">
                <div
                  className="bg-gradient-to-r from-[#00ffa3] to-[#00c3ff] h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(5, imageProgress)}%` }}
                />
              </div>
              <span className="text-[11px] text-text-muted">
                {imageProgress}% · Synthesizing image...
              </span>
            </div>
          )}

          {/* Divider */}
          <div className="w-full h-[1px] bg-border-subtle my-2" />

          {/* 6. My Generations (2-col grid) */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] uppercase tracking-wider text-text-muted font-medium">
              My Generations
            </label>
            {imageGenerations.length === 0 ? (
              <p className="text-[11px] text-text-muted italic py-2">
                No image generations yet.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {imageGenerations.map((gen) => {
                  const imgUrl = gen.image_urls?.[0];
                  const isSelected = selectedGeneration?.id === gen.id;
                  return (
                    <div
                      key={gen.id}
                      onClick={() => onSelectGeneration(gen)}
                      className={`relative aspect-square rounded-xl overflow-hidden bg-bg-surface-secondary group cursor-pointer border transition-all ${
                        isSelected ? "border-neon-green ring-1 ring-neon-green shadow-sm" : "border-border-subtle hover:border-border-secondary"
                      }`}
                    >
                      {imgUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={imgUrl}
                          alt={gen.prompt || "Generated image"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-text-muted">
                          Loading...
                        </div>
                      )}

                      {/* Hover Overlay with "Use for 3D ->" */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center p-1 transition-opacity">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (imgUrl) onUseFor3D(imgUrl);
                          }}
                          className="btn-primary px-2.5 py-1 rounded-lg text-[#050508] text-[10px] font-bold flex items-center gap-1 shadow-sm cursor-pointer"
                        >
                          <span>Use for 3D</span>
                          <ArrowRight className="w-2.5 h-2.5 text-[#050508]" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ================= IMAGE TO 3D FORM ================= */
        <div className="flex flex-col gap-4">
          {/* Header */}
          <h2 className="text-[14px] font-semibold text-text-primary">Image to 3D</h2>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
            }}
            accept="image/*"
            className="hidden"
          />

          {/* 1. Upload zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => {
              if (!uploadedImage) fileInputRef.current?.click();
            }}
            className={`relative w-full h-[160px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-3 text-center transition-all ${
              uploadedImage
                ? "border-border-secondary bg-bg-surface-secondary/40"
                : isDragOver
                ? "border-neon-green bg-neon-green/5 cursor-pointer"
                : "border-border-subtle bg-bg-surface-secondary/40 hover:border-border-secondary cursor-pointer"
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-text-primary" />
                <span className="text-[12px] text-text-muted">Uploading image...</span>
              </div>
            ) : uploadedImage ? (
              /* Preview Thumbnail (60px) once uploaded with filename and X button */
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="relative w-[60px] h-[60px] rounded-lg overflow-hidden border border-border-subtle bg-bg-surface-secondary shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={uploadedImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedImage(null);
                      setUploadedFileName(null);
                    }}
                    className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
                <span className="text-[11px] text-text-secondary truncate max-w-[200px]">
                  {uploadedFileName || "Uploaded image"}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="text-[10px] text-text-primary hover:underline cursor-pointer"
                >
                  Change image
                </button>
              </div>
            ) : (
              /* Empty drop zone state */
              <div className="flex flex-col items-center gap-1.5">
                <Upload className="w-6 h-6 text-text-muted" />
                <span className="text-[13px] text-text-secondary font-medium">Drop image here</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowUrlInput(!showUrlInput);
                  }}
                  className="text-[12px] text-neon-green hover:underline cursor-pointer font-medium"
                >
                  or paste URL
                </button>
              </div>
            )}
          </div>

          {/* 2. OR paste URL input */}
          {showUrlInput && !uploadedImage && (
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleUrlSubmit();
                }}
                placeholder="https://..."
                className="flex-1 px-3 py-1.5 bg-bg-surface-secondary border border-border-subtle rounded-xl text-text-primary text-xs placeholder:text-text-muted focus:outline-none focus:border-neon-green/60 transition-colors"
              />
              <button
                type="button"
                onClick={handleUrlSubmit}
                className="btn-secondary px-3 py-1.5 rounded-xl text-xs text-text-primary cursor-pointer"
              >
                Use
              </button>
            </div>
          )}

          {/* 3. Settings section */}
          <div className="flex flex-col gap-3 mt-1">
            <label className="text-[11px] uppercase tracking-wider text-text-muted font-medium">
              Settings
            </label>

            {/* AI Model */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm text-text-secondary">AI Model</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAiModel("Meshy 7")}
                  className={`flex-1 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    aiModel === "Meshy 7"
                      ? "bg-neon-green/10 border border-neon-green/30 text-neon-green shadow-sm"
                      : "bg-bg-surface-secondary border border-border-subtle text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Meshy 7
                </button>
                <button
                  type="button"
                  onClick={() => setAiModel("Meshy 6")}
                  className={`flex-1 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    aiModel === "Meshy 6"
                      ? "bg-neon-green/10 border border-neon-green/30 text-neon-green shadow-sm"
                      : "bg-bg-surface-secondary border border-border-subtle text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Meshy 6
                </button>
              </div>
            </div>

            {/* Image Enhancement switch */}
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-text-secondary">Image Enhancement</span>
              <button
                type="button"
                role="switch"
                aria-checked={imageEnhancement}
                onClick={() => setImageEnhancement(!imageEnhancement)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  imageEnhancement ? "bg-gradient-to-r from-[#00ffa3] to-[#00c3ff]" : "bg-border-secondary dark:bg-white/[0.08]"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full shadow-sm ring-0 transition duration-200 ease-in-out ${
                    imageEnhancement ? "translate-x-4 bg-[#050508]" : "translate-x-0 bg-white"
                  }`}
                />
              </button>
            </div>

            {/* Topology */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm text-text-secondary">Topology</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTopology("Triangle")}
                  className={`flex-1 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    topology === "Triangle"
                      ? "bg-neon-green/10 border border-neon-green/30 text-neon-green shadow-sm"
                      : "bg-bg-surface-secondary border border-border-subtle text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Triangle
                </button>
                <button
                  type="button"
                  onClick={() => setTopology("Quad")}
                  className={`flex-1 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    topology === "Quad"
                      ? "bg-neon-green/10 border border-neon-green/30 text-neon-green shadow-sm"
                      : "bg-bg-surface-secondary border border-border-subtle text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Quad
                </button>
              </div>
            </div>
          </div>

          {/* 4. Generate 3D button */}
          <button
            type="button"
            disabled={!uploadedImage || isGenerating3D}
            onClick={() => {
              if (uploadedImage) {
                onGenerate3D(uploadedImage, aiModel, imageEnhancement, topology);
              }
            }}
            className="btn-primary w-full h-10 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-[#050508] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,255,163,0.3)] active:scale-[0.99] mt-2 cursor-pointer"
          >
            {isGenerating3D ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#050508]" />
                <span>Generating 3D...</span>
              </>
            ) : (
              <>
                <Box className="w-4 h-4 text-[#050508]" />
                <span>Generate 3D</span>
              </>
            )}
          </button>

          {/* 5. Progress bar (shown while generating) */}
          {isGenerating3D && (
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="w-full bg-bg-surface-secondary rounded-full h-1.5 overflow-hidden border border-border-subtle">
                <div
                  className="bg-gradient-to-r from-[#00ffa3] to-[#00c3ff] h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(5, threeDProgress)}%` }}
                />
              </div>
              <span className="text-[11px] text-text-muted">
                {threeDProgress}% · Generating mesh...
              </span>
            </div>
          )}

          {/* Divider */}
          <div className="w-full h-[1px] bg-border-subtle my-2" />

          {/* 6. "My Generations" thumbnails (2-col grid below) */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] uppercase tracking-wider text-text-muted font-medium">
              My Generations
            </label>
            {threeDGenerations.length === 0 ? (
              <p className="text-[11px] text-text-muted italic py-2">
                No 3D generations yet.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {threeDGenerations.map((gen) => {
                  const isSelected = selectedGeneration?.id === gen.id;
                  const thumb = gen.thumbnail_url || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80";
                  return (
                    <div
                      key={gen.id}
                      onClick={() => onSelectGeneration(gen)}
                      className={`bg-bg-surface-secondary rounded-xl overflow-hidden cursor-pointer border transition-all flex flex-col ${
                        isSelected ? "border-neon-green ring-1 ring-neon-green shadow-sm" : "border-border-subtle hover:border-border-secondary"
                      }`}
                    >
                      <div className="aspect-square w-full bg-bg-surface overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={thumb}
                          alt={gen.name || "3D generation"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2 flex flex-col">
                        <span className="text-text-primary text-xs truncate font-medium">
                          {gen.name || "3D Mesh"}
                        </span>
                        <span className="text-[10px] text-text-muted mt-0.5">
                          {gen.created_at ? "Just now" : "Recent"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
