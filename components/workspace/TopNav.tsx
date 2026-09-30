"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ChevronDown,
  Gift,
  HelpCircle,
  Bell,
  Crown,
  Bot,
  Settings as SettingsIcon,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "@/components/theme/ThemeProvider";

interface TopNavProps {
  coins?: number;
  onUpgradeClick?: () => void;
}

export function TopNav({ coins = 100, onUpgradeClick }: TopNavProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { openSettings } = useTheme();

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

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

      {/* Center Nav Links */}
      <nav className="hidden md:flex items-center gap-6 text-sm">
        {/* Community with neon status dot */}
        <Link
          href="#community"
          className="flex items-center text-text-secondary hover:text-text-primary transition-colors py-1 font-medium text-xs tracking-wide"
        >
          <span className="status-dot mr-1.5 inline-block" />
          Community
        </Link>

        {/* API dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("api")}
            className="flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors py-1 font-medium text-xs tracking-wide cursor-pointer"
          >
            API
            <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
          </button>
          {activeDropdown === "api" && (
            <div className="absolute top-full left-0 mt-2 w-44 bg-bg-surface border border-border-subtle rounded-xl shadow-2xl py-1 z-50 text-xs backdrop-blur-2xl">
              <Link
                href="#api-docs"
                className="block px-3 py-1.5 text-text-secondary hover:text-neon-green hover:bg-bg-surface-hover"
              >
                API Documentation
              </Link>
              <Link
                href="#api-keys"
                className="block px-3 py-1.5 text-text-secondary hover:text-neon-green hover:bg-bg-surface-hover"
              >
                API Keys
              </Link>
              <Link
                href="#webhooks"
                className="block px-3 py-1.5 text-text-secondary hover:text-neon-green hover:bg-bg-surface-hover"
              >
                Webhooks
              </Link>
            </div>
          )}
        </div>

        {/* Resources dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("resources")}
            className="flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors py-1 font-medium text-xs tracking-wide cursor-pointer"
          >
            Resources
            <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
          </button>
          {activeDropdown === "resources" && (
            <div className="absolute top-full left-0 mt-2 w-44 bg-bg-surface border border-border-subtle rounded-xl shadow-2xl py-1 z-50 text-xs backdrop-blur-2xl">
              <Link
                href="#tutorials"
                className="block px-3 py-1.5 text-text-secondary hover:text-neon-green hover:bg-bg-surface-hover"
              >
                Tutorials & Guides
              </Link>
              <Link
                href="#showcase"
                className="block px-3 py-1.5 text-text-secondary hover:text-neon-green hover:bg-bg-surface-hover"
              >
                Community Showcase
              </Link>
              <Link
                href="#blender"
                className="block px-3 py-1.5 text-text-secondary hover:text-neon-green hover:bg-bg-surface-hover"
              >
                Blender Add-on
              </Link>
            </div>
          )}
        </div>

        {/* Creative Lab dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("lab")}
            className="flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors py-1 font-medium text-xs tracking-wide cursor-pointer"
          >
            Creative Lab
            <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
          </button>
          {activeDropdown === "lab" && (
            <div className="absolute top-full left-0 mt-2 w-44 bg-bg-surface border border-border-subtle rounded-xl shadow-2xl py-1 z-50 text-xs backdrop-blur-2xl">
              <Link
                href="#experimental"
                className="block px-3 py-1.5 text-text-secondary hover:text-neon-green hover:bg-bg-surface-hover"
              >
                Experimental AI
              </Link>
              <Link
                href="#rigging"
                className="block px-3 py-1.5 text-text-secondary hover:text-neon-green hover:bg-bg-surface-hover"
              >
                Auto-Rigging Lab
              </Link>
            </div>
          )}
        </div>

        {/* Shop with Cyan Badge */}
        <Link
          href="#shop"
          className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors py-1 font-medium text-xs tracking-wide"
        >
          Shop
          <span className="badge-cyan text-[9px] py-0 px-1.5 leading-tight">
            NEW
          </span>
        </Link>
      </nav>

      {/* Right Section: Neon accents + settings + avatar */}
      <div className="flex items-center gap-2.5">
        {/* Agent button */}
        <button className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary bg-bg-surface-secondary hover:bg-bg-surface-hover border border-border-subtle px-2.5 py-1 rounded-lg transition-colors cursor-pointer">
          <div className="w-[18px] h-[18px] rounded-full bg-[rgba(2,132,199,0.12)] border border-[rgba(2,132,199,0.25)] flex items-center justify-center">
            <Bot className="w-3 h-3 text-[#0284c7] dark:text-[#00c3ff]" />
          </div>
          <span className="font-medium">Agent</span>
        </button>

        {/* Workspace button */}
        <button className="bg-bg-surface-secondary hover:bg-bg-surface-hover border border-border-subtle text-text-primary text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-all shadow-sm active:scale-[0.98] cursor-pointer">
          <span>Workspace</span>
          <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>

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

        {/* Action icons */}
        <button
          className="text-text-muted hover:text-text-primary transition-colors p-1"
          title="Rewards & Gifts"
        >
          <Gift className="w-4 h-4" />
        </button>

        <button
          className="text-text-muted hover:text-text-primary transition-colors p-1"
          title="Help & Support"
        >
          <HelpCircle className="w-4 h-4" />
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

        {/* Clerk UserButton with Settings Menu Item */}
        <div className="w-[32px] h-[32px] flex items-center justify-center">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "w-7 h-7 ring-1 ring-border-subtle",
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Action
                label="Theme & Settings"
                labelIcon={<SettingsIcon className="w-4 h-4" />}
                onClick={openSettings}
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
  );
}
