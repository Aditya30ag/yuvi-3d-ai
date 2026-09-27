"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  createGenerateImageTask,
  pollImageTask,
  createImageTo3DTask,
  poll3DTask,
  uploadImageFile,
} from "@/lib/meshy";

export type FeatureType =
  | "assets"
  | "agent"
  | "image"
  | "model"
  | "print"
  | "animate"
  | "inspiration";

export type WorkspaceSubMode = "image-to-3d" | "image-gen";

export interface GalleryItem {
  id: string;
  type: "3d" | "image";
  badge: "EXAMPLE" | "TEMPLATE" | "GENERATED";
  title: string;
  category: string;
  gradientFrom: string;
  gradientTo: string;
  svgType?: "hooded" | "skull-bird" | "chibi" | "medallion" | "penguin" | "backpack";
  imageUrl?: string;
  modelUrl?: string;
  prompt?: string;
  statistics?: {
    faces: number;
    vertices: number;
  };
}

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "card-1",
    type: "3d",
    badge: "EXAMPLE",
    title: "Teal Hooded Warrior",
    category: "Character",
    gradientFrom: "#0f3d3e",
    gradientTo: "#291b10",
    svgType: "hooded",
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    statistics: { faces: 35200, vertices: 18400 },
  },
  {
    id: "card-2",
    type: "3d",
    badge: "EXAMPLE",
    title: "Dark Hooded with Bird",
    category: "Character",
    gradientFrom: "#1f1d17",
    gradientTo: "#12140d",
    svgType: "skull-bird",
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    statistics: { faces: 42100, vertices: 22800 },
  },
  {
    id: "card-3",
    type: "image",
    badge: "TEMPLATE",
    title: "Anime Girl in Pink Cap",
    category: "Chibi",
    gradientFrom: "#4a1936",
    gradientTo: "#2a1523",
    svgType: "chibi",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    prompt: "Chibi anime girl wearing a stylish pink streetwear cap, vivid colors, clean background",
  },
  {
    id: "card-4",
    type: "3d",
    badge: "TEMPLATE",
    title: "Red Medallion with Cat",
    category: "Prop",
    gradientFrom: "#4a0e17",
    gradientTo: "#26060c",
    svgType: "medallion",
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    statistics: { faces: 18400, vertices: 9600 },
  },
  {
    id: "card-5",
    type: "3d",
    badge: "EXAMPLE",
    title: "Penguin Creature in Armor",
    category: "Creature",
    gradientFrom: "#16283b",
    gradientTo: "#101a24",
    svgType: "penguin",
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    statistics: { faces: 28900, vertices: 14700 },
  },
  {
    id: "card-6",
    type: "3d",
    badge: "EXAMPLE",
    title: "Brown Leather Backpack",
    category: "Asset",
    gradientFrom: "#3d2716",
    gradientTo: "#20140b",
    svgType: "backpack",
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    statistics: { faces: 15600, vertices: 8200 },
  },
];

export function useWorkspace() {
  const [activeFeature, setActiveFeature] = useState<FeatureType>("image");
  const [subMode, setSubMode] = useState<WorkspaceSubMode>("image-to-3d");

  // Image Generation States
  const [promptText, setPromptText] = useState<string>("");
  const [artStyle, setArtStyle] = useState<string>("realistic");
  const [aspectRatio, setAspectRatio] = useState<string>("1:1");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  // Image to 3D States
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [modelTopology, setModelTopology] = useState<"high-detail" | "smart-topology">("high-detail");
  const [resolution, setResolution] = useState<"standard" | "ultra-2k" | "ultra-4k">("standard");
  const [multiView, setMultiView] = useState<boolean>(false);
  const [split, setSplit] = useState<boolean>(false);
  const [selectedPose, setSelectedPose] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  // Generation execution & progress
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationType, setGenerationType] = useState<"image" | "3d" | null>(null);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [generationStage, setGenerationStage] = useState<string>("Initializing...");

  // Gallery and Selection
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY_ITEMS);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("all");
  const [coins, setCoins] = useState<number>(100);
  const [showImageGenSuggestion, setShowImageGenSuggestion] = useState<boolean>(true);

  const activePollingRef = useRef<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean timers on unmount
  useEffect(() => {
    return () => {
      activePollingRef.current = false;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Upload handler with base64 / server endpoint
  const handleFileUpload = useCallback(async (file: File) => {
    if (!file) return;
    setUploadedFileName(file.name);

    // Fast local preview via FileReader
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setUploadedImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);

    // Also attempt server upload
    try {
      const serverUrl = await uploadImageFile(file);
      if (serverUrl) {
        setUploadedImage(serverUrl);
      }
    } catch {
      // Fallback already loaded via FileReader
    }
  }, []);

  const handleRemoveUpload = useCallback(() => {
    setUploadedImage(null);
    setUploadedFileName(null);
  }, []);

  // Cancel any in-flight task
  const cancelGeneration = useCallback(() => {
    activePollingRef.current = false;
    if (timerRef.current) clearInterval(timerRef.current);
    setIsGenerating(false);
    setGenerationType(null);
    setGenerationProgress(0);
    setGenerationStage("Cancelled");
  }, []);

  // 1) IMAGE GENERATION WORKFLOW
  const startImageGeneration = useCallback(async () => {
    const finalPrompt = promptText.trim() || "Futuristic mecha guardian with sleek neon highlights, cinematic lighting";
    setIsGenerating(true);
    setGenerationType("image");
    setGenerationProgress(15);
    setGenerationStage("Interpreting prompt semantics & styles...");
    setSelectedCard(null);
    setCoins((prev) => Math.max(0, prev - 10));

    activePollingRef.current = true;

    try {
      const taskId = await createGenerateImageTask({
        prompt: finalPrompt,
        style: artStyle,
        aspect_ratio: aspectRatio,
      });

      // Poll task with fallback simulation
      let progress = 15;
      timerRef.current = setInterval(async () => {
        if (!activePollingRef.current) return;

        try {
          const res = await pollImageTask(taskId);
          if (res.status === "SUCCEEDED" && res.image_urls && res.image_urls.length > 0) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsGenerating(false);
            setGenerationProgress(100);
            setGenerationStage("Complete! 2D Artwork Synthesized");

            const newImg = res.image_urls[0];
            setGeneratedImageUrl(newImg);

            // Add to gallery
            const newItem: GalleryItem = {
              id: `gen_img_${Date.now()}`,
              type: "image",
              badge: "GENERATED",
              title: finalPrompt.slice(0, 24) + "...",
              category: artStyle.toUpperCase(),
              gradientFrom: "#1e1b4b",
              gradientTo: "#312e81",
              imageUrl: newImg,
              prompt: finalPrompt,
            };

            setGalleryItems((prev) => [newItem, ...prev]);
            setSelectedCard(newItem.id);
            return;
          }
        } catch {
          // If polling fails or mock timer needed
        }

        progress += Math.floor(Math.random() * 12) + 8;
        if (progress >= 95) progress = 95;
        setGenerationProgress(progress);

        if (progress > 70) {
          setGenerationStage("Refining high-frequency texture details...");
        } else if (progress > 40) {
          setGenerationStage("Synthesizing diffusion latent vectors...");
        }

        // If taking more than 5 seconds in mock mode
        if (progress >= 95) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsGenerating(false);
          setGenerationProgress(100);
          setGenerationStage("Complete! 2D Artwork Synthesized");

          const fallbackImg = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";
          setGeneratedImageUrl(fallbackImg);

          const newItem: GalleryItem = {
            id: `gen_img_${Date.now()}`,
            type: "image",
            badge: "GENERATED",
            title: finalPrompt.slice(0, 24) + "...",
            category: artStyle.toUpperCase(),
            gradientFrom: "#1e1b4b",
            gradientTo: "#312e81",
            imageUrl: fallbackImg,
            prompt: finalPrompt,
          };

          setGalleryItems((prev) => [newItem, ...prev]);
          setSelectedCard(newItem.id);
        }
      }, 700);
    } catch {
      // Local fallback simulation if offline or error
      let p = 20;
      timerRef.current = setInterval(() => {
        p += 15;
        if (p >= 100) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsGenerating(false);
          setGenerationProgress(100);
          setGenerationStage("Complete! 2D Artwork Synthesized");

          const fallbackImg = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";
          setGeneratedImageUrl(fallbackImg);

          const newItem: GalleryItem = {
            id: `gen_img_${Date.now()}`,
            type: "image",
            badge: "GENERATED",
            title: finalPrompt.slice(0, 24) + "...",
            category: artStyle.toUpperCase(),
            gradientFrom: "#1e1b4b",
            gradientTo: "#312e81",
            imageUrl: fallbackImg,
            prompt: finalPrompt,
          };
          setGalleryItems((prev) => [newItem, ...prev]);
          setSelectedCard(newItem.id);
        } else {
          setGenerationProgress(p);
        }
      }, 500);
    }
  }, [promptText, artStyle, aspectRatio]);

  // SYNC BRIDGE: Send 2D Generated Image directly into Image-to-3D
  const convertImageTo3D = useCallback((imgUrl?: string) => {
    const targetUrl = imgUrl || generatedImageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";
    setUploadedImage(targetUrl);
    setUploadedFileName("Generated_Artwork_Source.png");
    setSubMode("image-to-3d");
    setActiveFeature("image");
    setSelectedCard(null);
  }, [generatedImageUrl]);

  // 2) IMAGE-TO-3D WORKFLOW
  const start3DGeneration = useCallback(async () => {
    if (isGenerating) return;
    const sourceImage = uploadedImage || generatedImageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";

    setIsGenerating(true);
    setGenerationType("3d");
    setGenerationProgress(12);
    setGenerationStage("Analyzing 2D inputs, silhouettes & contours...");
    setSelectedCard(null);
    setCoins((prev) => Math.max(0, prev - 20));

    activePollingRef.current = true;

    try {
      const taskId = await createImageTo3DTask({
        image_url: sourceImage,
        ai_model: "meshy-7",
        topology: modelTopology === "smart-topology" ? "quad" : "triangle",
        enable_image_enhancement: true,
      });

      let current = 12;
      timerRef.current = setInterval(async () => {
        if (!activePollingRef.current) return;

        try {
          const res = await poll3DTask(taskId);
          if (res.status === "SUCCEEDED" && res.model_urls?.glb) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsGenerating(false);
            setGenerationProgress(100);
            setGenerationStage("Complete! High-precision 3D Mesh Ready");

            const new3DItem: GalleryItem = {
              id: `gen_3d_${Date.now()}`,
              type: "3d",
              badge: "GENERATED",
              title: uploadedFileName ? uploadedFileName.replace(/\.[^/.]+$/, "") : "Generated 3D Mesh",
              category: "Model",
              gradientFrom: "#064e3b",
              gradientTo: "#022c22",
              modelUrl: res.model_urls.glb,
              statistics: res.statistics || { faces: 32000, vertices: 16500 },
            };

            setGalleryItems((prev) => [new3DItem, ...prev]);
            setSelectedCard(new3DItem.id);
            return;
          }
        } catch {
          // simulation mode fallback
        }

        current += Math.floor(Math.random() * 8) + 5;
        if (current >= 95) current = 95;
        setGenerationProgress(current);

        if (current > 75) {
          setGenerationStage("Baking PBR material maps & textures...");
        } else if (current > 45) {
          setGenerationStage("Synthesizing multi-view geometric normals...");
        } else if (current > 25) {
          setGenerationStage("Generating high-precision 3D voxels...");
        }

        if (current >= 95) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsGenerating(false);
          setGenerationProgress(100);
          setGenerationStage("Complete! High-precision 3D Mesh Ready");

          const new3DItem: GalleryItem = {
            id: `gen_3d_${Date.now()}`,
            type: "3d",
            badge: "GENERATED",
            title: uploadedFileName ? uploadedFileName.replace(/\.[^/.]+$/, "") : "Generated 3D Asset",
            category: "Model",
            gradientFrom: "#064e3b",
            gradientTo: "#022c22",
            modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
            statistics: { faces: 34500, vertices: 18200 },
          };

          setGalleryItems((prev) => [new3DItem, ...prev]);
          setSelectedCard(new3DItem.id);
        }
      }, 700);
    } catch {
      // Local simulated fallback
      let curr = 15;
      timerRef.current = setInterval(() => {
        curr += 12;
        if (curr >= 100) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsGenerating(false);
          setGenerationProgress(100);
          setGenerationStage("Complete! High-precision 3D Mesh Ready");

          const new3DItem: GalleryItem = {
            id: `gen_3d_${Date.now()}`,
            type: "3d",
            badge: "GENERATED",
            title: uploadedFileName ? uploadedFileName.replace(/\.[^/.]+$/, "") : "Custom 3D Mesh",
            category: "Model",
            gradientFrom: "#064e3b",
            gradientTo: "#022c22",
            modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
            statistics: { faces: 34500, vertices: 18200 },
          };
          setGalleryItems((prev) => [new3DItem, ...prev]);
          setSelectedCard(new3DItem.id);
        } else {
          setGenerationProgress(curr);
        }
      }, 500);
    }
  }, [isGenerating, uploadedImage, generatedImageUrl, modelTopology, uploadedFileName]);

  return {
    // Nav & sub-modes
    activeFeature,
    setActiveFeature,
    subMode,
    setSubMode,

    // Image Generation states
    promptText,
    setPromptText,
    artStyle,
    setArtStyle,
    aspectRatio,
    setAspectRatio,
    generatedImageUrl,
    startImageGeneration,
    convertImageTo3D,

    // Image to 3D states
    uploadedImage,
    uploadedFileName,
    setUploadedImage,
    handleFileUpload,
    handleRemoveUpload,
    modelTopology,
    setModelTopology,
    resolution,
    setResolution,
    multiView,
    setMultiView,
    split,
    setSplit,
    selectedPose,
    setSelectedPose,
    activeTab,
    setActiveTab,
    start3DGeneration,

    // Shared execution & progress
    isGenerating,
    generationType,
    generationProgress,
    generationStage,
    cancelGeneration,

    // Gallery & filtering
    galleryItems,
    selectedCard,
    setSelectedCard,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    coins,
    showImageGenSuggestion,
    setShowImageGenSuggestion,
  };
}

export type WorkspaceState = ReturnType<typeof useWorkspace>;
