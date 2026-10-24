import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "Studio3D — Turn a Photo into a Printable 3D Model",
  description:
    "Upload a product photo, pick an AI engine and download an STL ready for 3D printing, with an in-browser 3D preview.",
};

export default function HomePage() {
  return <LandingPage />;
}
