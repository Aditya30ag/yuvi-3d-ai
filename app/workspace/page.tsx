"use client";

import React, { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useWorkspace } from "@/hooks/useWorkspace";
import { TopNav } from "@/components/workspace/TopNav";
import { IconSidebar } from "@/components/workspace/IconSidebar";
import { LeftPanel } from "@/components/workspace/LeftPanel";
import { CenterCanvas } from "@/components/workspace/CenterCanvas";
import { RightPanel } from "@/components/workspace/RightPanel";

export default function WorkspacePage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const workspace = useWorkspace();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in");
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded || !userId) {
    return (
      <div className="w-screen h-screen bg-[#050508] flex flex-col items-center justify-center gap-3">
        <div className="w-9 h-9 rounded-full border-2 border-[#00ffa3] border-t-transparent animate-spin" />
        <span className="text-xs text-white/50 font-medium">Checking authorization...</span>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* TOP NAVIGATION BAR (Fixed top-0, height 48px) */}
      <TopNav
        coins={workspace.coins}
        onUpgradeClick={() => {
          // Trigger upgrade or banner focus
        }}
      />

      {/* 4 COLUMNS FULL-SCREEN CONTAINER (Below 48px TopNav) */}
      <div className="relative w-full h-[calc(100vh-48px)] mt-[48px] bg-[#050508] flex overflow-hidden">
        {/* PANEL 1: ICON SIDEBAR (56px) */}
        <IconSidebar
          activeFeature={workspace.activeFeature}
          onSelectFeature={workspace.setActiveFeature}
        />

        {/* PANEL 2: LEFT PANEL (345px) */}
        <LeftPanel workspace={workspace} />

        {/* PANEL 3: CENTER CANVAS (flex-1) */}
        <CenterCanvas workspace={workspace} />

        {/* PANEL 4: RIGHT PANEL (420px) */}
        <RightPanel workspace={workspace} />
      </div>
    </div>
  );
}
