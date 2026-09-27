/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Sparkles,
  ArrowRight,
  Download,
  Loader2,
  Clock,
  Palette,
  Wand2,
  CheckCircle2,
} from "lucide-react";
import {
  ArtStyle,
  createGenerateImageTask,
  pollImageTask,
} from "@/lib/meshy";

interface GenerationHistoryItem {
  id: string;
  prompt: string;
  style: ArtStyle;
  imageUrls: string[];
  createdAt: number;
}

const ART_STYLES: { id: ArtStyle; label: string; description: string }[] = [
  { id: "realistic", label: "Realistic", description: "PBR textures & natural lighting" },
  { id: "anime", label: "Anime", description: "Vibrant cel-shading & crisp lines" },
  { id: "cartoon", label: "Cartoon", description: "Stylized forms & playful colors" },
  { id: "low-poly", label: "Low-Poly", description: "Geometric faceted aesthetic" },
];

const PROMPT_SUGGESTIONS = [
  "A hooded warrior with teal hair and a skull mask, high detail character art",
  "A futuristic cyberpunk hovercraft vehicle with glowing neon thrusters",
  "A fantasy treasure chest carved with ancient glowing Nordic runes",
  "A robotic cyber-panther with sleek chrome plating and amber eyes",
];

export function ImageGenerator() {
  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<ArtStyle>("realistic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentResults, setCurrentResults] = useState<string[]>([]);
  const [recentGenerations, setRecentGenerations] = useState<GenerationHistoryItem[]>([]);

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load recent generations from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("studio3d_recent_images");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setRecentGenerations(parsed.slice(0, 3));
        }
      }
    } catch (e) {
      console.error("Failed to read sessionStorage", e);
    }
  }, []);

  // Save to sessionStorage when updated
  const saveGenerationToHistory = (item: GenerationHistoryItem) => {
    try {
      const updated = [item, ...recentGenerations.filter((x) => x.id !== item.id)].slice(0, 3);
      setRecentGenerations(updated);
      sessionStorage.setItem("studio3d_recent_images", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save to sessionStorage", e);
    }
  };

  // Cleanup polling interval on unmount
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  const handleStartGeneration = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a text prompt for image generation");
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setCurrentResults([]);

    try {
      const createdTaskId = await createGenerateImageTask({
        prompt: prompt.trim(),
        style,
      });

      toast.success("Generation task queued. Polling Meshy engine...");

      // Begin polling every 3 seconds
      pollIntervalRef.current = setInterval(async () => {
        try {
          const statusData = await pollImageTask(createdTaskId);

          if (statusData.progress) {
            setProgress(statusData.progress);
          }

          if (statusData.status === "SUCCEEDED") {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
            setIsGenerating(false);
            setProgress(100);

            const urls = statusData.image_urls || [];
            setCurrentResults(urls);
            toast.success("AI Images generated successfully!");

            // Save to recent
            saveGenerationToHistory({
              id: createdTaskId,
              prompt: prompt.trim(),
              style,
              imageUrls: urls,
              createdAt: Date.now(),
            });
          } else if (statusData.status === "FAILED" || statusData.status === "EXPIRED") {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
            setIsGenerating(false);
            const errMsg = statusData.task_error?.message || "Task failed to process";
            toast.error(errMsg);
          }
        } catch (pollErr: unknown) {
          console.error("Polling error", pollErr);
        }
      }, 3000);
    } catch (err: unknown) {
      setIsGenerating(false);
      const msg = err instanceof Error ? err.message : "Failed to start image generation";
      toast.error(msg);
    }
  };

  const handleUseFor3D = (imageUrl: string) => {
    try {
      sessionStorage.setItem("studio3d_selected_image", imageUrl);
      toast.info("Transferring image to 3D pipeline...");
      router.push("/image-to-3d");
    } catch {
      router.push("/image-to-3d");
    }
  };

  const handleDownload = async (imageUrl: string, index: number) => {
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `studio3d-concept-${Date.now()}-${index + 1}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
      toast.success("Image download started");
    } catch {
      // Fallback: direct link open
      window.open(imageUrl, "_blank");
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-8 h-8 rounded-lg bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Generate Image
            </h1>
          </div>
          <p className="text-sm text-zinc-400">
            Synthesize game-ready concept art and character assets optimized for 3D reconstruction.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Meshy Image Engine V1
          </span>
        </div>
      </div>

      {/* Main Grid: Prompt Form & Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Generator Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#111115] border border-zinc-800/80 shadow-xl space-y-5">
            {/* Prompt Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center justify-between">
                <span>Text Prompt</span>
                <span className="text-[11px] font-normal text-zinc-400">Be descriptive</span>
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A hooded warrior with teal hair and a skull..."
                rows={4}
                disabled={isGenerating}
                className="w-full px-4 py-3 rounded-xl bg-[#18181c] border border-zinc-800 text-zinc-100 placeholder:text-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all resize-none disabled:opacity-50"
              />

              {/* Prompt Suggestions */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] text-zinc-400 font-medium">Quick ideas:</span>
                <div className="flex flex-wrap gap-1.5">
                  {PROMPT_SUGGESTIONS.map((sug, i) => (
                    <button
                      key={i}
                      type="button"
                      disabled={isGenerating}
                      onClick={() => setPrompt(sug)}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-700/40 transition-colors text-left truncate max-w-full"
                    >
                      {sug.split(",")[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Art Style Dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-violet-400" />
                Art Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ART_STYLES.map((item) => {
                  const selected = style === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={isGenerating}
                      onClick={() => setStyle(item.id)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        selected
                          ? "bg-violet-600/15 border-violet-500 text-white shadow-sm shadow-violet-500/10"
                          : "bg-[#18181c] border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
                      }`}
                    >
                      <p className="text-xs font-semibold leading-none">{item.label}</p>
                      <p className="text-[10px] text-zinc-400 mt-1 truncate">{item.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generate Action Button */}
            <button
              type="button"
              disabled={isGenerating || !prompt.trim()}
              onClick={handleStartGeneration}
              className="w-full py-3.5 px-5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-lg shadow-violet-600/25 flex items-center justify-center gap-2.5 transition-all active:scale-[0.99]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synthesizing ({progress}%)...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Generate Images</span>
                </>
              )}
            </button>
          </div>

          {/* Recent Generations Panel (last 3, stored in sessionStorage) */}
          <div className="p-5 rounded-2xl bg-[#111115] border border-zinc-800/80 shadow-lg space-y-3.5">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-violet-400" />
                Recent Generations (Last 3)
              </span>
              <span className="text-[10px] font-normal text-zinc-400">Session</span>
            </div>

            {recentGenerations.length === 0 ? (
              <p className="text-xs text-zinc-400 py-3 text-center">
                No recent images yet. Generated concepts will appear here.
              </p>
            ) : (
              <div className="space-y-2.5">
                {recentGenerations.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setPrompt(item.prompt);
                      setStyle(item.style);
                      setCurrentResults(item.imageUrls);
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-[#18181c] border border-zinc-800/80 hover:border-violet-500/40 cursor-pointer transition-all group"
                  >
                    {item.imageUrls[0] ? (
                      <img
                        src={item.imageUrls[0]}
                        alt={item.prompt}
                        className="w-12 h-12 rounded-lg object-cover bg-zinc-900 border border-zinc-700/40 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-zinc-500" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-zinc-200 font-medium truncate group-hover:text-violet-300">
                        {item.prompt}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] uppercase font-semibold text-violet-400 bg-violet-500/10 px-1.5 py-0.2 rounded">
                          {item.style}
                        </span>
                        <span className="text-[10px] text-zinc-400">
                          {item.imageUrls.length} image{item.imageUrls.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Generation Results (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Generated Assets
            </h3>
            {currentResults.length > 0 && (
              <span className="text-xs text-zinc-400">
                {currentResults.length} asset{currentResults.length > 1 ? "s" : ""} ready
              </span>
            )}
          </div>

          {/* Loading Skeleton Grid while polling */}
          {isGenerating && (
            <div className="p-8 rounded-2xl bg-[#111115] border border-violet-500/30 shadow-2xl space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-300 font-medium flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-violet-400" />
                    Rendering variations with Meshy AI...
                  </span>
                  <span className="font-mono text-violet-400 font-bold">{progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-500"
                    style={{ width: `${Math.max(5, progress)}%` }}
                  />
                </div>
              </div>

              {/* 2-column skeleton cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2].map((idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-xl bg-zinc-900/80 border border-zinc-800 animate-pulse flex flex-col items-center justify-center p-4 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                    <Sparkles className="w-8 h-8 text-zinc-700 mb-2" />
                    <p className="text-xs text-zinc-500 font-medium">Generating variation {idx}...</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Succeeded Result: 2-column image grid */}
          {!isGenerating && currentResults.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {currentResults.map((url, index) => (
                <div
                  key={index}
                  className="group rounded-2xl bg-[#111115] border border-zinc-800/80 hover:border-violet-500/50 shadow-xl overflow-hidden transition-all duration-300 flex flex-col"
                >
                  {/* Image container */}
                  <div className="relative aspect-square bg-zinc-950 overflow-hidden">
                    <img
                      src={url}
                      alt={`Generated concept ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-zinc-300">
                      Variation {index + 1}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 bg-[#141418] border-t border-zinc-800/80 flex flex-col gap-2">
                    {/* "Use for 3D →" button */}
                    <button
                      type="button"
                      onClick={() => handleUseFor3D(url)}
                      className="w-full py-2.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs shadow-md shadow-violet-600/20 flex items-center justify-center gap-1.5 transition-all group/btn"
                    >
                      <span>Use for 3D</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                    </button>

                    {/* "Download" button */}
                    <button
                      type="button"
                      onClick={() => handleDownload(url, index)}
                      className="w-full py-2 px-4 rounded-xl bg-zinc-800/70 hover:bg-zinc-800 text-zinc-300 hover:text-white font-medium text-xs border border-zinc-700/50 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Image</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isGenerating && currentResults.length === 0 && (
            <div className="p-12 rounded-2xl bg-[#111115]/60 border border-dashed border-zinc-800 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 mb-4">
                <Wand2 className="w-7 h-7" />
              </div>
              <h4 className="text-base font-semibold text-zinc-200">No images generated yet</h4>
              <p className="text-xs text-zinc-400 max-w-sm mt-1 mb-6">
                Enter a creative prompt or pick one of the suggestions above, choose your preferred art style, and click Generate.
              </p>
              <div className="flex items-center gap-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> 2 Variations per run
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> Direct 3D pipeline link
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ImageGenerator;
