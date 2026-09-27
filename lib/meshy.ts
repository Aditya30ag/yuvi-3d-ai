export type ArtStyle = "realistic" | "anime" | "cartoon" | "low-poly" | "cinematic";

export interface MeshyImageTask {
  id: string;
  status: "PENDING" | "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | "EXPIRED";
  progress: number;
  image_urls?: string[];
  error?: { message: string };
  task_error?: { message: string };
  name?: string;
  prompt?: string;
  created_at?: number;
  type?: "image";
  badge?: "EXAMPLE" | "TEMPLATE";
}

export interface MeshyImage3DTask {
  id: string;
  status: "PENDING" | "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | "EXPIRED";
  progress: number;
  model_urls?: {
    glb: string;
    fbx: string;
    obj: string;
    usdz: string;
    stl?: string;
  };
  thumbnail_url?: string;
  model_viewer_url?: string;
  statistics?: {
    faces: number;
    vertices: number;
  };
  error?: { message: string };
  task_error?: { message: string };
  name?: string;
  prompt?: string;
  topology?: string;
  ai_model?: string;
  created_at?: number;
  type?: "3d";
  badge?: "EXAMPLE" | "TEMPLATE";
}

export type GenerationItem = MeshyImageTask | MeshyImage3DTask;
export type PollImageResponse = MeshyImageTask;
export type Poll3DResponse = MeshyImage3DTask;

export interface GenerateImagePayload {
  prompt: string;
  style?: string;
  aspect_ratio?: string;
}

export interface ImageTo3DPayload {
  image_url: string;
  ai_model?: string;
  enable_image_enhancement?: boolean;
  topology?: "triangle" | "quad";
  enable_pbr?: boolean;
  target_formats?: string[];
  pose_mode?: string;
}

export async function createGenerateImageTask(payload: GenerateImagePayload): Promise<string> {
  const response = await fetch("/api/meshy/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Image generation failed (${response.status})`);
  }

  const data = await response.json();
  return data.result;
}

export async function pollImageTask(taskId: string): Promise<MeshyImageTask> {
  const response = await fetch(`/api/meshy/poll-image/${taskId}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Polling image task failed (${response.status})`);
  }

  return response.json();
}

export async function createImageTo3DTask(payload: ImageTo3DPayload): Promise<string> {
  const response = await fetch("/api/meshy/image-to-3d", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Image-to-3D failed (${response.status})`);
  }

  const data = await response.json();
  return data.result;
}

export async function poll3DTask(taskId: string): Promise<MeshyImage3DTask> {
  const response = await fetch(`/api/meshy/poll-3d/${taskId}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Polling 3D task failed (${response.status})`);
  }

  return response.json();
}

export async function uploadImageFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Upload failed (${response.status})`);
  }

  const data = await response.json();
  return data.dataUrl || data.url;
}
