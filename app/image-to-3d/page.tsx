import { Workspace } from "@/components/Workspace";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Studio3D - Image to 3D",
  description: "Convert images to full 3D models with Meshy AI",
};

export default function ImageTo3DPage() {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  return <Workspace initialFeature="image-to-3d" />;
}
