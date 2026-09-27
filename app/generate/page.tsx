import { Workspace } from "@/components/Workspace";

export const metadata = {
  title: "Studio3D - AI 3D & Image Workspace",
  description: "Create stunning 3D meshes and images powered by Meshy AI",
};

export default function GeneratePage() {
  return <Workspace initialFeature="image-gen" />;
}
