import { redirect } from "next/navigation";

// The image-to-3D studio now lives in /workspace, backed by the Django API
export default function ImageTo3DPage() {
  redirect("/workspace");
}
