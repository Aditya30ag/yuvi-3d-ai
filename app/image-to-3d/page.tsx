import { Workspace } from "@/components/Workspace";

export const metadata = {
  title: "Studio3D - Image to 3D",
  description: "Convert images to full 3D models with Meshy AI",
};

export default function ImageTo3DPage() {
  return <Workspace initialFeature="image-to-3d" />;
}
