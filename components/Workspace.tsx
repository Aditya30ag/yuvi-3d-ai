"use client";

import React, { useState, useEffect } from "react";
import { TopNavbar } from "./TopNavbar";
import { IconSidebar } from "./IconSidebar";
import { LeftPanel } from "./LeftPanel";
import { CenterViewer } from "./CenterViewer";
import { RightPanel } from "./RightPanel";
import { PRELOADED_EXAMPLES } from "@/lib/exampleGenerations";
import {
  GenerationItem,
  MeshyImageTask,
  MeshyImage3DTask,
  createGenerateImageTask,
  createImageTo3DTask,
  pollImageTask,
  poll3DTask,
} from "@/lib/meshy";
import { Sparkles, Box, LayoutGrid } from "lucide-react";

interface WorkspaceProps {
  initialFeature?: "image-gen" | "image-to-3d";
}

export function Workspace({ initialFeature = "image-to-3d" }: WorkspaceProps) {
  // Global State
  const [activeFeature, setActiveFeature] = useState<"image-gen" | "image-to-3d">(initialFeature);
  const [selectedGeneration, setSelectedGeneration] = useState<GenerationItem | null>(
    PRELOADED_EXAMPLES[1] // Default: Hooded teal-hair character
  );
  const [generations, setGenerations] = useState<GenerationItem[]>(PRELOADED_EXAMPLES);
  const [prefilledImageUrl, setPrefilledImageUrl] = useState<string | null>(null);
  const [viewerBgColor, setViewerBgColor] = useState<string>("#0d0d0d");

  // Mobile navigation tab below 640px: 'create' | 'viewer' | 'gallery'
  const [mobileTab, setMobileTab] = useState<"create" | "viewer" | "gallery">("viewer");

  // Generation progress state
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageProgress, setImageProgress] = useState(0);

  const [isGenerating3D, setIsGenerating3D] = useState(false);
  const [threeDProgress, setThreeDProgress] = useState(0);

  // Load past generations from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("studio3d_generations");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge custom generations on top of preloaded examples
          setGenerations([...parsed, ...PRELOADED_EXAMPLES]);
        }
      }
    } catch (e) {
      console.error("Failed to load sessionStorage generations:", e);
    }
  }, []);

  // Save new user generations to sessionStorage
  const saveUserGeneration = (item: GenerationItem) => {
    setGenerations((prev) => {
      const next = [item, ...prev];
      try {
        const userOnly = next.filter((g) => !g.badge);
        sessionStorage.setItem("studio3d_generations", JSON.stringify(userOnly));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // 1. Image Generation Handler
  const handleGenerateImage = async (prompt: string, style: string, aspectRatio: string) => {
    setIsGeneratingImage(true);
    setImageProgress(10);

    try {
      const taskId = await createGenerateImageTask({ prompt, style, aspect_ratio: aspectRatio });

      // Poll until finished
      const checkInterval = setInterval(async () => {
        try {
          const task = await pollImageTask(taskId);
          setImageProgress(task.progress || 30);

          if (task.status === "SUCCEEDED") {
            clearInterval(checkInterval);
            setIsGeneratingImage(false);
            setImageProgress(100);

            const newTask: MeshyImageTask = {
              ...task,
              type: "image",
              name: prompt.length > 25 ? `${prompt.slice(0, 25)}...` : prompt,
              prompt,
              created_at: Date.now(),
            };

            saveUserGeneration(newTask);
            setSelectedGeneration(newTask);
            setMobileTab("viewer");
          } else if (task.status === "FAILED") {
            clearInterval(checkInterval);
            setIsGeneratingImage(false);
            console.error("Image generation failed:", task.error);
          }
        } catch (pollErr) {
          console.error("Polling error:", pollErr);
        }
      }, 2500);
    } catch (err) {
      console.error("Create image task failed:", err);
      setIsGeneratingImage(false);
    }
  };

  // 2. Image to 3D Handler
  const handleGenerate3D = async (
    imageUrl: string,
    aiModel: string,
    enhancement: boolean,
    topology: string
  ) => {
    setIsGenerating3D(true);
    setThreeDProgress(15);

    try {
      const taskId = await createImageTo3DTask({
        image_url: imageUrl,
        ai_model: aiModel,
        enable_image_enhancement: enhancement,
        topology: topology.toLowerCase() === "quad" ? "quad" : "triangle",
      });

      // Poll until finished
      const checkInterval = setInterval(async () => {
        try {
          const task = await poll3DTask(taskId);
          setThreeDProgress(task.progress || 35);

          if (task.status === "SUCCEEDED") {
            clearInterval(checkInterval);
            setIsGenerating3D(false);
            setThreeDProgress(100);

            const newTask: MeshyImage3DTask = {
              ...task,
              type: "3d",
              name: `3D Model (${topology})`,
              topology,
              created_at: Date.now(),
            };

            saveUserGeneration(newTask);
            setSelectedGeneration(newTask);
            setMobileTab("viewer");
          } else if (task.status === "FAILED") {
            clearInterval(checkInterval);
            setIsGenerating3D(false);
            console.error("3D generation failed:", task.error);
          }
        } catch (pollErr) {
          console.error("Polling 3D error:", pollErr);
        }
      }, 3000);
    } catch (err) {
      console.error("Create 3D task failed:", err);
      setIsGenerating3D(false);
    }
  };

  // 3. Interaction: "Use for 3D ->"
  const handleUseFor3D = (imageUrl: string) => {
    setActiveFeature("image-to-3d");
    setPrefilledImageUrl(imageUrl);
    setMobileTab("create");
  };

  // Filter image vs 3d generations for LeftPanel "My Generations"
  const imageGenerations = generations.filter(
    (g): g is MeshyImageTask => g.type === "image" || Boolean((g as MeshyImageTask).image_urls)
  );

  const threeDGenerations = generations.filter(
    (g): g is MeshyImage3DTask => g.type === "3d" || Boolean((g as MeshyImage3DTask).model_urls)
  );

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#080808]">
      {/* Top Navigation Bar (full width, 40px, above all panels) */}
      <TopNavbar onBgColorChange={(color) => setViewerBgColor(color)} />

      {/* Main 4-Column Workspace Layout */}
      <div className="flex flex-1 w-full h-[calc(100vh-40px)] overflow-hidden relative">
        {/* Panel 1 — Icon Sidebar (56px wide, full height, hidden below 640px) */}
        <div className="hidden sm:flex h-full flex-shrink-0">
          <IconSidebar
            activeFeature={activeFeature}
            onSelectFeature={(feat) => {
              setActiveFeature(feat);
              setMobileTab("create");
            }}
          />
        </div>

        {/* Panel 2 — Left Panel (280px wide, scrollable, hidden below 768px unless active on mobile) */}
        <div
          className={`h-full flex-shrink-0 ${
            mobileTab === "create" ? "flex w-full" : "hidden md:flex"
          }`}
        >
          <LeftPanel
            activeFeature={activeFeature}
            onGenerateImage={handleGenerateImage}
            onGenerate3D={handleGenerate3D}
            isGeneratingImage={isGeneratingImage}
            isGenerating3D={isGenerating3D}
            imageProgress={imageProgress}
            threeDProgress={threeDProgress}
            imageGenerations={imageGenerations}
            threeDGenerations={threeDGenerations}
            selectedGeneration={selectedGeneration}
            onSelectGeneration={(gen) => {
              setSelectedGeneration(gen);
              setMobileTab("viewer");
            }}
            onUseFor3D={handleUseFor3D}
            prefilledImageUrl={prefilledImageUrl}
          />
        </div>

        {/* Panel 3 — Center Viewer (flex-1) */}
        <div
          className={`flex-1 h-full min-w-0 ${
            mobileTab === "viewer" ? "flex" : "hidden md:flex"
          }`}
        >
          <CenterViewer
            generation={selectedGeneration}
            isGenerating={isGeneratingImage || isGenerating3D}
            generatingProgress={isGeneratingImage ? imageProgress : threeDProgress}
            onUseFor3D={handleUseFor3D}
            onRegenerate={() => {
              if (selectedGeneration && "thumbnail_url" in selectedGeneration && selectedGeneration.thumbnail_url) {
                handleGenerate3D(selectedGeneration.thumbnail_url, "Meshy 7", true, "Triangle");
              }
            }}
            bgColor={viewerBgColor}
          />
        </div>

        {/* Panel 4 — Right Panel (280px wide, scrollable, hidden below 1024px unless active on mobile) */}
        <div
          className={`h-full flex-shrink-0 ${
            mobileTab === "gallery" ? "flex w-full" : "hidden lg:flex"
          }`}
        >
          <RightPanel
            generations={generations}
            selectedGeneration={selectedGeneration}
            onSelectGeneration={(card) => {
              setSelectedGeneration(card);
              setMobileTab("viewer");
            }}
            isGenerating={isGeneratingImage || isGenerating3D}
            generatingProgress={isGeneratingImage ? imageProgress : threeDProgress}
          />
        </div>
      </div>

      {/* Mobile Tab Bar (below 640px) replacing IconSidebar */}
      <div className="sm:hidden h-12 w-full bg-[#0a0a0a] border-t border-[#1f1f1f] flex items-center justify-around px-2 z-40 flex-shrink-0">
        <button
          onClick={() => {
            setActiveFeature("image-gen");
            setMobileTab("create");
          }}
          className={`flex flex-col items-center gap-0.5 text-xs ${
            mobileTab === "create" && activeFeature === "image-gen"
              ? "text-[#a3e635]"
              : "text-[#555555]"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px]">Image</span>
        </button>

        <button
          onClick={() => {
            setActiveFeature("image-to-3d");
            setMobileTab("create");
          }}
          className={`flex flex-col items-center gap-0.5 text-xs ${
            mobileTab === "create" && activeFeature === "image-to-3d"
              ? "text-[#a3e635]"
              : "text-[#555555]"
          }`}
        >
          <Box className="w-4 h-4" />
          <span className="text-[10px]">3D</span>
        </button>

        <button
          onClick={() => setMobileTab("viewer")}
          className={`flex flex-col items-center gap-0.5 text-xs ${
            mobileTab === "viewer" ? "text-[#a3e635]" : "text-[#555555]"
          }`}
        >
          <Box className="w-4 h-4" />
          <span className="text-[10px]">Viewer</span>
        </button>

        <button
          onClick={() => setMobileTab("gallery")}
          className={`flex flex-col items-center gap-0.5 text-xs ${
            mobileTab === "gallery" ? "text-[#a3e635]" : "text-[#555555]"
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span className="text-[10px]">Gallery</span>
        </button>
      </div>
    </div>
  );
}
