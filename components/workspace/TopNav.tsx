"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Bell,
  Crown,
  Settings as SettingsIcon,
} from "lucide-react";
import { UserMenu } from "@/components/auth/UserMenu";
import { useTheme } from "@/components/theme/ThemeProvider";
import { FeatureType } from "@/hooks/useWorkspace";
import { WorkspaceMenu } from "./WorkspaceMenu";

interface TopNavProps {
  coins?: number;
  onUpgradeClick?: () => void;
  activeFeature?: FeatureType;
  onSelectFeature?: (feature: FeatureType) => void;
}

export function TopNav({ coins = 100, onUpgradeClick, activeFeature, onSelectFeature }: TopNavProps) {
  const { openSettings } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 h-[48px] bg-sidebar-bg border-b border-border-subtle z-50 flex items-center justify-between px-3.5 select-none backdrop-blur-2xl transition-colors">
      {/* Left Section: Neon Gradient Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center group">
          <div className="w-[28px] h-[28px] rounded-full bg-gradient-to-tr from-[#00ffa3] to-[#00c3ff] flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(0,255,163,0.3)] group-hover:scale-105 transition-transform">
            <Sparkles className="w-full h-full text-[#050508] stroke-[2.5]" />
          </div>
          <span className="text-sm font-bold nav-logo ml-2 tracking-tight">
            Studio3D
          </span>
        </Link>
      </div>

      {/* Right Section: Neon accents + settings + avatar */}
      <div className="flex items-center gap-2.5">
        {/* Workspace button */}
        <WorkspaceMenu
          coins={coins}
          activeFeature={activeFeature}
          onSelectFeature={onSelectFeature}
          onUpgradeClick={onUpgradeClick}
        />

        {/* Coin display: Crisp glass pill */}
        <div className="flex items-center gap-1.5 bg-bg-surface-secondary border border-border-subtle rounded-full px-3 py-1">
          <span className="text-sm select-none" role="img" aria-label="coin">
            🪙
          </span>
          <span className="text-xs font-semibold text-text-primary tracking-wide">
            {coins}
          </span>
        </div>

        {/* Upgrade button: Primary Neon CTA */}
        <button
          onClick={onUpgradeClick}
          className="btn-primary text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,255,163,0.3)] active:scale-[0.98] cursor-pointer"
        >
          <Crown className="w-3.5 h-3.5 stroke-[2.5] text-[#050508]" />
          <span>Upgrade</span>
        </button>

        {/* Bell with status dot */}
        <button
          className="relative text-text-muted hover:text-text-primary transition-colors p-1"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="status-dot absolute top-1 right-1 ring-2 ring-bg-base" />
        </button>

        {/* Settings Button */}
        <button
          onClick={openSettings}
          className="text-text-muted hover:text-text-primary transition-colors p-1 rounded-lg hover:bg-bg-surface-hover cursor-pointer"
          title="Theme & Workspace Settings"
          aria-label="Open settings"
        >
          <SettingsIcon className="w-4 h-4" />
        </button>

        {/* Account menu */}
        <div className="w-[32px] h-[32px] flex items-center justify-center">
          <UserMenu afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}

