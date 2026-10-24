/**
 * Client for the Django backend (yuvi-3d-ai).
 *
 * Auth: passwordless email OTP. `verifyOtp` returns a JWT which is stored in
 * localStorage and sent as `Authorization: Bearer <token>` on every
 * `/api/v1/3d/*` request. A mirror cookie lets the Next.js middleware gate
 * protected pages without reading localStorage.
 */

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"
).replace(/\/$/, "");

export const TOKEN_STORAGE_KEY = "yuvi_access_token";
export const EMAIL_STORAGE_KEY = "yuvi_user_email";
export const TOKEN_COOKIE_NAME = "yuvi_token";

// Backend tokens live for 7 days (accounts/auth_utils.py TOKEN_LIFETIME)
const TOKEN_COOKIE_MAX_AGE = 7 * 24 * 60 * 60;

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const ALLOWED_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

// ---------------------------------------------------------------------------
// Types (mirror mesh_generator/utils.py asset_to_dict and friends)
// ---------------------------------------------------------------------------

export type DesignStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
export type BackendProvider = "FALAI" | "HYPERBOLIC" | "HUGGINGFACE";
export type MeshProvider = "hyperbolic" | "huggingface" | "falai";

export interface Design {
  id: string;
  user_id: string;
  provider: BackendProvider;
  mesh_model: string;
  prompt: string;
  provider_task_id: string | null;
  status: DesignStatus;
  input_image_url: string;
  output_glb_url: string | null;
  output_stl_url: string | null;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface MeshModel {
  key: string;
  endpoint_id: string;
  label: string;
  description: string;
  parameters: Record<string, { default: unknown; description: string }>;
}

export interface MeshModelsResponse {
  default: string;
  models: MeshModel[];
}

export interface ProviderInfo {
  label: string;
  configured: boolean;
  description: string;
}

export interface HealthResponse {
  service: string;
  status: string;
  default_provider: MeshProvider;
  providers: Record<MeshProvider, ProviderInfo>;
  keys: {
    ready_for_3d: boolean;
    [key: string]: unknown;
  };
}

export interface MakeDesignPayload {
  image: File;
  prompt: string;
  provider: MeshProvider;
  model?: string;
  options?: Record<string, unknown>;
}

export interface MakeDesignResponse {
  id: string;
  provider: BackendProvider;
  model: string;
  engine: string;
  output_format: string;
}

export interface RequestOtpResponse {
  detail: string;
  dev_code?: string;
}

export interface VerifyOtpResponse {
  access_token: string;
  email: string;
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// ---------------------------------------------------------------------------
// Token storage
// ---------------------------------------------------------------------------

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function getStoredEmail(): string | null {
  try {
    return localStorage.getItem(EMAIL_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function storeSession(token: string, email: string) {
  try {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    localStorage.setItem(EMAIL_STORAGE_KEY, email);
  } catch {
    // Storage may be blocked; the cookie below still gates navigation
  }
  document.cookie = `${TOKEN_COOKIE_NAME}=${encodeURIComponent(token)}; path=/; max-age=${TOKEN_COOKIE_MAX_AGE}; samesite=lax`;
}

export function clearSession() {
  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(EMAIL_STORAGE_KEY);
  } catch {}
  document.cookie = `${TOKEN_COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
}

// Invoked whenever an authenticated request comes back 401 (expired/invalid token)
let unauthorizedHandler: (() => void) | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null) {
  unauthorizedHandler = handler;
}

// ---------------------------------------------------------------------------
// Core request helper
// ---------------------------------------------------------------------------

interface RequestOptions extends RequestInit {
  auth?: boolean;
}

async function request(path: string, { auth = true, headers, ...init }: RequestOptions = {}) {
  const finalHeaders = new Headers(headers);

  if (auth) {
    const token = getStoredToken();
    if (!token) {
      unauthorizedHandler?.();
      throw new ApiError("You are signed out. Please sign in again.", 401);
    }
    finalHeaders.set("Authorization", `Bearer ${token}`);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers: finalHeaders });
  } catch {
    throw new ApiError(
      `Cannot reach the backend at ${API_BASE_URL}. Is the Django server running?`,
      0
    );
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const message =
      (data && (data.detail || data.error || data.message)) ||
      `Request failed (${response.status})`;

    if (response.status === 401 && auth) {
      unauthorizedHandler?.();
    }
    throw new ApiError(message, response.status);
  }

  return response;
}

async function requestJson<T>(path: string, options?: RequestOptions): Promise<T> {
  const response = await request(path, options);
  return response.json() as Promise<T>;
}

function jsonBody(body: unknown): RequestInit {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

// ---------------------------------------------------------------------------
// Accounts: /accounts/*
// ---------------------------------------------------------------------------

export function requestOtp(email: string) {
  return requestJson<RequestOtpResponse>("/accounts/request-otp/", {
    auth: false,
    ...jsonBody({ email }),
  });
}

export function verifyOtp(email: string, code: string) {
  return requestJson<VerifyOtpResponse>("/accounts/verify-otp/", {
    auth: false,
    ...jsonBody({ email, code }),
  });
}

export async function logout() {
  // Stateless on the server; failures are irrelevant since the client drops the token
  await request("/accounts/logout/", { auth: false, method: "POST" }).catch(() => undefined);
}

// ---------------------------------------------------------------------------
// Service info (public)
// ---------------------------------------------------------------------------

export function getHealth() {
  return requestJson<HealthResponse>("/health/", { auth: false });
}

export function listMeshModels() {
  return requestJson<MeshModelsResponse>("/api/v1/3d/models/", { auth: false });
}

// ---------------------------------------------------------------------------
// Designs: /api/v1/3d/*
// ---------------------------------------------------------------------------

export function make3DDesign({ image, prompt, provider, model, options }: MakeDesignPayload) {
  const formData = new FormData();
  formData.append("image", image, image.name);
  formData.append("prompt", prompt);
  formData.append("provider", provider);
  if (model) formData.append("model", model);
  if (options && Object.keys(options).length > 0) {
    formData.append("options", JSON.stringify(options));
  }

  return requestJson<MakeDesignResponse>("/api/v1/3d/make_3d_design/", {
    method: "POST",
    body: formData,
  });
}

export async function listDesigns(): Promise<Design[]> {
  const data = await requestJson<{ user_id: string; designs: Design[] }>("/api/v1/3d/designs/");
  return data.designs;
}

export function getDesign(id: string) {
  return requestJson<Design>(`/api/v1/3d/asset/${id}/`);
}

export async function deleteDesign(id: string) {
  await request(`/api/v1/3d/asset/${id}/`, { method: "DELETE" });
}

export async function downloadDesignStl(id: string, filename = "model.stl") {
  const response = await request(`/api/v1/3d/asset/${id}/?download=true`);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function validateImageFile(file: File): string | null {
  const dot = file.name.lastIndexOf(".");
  const ext = dot >= 0 ? file.name.slice(dot).toLowerCase() : "";
  if (!ALLOWED_IMAGE_EXTENSIONS.includes(ext)) {
    return "Unsupported format. Use JPG, PNG, WebP, or GIF.";
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return "File too large (max 10 MB).";
  }
  return null;
}

const MIME_EXTENSIONS: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

/** Turn a remote/data URL (e.g. a generated 2D image) into an uploadable File. */
export async function imageUrlToFile(url: string, baseName = "source"): Promise<File> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not fetch image (${response.status})`);
  }
  const blob = await response.blob();
  const ext = MIME_EXTENSIONS[blob.type] || ".png";
  return new File([blob], `${baseName}${ext}`, { type: blob.type || "image/png" });
}
