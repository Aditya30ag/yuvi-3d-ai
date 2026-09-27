"use client";

import { Sparkles, Box, Settings, Bell, LayoutGrid } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

interface IconSidebarProps {
  activeFeature: "image-gen" | "image-to-3d";
  onSelectFeature: (feature: "image-gen" | "image-to-3d") => void;
  onUpgradeClick?: () => void;
}

export function IconSidebar({
  activeFeature,
  onSelectFeature,
  onUpgradeClick,
}: IconSidebarProps) {
  return (
    <aside className="w-[56px] h-full bg-[#0a0a0a] border-r border-[#1f1f1f] flex flex-col items-center justify-between py-3 flex-shrink-0 select-none z-20">
      {/* Top Group: Logo & Nav items */}
      <div className="flex flex-col items-center gap-3 w-full">
        {/* App Logo */}
        <div
          className="w-8 h-8 rounded-lg bg-[#a3e635] flex items-center justify-center shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
          title="Studio3D"
        >
          <Box className="w-4 h-4 text-black" />
        </div>

        {/* Feature Nav Icons */}
        <div className="flex flex-col items-center gap-1.5 w-full mt-2">
          {/* Sparkles icon -> "Image" */}
          <button
            onClick={() => onSelectFeature("image-gen")}
            title="Image Generation"
            aria-label="Image Generation"
            className={`relative group w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              activeFeature === "image-gen"
                ? "text-white bg-[#1f1f1f]"
                : "text-[#555555] hover:text-[#888888]"
            }`}
          >
            <Sparkles className="w-5 h-5" />
            {/* Tooltip */}
            <span className="absolute left-[62px] px-2 py-1 bg-[#141414] border border-[#2a2a2a] text-white text-[11px] rounded shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              Image
            </span>
          </button>

          {/* Box icon -> "3D" */}
          <button
            onClick={() => onSelectFeature("image-to-3d")}
            title="Image to 3D"
            aria-label="Image to 3D"
            className={`relative group w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              activeFeature === "image-to-3d"
                ? "text-white bg-[#1f1f1f]"
                : "text-[#555555] hover:text-[#888888]"
            }`}
          >
            <Box className="w-5 h-5" />
            {/* Tooltip */}
            <span className="absolute left-[62px] px-2 py-1 bg-[#141414] border border-[#2a2a2a] text-white text-[11px] rounded shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              3D
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Group: Settings, Bell, Grid, Clerk Avatar, Upgrade */}
      <div className="flex flex-col items-center gap-2 w-full">
        {/* Thin divider */}
        <div className="w-6 h-[1px] bg-[#1f1f1f] mb-1" />

        {/* Grid icon (Assets) */}
        <button
          title="Assets"
          className="relative group w-10 h-10 rounded-lg flex items-center justify-center text-[#555555] hover:text-[#888888] transition-colors"
        >
          <LayoutGrid className="w-4 h-4" />
          <span className="absolute left-[62px] px-2 py-1 bg-[#141414] border border-[#2a2a2a] text-white text-[11px] rounded shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            Assets
          </span>
        </button>

        {/* Bell icon */}
        <button
          title="Notifications"
          className="relative group w-10 h-10 rounded-lg flex items-center justify-center text-[#555555] hover:text-[#888888] transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute left-[62px] px-2 py-1 bg-[#141414] border border-[#2a2a2a] text-white text-[11px] rounded shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            Notifications
          </span>
        </button>

        {/* Settings icon */}
        <button
          title="Settings"
          className="relative group w-10 h-10 rounded-lg flex items-center justify-center text-[#555555] hover:text-[#888888] transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span className="absolute left-[62px] px-2 py-1 bg-[#141414] border border-[#2a2a2a] text-white text-[11px] rounded shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            Settings
          </span>
        </button>

        {/* User avatar circle, 32px */}
        <div className="my-0.5 flex items-center justify-center">
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox: "w-8 h-8 rounded-full border border-[#2a2a2a]",
              },
            }}
          />
        </div>

        {/* Upgrade button (small, lime green #a3e635 background, rounded, text-xs) */}
        <button
          onClick={onUpgradeClick}
          title="Upgrade Plan"
          className="bg-[#a3e635] hover:bg-[#8ece26] text-black font-semibold text-[10px] px-2 py-1 rounded-full transition-colors leading-tight"
        >
          Upgrade
        </button>
      </div>
    </aside>
  );
}
