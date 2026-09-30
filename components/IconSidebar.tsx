"use client";

import { Sparkles, Box, Settings, Bell, LayoutGrid } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "@/components/theme/ThemeProvider";

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
  const { openSettings } = useTheme();

  return (
    <aside className="w-[56px] h-full bg-sidebar-bg border-r border-border-subtle flex flex-col items-center justify-between py-3 flex-shrink-0 select-none z-20 backdrop-blur-xl transition-colors">
      {/* Top Group: Logo & Nav items */}
      <div className="flex flex-col items-center gap-3 w-full">
        {/* App Logo */}
        <div
          className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00ffa3] to-[#00c3ff] flex items-center justify-center shadow-[0_0_12px_rgba(0,255,163,0.3)] cursor-pointer hover:scale-105 transition-transform"
          title="Studio3D"
        >
          <Box className="w-4 h-4 text-[#050508]" />
        </div>

        {/* Feature Nav Icons */}
        <div className="flex flex-col items-center gap-1.5 w-full mt-2">
          {/* Sparkles icon -> "Image" */}
          <button
            onClick={() => onSelectFeature("image-gen")}
            title="Image Generation"
            aria-label="Image Generation"
            className={`relative group w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              activeFeature === "image-gen"
                ? "text-[#059669] dark:text-[#00ffa3] bg-[rgba(5,150,105,0.12)] dark:bg-[rgba(0,255,163,0.12)] border border-[rgba(5,150,105,0.25)] dark:border-[rgba(0,255,163,0.3)] shadow-sm font-bold"
                : "text-text-muted hover:text-text-primary hover:bg-bg-surface-hover"
            }`}
          >
            <Sparkles className="w-5 h-5" />
            {/* Tooltip */}
            <span className="absolute left-[62px] px-2.5 py-1 bg-bg-surface border border-border-subtle text-text-primary text-[11px] rounded-lg shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 backdrop-blur-xl">
              Image
            </span>
          </button>

          {/* Box icon -> "3D" */}
          <button
            onClick={() => onSelectFeature("image-to-3d")}
            title="Image to 3D"
            aria-label="Image to 3D"
            className={`relative group w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              activeFeature === "image-to-3d"
                ? "text-[#059669] dark:text-[#00ffa3] bg-[rgba(5,150,105,0.12)] dark:bg-[rgba(0,255,163,0.12)] border border-[rgba(5,150,105,0.25)] dark:border-[rgba(0,255,163,0.3)] shadow-sm font-bold"
                : "text-text-muted hover:text-text-primary hover:bg-bg-surface-hover"
            }`}
          >
            <Box className="w-5 h-5" />
            {/* Tooltip */}
            <span className="absolute left-[62px] px-2.5 py-1 bg-bg-surface border border-border-subtle text-text-primary text-[11px] rounded-lg shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 backdrop-blur-xl">
              3D
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Group: Settings, Bell, Grid, Clerk Avatar, Upgrade */}
      <div className="flex flex-col items-center gap-2 w-full">
        {/* Thin divider */}
        <div className="w-6 h-[1px] bg-border-subtle mb-1" />

        {/* Grid icon (Assets) */}
        <button
          title="Assets"
          className="relative group w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-surface-hover transition-colors cursor-pointer"
        >
          <LayoutGrid className="w-4 h-4" />
          <span className="absolute left-[62px] px-2.5 py-1 bg-bg-surface border border-border-subtle text-text-primary text-[11px] rounded-lg shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 backdrop-blur-xl">
            Assets
          </span>
        </button>

        {/* Bell icon */}
        <button
          title="Notifications"
          className="relative group w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-surface-hover transition-colors cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute left-[62px] px-2.5 py-1 bg-bg-surface border border-border-subtle text-text-primary text-[11px] rounded-lg shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 backdrop-blur-xl">
            Notifications
          </span>
        </button>

        {/* Settings icon */}
        <button
          onClick={openSettings}
          title="Settings"
          aria-label="Settings"
          className="relative group w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-surface-hover transition-colors cursor-pointer"
        >
          <Settings className="w-4 h-4" />
          <span className="absolute left-[62px] px-2.5 py-1 bg-bg-surface border border-border-subtle text-text-primary text-[11px] rounded-lg shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 backdrop-blur-xl">
            Settings
          </span>
        </button>

        {/* User avatar circle, 32px */}
        <div className="my-0.5 flex items-center justify-center">
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox: "w-8 h-8 rounded-full border border-border-subtle",
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Action
                label="Theme & Settings"
                labelIcon={<Settings className="w-4 h-4" />}
                onClick={openSettings}
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>

        {/* Upgrade button: neon primary pill */}
        <button
          onClick={onUpgradeClick}
          title="Upgrade Plan"
          className="btn-primary text-[10px] font-bold px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(0,255,163,0.3)] transition-colors leading-tight cursor-pointer"
        >
          Upgrade
        </button>
      </div>
    </aside>
  );
}
