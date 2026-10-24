"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import { createGenerateImageTask, pollImageTask } from "@/lib/meshy";
import {
  ApiError,
  BackendProvider,
  Design,
  DesignStatus,
  HealthResponse,
  MeshModelsResponse,
  MeshProvider,
  deleteDesign,
  downloadDesignStl,
  getDesign,
  getHealth,
  imageUrlToFile,
  listDesigns,
  listMeshModels,
  make3DDesign,
  validateImageFile,
} from "@/lib/api";

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
  // Set for designs stored in the Django backend
  assetId?: string;
  status?: DesignStatus;
  errorMessage?: string;
  stlUrl?: string;
  meshModel?: string;
  createdAt?: string;
}

/** One selectable entry in the "AI model" dropdown: a provider, plus a model for Fal. */
export interface MeshEngineOption {
  id: string;
  provider: MeshProvider;
  model?: string;
  label: string;
  description: string;
  configured: boolean;
}

const DESIGN_POLL_INTERVAL_MS = 3000;

const PROVIDER_LABELS: Record<BackendProvider, string> = {
  HYPERBOLIC: "Hyperbolic",
  HUGGINGFACE: "Hugging Face",
  FALAI: "Fal.ai",
};

// Used until /health/ and /models/ respond (or if they fail)
const FALLBACK_ENGINES: MeshEngineOption[] = [
  {
    id: "hyperbolic",
    provider: "hyperbolic",
    label: "Hyperbolic (local STL)",
    description: "Fast relief-style mesh from your photo",
    configured: true,
  },
];

function buildEngineOptions(
  health: HealthResponse | null,
  models: MeshModelsResponse | null
): MeshEngineOption[] {
  const providers = health?.providers;
  const engines: MeshEngineOption[] = [];

  if (providers) {
    (["hyperbolic", "huggingface"] as const).forEach((provider) => {
      const info = providers[provider];
      if (!info) return;
      engines.push({
        id: provider,
        provider,
        label: info.label,
        description: info.description,
        configured: info.configured,
      });
    });
  } else {
    engines.push(...FALLBACK_ENGINES);
  }

  const falConfigured = providers?.falai?.configured ?? true;
  (models?.models || []).forEach((m) => {
    engines.push({
      id: `falai:${m.key}`,
      provider: "falai",
      model: m.key,
      label: `Fal.ai · ${m.label}`,
      description: m.description,
      configured: falConfigured,
    });
  });

  return engines.length > 0 ? engines : FALLBACK_ENGINES;
}

function designToGalleryItem(design: Design): GalleryItem {
  const prompt = design.prompt || "";
  return {
    id: design.id,
    assetId: design.id,
    type: "3d",
    badge: "GENERATED",
    title: prompt ? (prompt.length > 32 ? `${prompt.slice(0, 32)}...` : prompt) : "3D Design",
    category: PROVIDER_LABELS[design.provider] || design.provider,
    gradientFrom: "#064e3b",
    gradientTo: "#022c22",
    imageUrl: design.input_image_url || undefined,
    // Hyperbolic reports its STL as output_glb_url; model-viewer can only render GLB/GLTF
    modelUrl: design.output_glb_url && /\.(glb|gltf)(\?|$)/i.test(design.output_glb_url)
      ? design.output_glb_url
      : undefined,
    stlUrl: design.output_stl_url || undefined,
    prompt,
    status: design.status,
    errorMessage: design.error_message || undefined,
    meshModel: design.mesh_model,
    createdAt: design.created_at,
  };
}

function errorMessage(err: unknown, fallback: string) {
  if (err instanceof ApiError || err instanceof Error) return err.message || fallback;
  return fallback;
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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isPreparingImage, setIsPreparingImage] = useState<boolean>(false);
  const [modelTopology, setModelTopology] = useState<"high-detail" | "smart-topology">("high-detail");
  const [resolution, setResolution] = useState<"standard" | "ultra-2k" | "ultra-4k">("standard");
  const [multiView, setMultiView] = useState<boolean>(false);
  const [split, setSplit] = useState<boolean>(false);
  const [selectedPose, setSelectedPose] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  // Backend mesh engines (providers + Fal models)
  const [meshEngines, setMeshEngines] = useState<MeshEngineOption[]>(FALLBACK_ENGINES);
  const [selectedEngineId, setSelectedEngineId] = useState<string>(FALLBACK_ENGINES[0].id);

  // Generation execution & progress
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationType, setGenerationType] = useState<"image" | "3d" | null>(null);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [generationStage, setGenerationStage] = useState<string>("Initializing...");

  // Gallery and Selection
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY_ITEMS);
  const [isLoadingDesigns, setIsLoadingDesigns] = useState<boolean>(true);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("all");
  const [coins, setCoins] = useState<number>(100);
  const [showImageGenSuggestion, setShowImageGenSuggestion] = useState<boolean>(true);

  const activePollingRef = useRef<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // Backend asset id of the 3D job the progress overlay is tracking
  const activeAssetIdRef = useRef<string | null>(null);

  // Clean timers on unmount
  useEffect(() => {
    return () => {
      activePollingRef.current = false;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Load the user's saved designs, keeping local-only items (examples, 2D generations)
  const refreshDesigns = useCallback(async () => {
    try {
      const designs = await listDesigns();
      const designItems = designs.map(designToGalleryItem);
      setGalleryItems((prev) => [...designItems, ...prev.filter((item) => !item.assetId)]);
    } catch (err) {
      toast.error(errorMessage(err, "Could not load your designs"));
    } finally {
      setIsLoadingDesigns(false);
    }
  }, []);

  // Initial load: designs + available mesh engines
  useEffect(() => {
    refreshDesigns();

    Promise.allSettled([getHealth(), listMeshModels()]).then(([healthRes, modelsRes]) => {
      const health = healthRes.status === "fulfilled" ? healthRes.value : null;
      const models = modelsRes.status === "fulfilled" ? modelsRes.value : null;
      if (!health && !models) return;

      const engines = buildEngineOptions(health, models);
      setMeshEngines(engines);

      const defaultProvider = health?.default_provider || "hyperbolic";
      const preferred =
        engines.find((e) => e.provider === defaultProvider && e.configured) ||
        engines.find((e) => e.configured) ||
        engines[0];
      if (preferred) setSelectedEngineId(preferred.id);
    });
  }, [refreshDesigns]);

  const selectedEngine = meshEngines.find((e) => e.id === selectedEngineId) || meshEngines[0];

  // Upload handler: keep the File for the multipart request, preview via FileReader
  const handleFileUpload = useCallback((file: File) => {
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setUploadedFile(file);
    setUploadedFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setUploadedImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const handleRemoveUpload = useCallback(() => {
    setUploadedImage(null);
    setUploadedFileName(null);
    setUploadedFile(null);
  }, []);

  // Cancel any in-flight task. A backend 3D job keeps running and stays in the gallery.
  const cancelGeneration = useCallback(() => {
    activePollingRef.current = false;
    activeAssetIdRef.current = null;
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
  const convertImageTo3D = useCallback(async (imgUrl?: string) => {
    const targetUrl = imgUrl || generatedImageUrl;
    setSubMode("image-to-3d");
    setActiveFeature("image");
    setSelectedCard(null);
    if (!targetUrl) return;

    setUploadedImage(targetUrl);
    setUploadedFileName("Generated_Artwork_Source.png");
    setUploadedFile(null);
    setIsPreparingImage(true);
    try {
      const file = await imageUrlToFile(targetUrl, "Generated_Artwork_Source");
      const validationError = validateImageFile(file);
      if (validationError) throw new Error(validationError);
      setUploadedFile(file);
      setUploadedFileName(file.name);
    } catch (err) {
      toast.error(errorMessage(err, "Could not load the generated image. Please download and upload it manually."));
    } finally {
      setIsPreparingImage(false);
    }
  }, [generatedImageUrl]);

  // Merge a fresh backend design into the gallery and settle the progress overlay if it's the tracked job
  const applyDesignUpdate = useCallback((design: Design) => {
    const updated = designToGalleryItem(design);
    setGalleryItems((prev) => prev.map((item) => (item.assetId === design.id ? updated : item)));

    if (activeAssetIdRef.current !== design.id) return;
    if (design.status === "COMPLETED") {
      activeAssetIdRef.current = null;
      setIsGenerating(false);
      setGenerationProgress(100);
      setGenerationStage("Complete! 3D Mesh Ready");
      setSelectedCard(updated.id);
      toast.success("Your 3D model is ready");
    } else if (design.status === "FAILED") {
      activeAssetIdRef.current = null;
      setIsGenerating(false);
      setGenerationProgress(0);
      setGenerationStage("Generation failed");
      setSelectedCard(updated.id);
      toast.error(design.error_message || "3D generation failed");
    }
  }, []);

  // Poll every pending backend design until it completes or fails
  const pendingAssetIds = galleryItems
    .filter((item) => item.assetId && (item.status === "PENDING" || item.status === "PROCESSING"))
    .map((item) => item.assetId as string)
    .join(",");

  useEffect(() => {
    if (!pendingAssetIds) return;
    const ids = pendingAssetIds.split(",");
    let inFlight = false;

    const interval = setInterval(async () => {
      if (inFlight) return;
      inFlight = true;
      const results = await Promise.allSettled(ids.map((id) => getDesign(id)));
      inFlight = false;
      results.forEach((result) => {
        if (result.status === "fulfilled") applyDesignUpdate(result.value);
      });
    }, DESIGN_POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [pendingAssetIds, applyDesignUpdate]);

  // The backend reports no percentage, so ease the bar toward 90% while the job runs
  useEffect(() => {
    if (!isGenerating || generationType !== "3d") return;
    const interval = setInterval(() => {
      if (!activeAssetIdRef.current) return;
      setGenerationProgress((prev) => {
        const next = Math.min(90, prev + Math.max(1, Math.round((90 - prev) / 12)));
        if (next > 70) setGenerationStage("Converting mesh to GLB & STL...");
        else if (next > 40) setGenerationStage("Reconstructing 3D geometry...");
        else setGenerationStage("Analyzing image silhouettes & contours...");
        return next;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [isGenerating, generationType]);

  // 2) IMAGE-TO-3D WORKFLOW (Django: POST /api/v1/3d/make_3d_design/)
  const start3DGeneration = useCallback(async () => {
    if (isGenerating) return;
    if (isPreparingImage) {
      toast.info("Still preparing the image, try again in a moment");
      return;
    }
    if (!uploadedFile) {
      toast.error("Upload an image first");
      setSubMode("image-to-3d");
      return;
    }
    if (selectedEngine && !selectedEngine.configured) {
      toast.error(`${selectedEngine.label} is not configured on the backend`);
      return;
    }

    const baseName = uploadedFile.name.replace(/\.[^/.]+$/, "");
    const prompt = promptText.trim() || `3D model of ${baseName}`;

    setIsGenerating(true);
    setGenerationType("3d");
    setGenerationProgress(5);
    setGenerationStage("Uploading image...");
    setSelectedCard(null);

    try {
      const res = await make3DDesign({
        image: uploadedFile,
        prompt,
        provider: selectedEngine?.provider || "hyperbolic",
        model: selectedEngine?.model,
      });

      activeAssetIdRef.current = res.id;
      setCoins((prev) => Math.max(0, prev - 20));
      setGenerationProgress(12);
      setGenerationStage("Analyzing image silhouettes & contours...");

      const now = new Date().toISOString();
      const placeholder = designToGalleryItem({
        id: res.id,
        user_id: "",
        provider: res.provider,
        mesh_model: res.model,
        prompt,
        provider_task_id: null,
        status: "PROCESSING",
        input_image_url: uploadedImage || "",
        output_glb_url: null,
        output_stl_url: null,
        error_message: null,
        created_at: now,
        updated_at: now,
      });
      setGalleryItems((prev) => [placeholder, ...prev.filter((item) => item.assetId !== res.id)]);
    } catch (err) {
      activeAssetIdRef.current = null;
      setIsGenerating(false);
      setGenerationType(null);
      setGenerationProgress(0);
      setGenerationStage("Generation failed");
      toast.error(errorMessage(err, "Could not start 3D generation"));
      // A provider failure may still have created a FAILED record
      refreshDesigns();
    }
  }, [isGenerating, isPreparingImage, uploadedFile, uploadedImage, selectedEngine, promptText, refreshDesigns]);

  const downloadStl = useCallback(async (item: GalleryItem) => {
    if (!item.assetId) return;
    try {
      const slug = item.title.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "").slice(0, 40) || "model";
      await downloadDesignStl(item.assetId, `${slug}.stl`);
    } catch (err) {
      toast.error(errorMessage(err, "STL download failed"));
    }
  }, []);

  const deleteGalleryItem = useCallback(async (item: GalleryItem) => {
    if (!item.assetId) return;
    try {
      await deleteDesign(item.assetId);
      if (activeAssetIdRef.current === item.assetId) cancelGeneration();
      setGalleryItems((prev) => prev.filter((g) => g.id !== item.id));
      setSelectedCard((prev) => (prev === item.id ? null : prev));
      toast.success("Design deleted");
    } catch (err) {
      toast.error(errorMessage(err, "Could not delete design"));
    }
  }, [cancelGeneration]);

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
    uploadedFile,
    isPreparingImage,
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
    meshEngines,
    selectedEngine,
    setSelectedEngineId,
    start3DGeneration,

    // Shared execution & progress
    isGenerating,
    generationType,
    generationProgress,
    generationStage,
    cancelGeneration,

    // Gallery & filtering
    galleryItems,
    isLoadingDesigns,
    refreshDesigns,
    downloadStl,
    deleteGalleryItem,
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
