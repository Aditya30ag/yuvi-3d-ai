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
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

interface TopNavProps {
  coins?: number;
  onUpgradeClick?: () => void;
}

export function TopNav({ coins = 100, onUpgradeClick }: TopNavProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-[48px] bg-[#050508]/85 border-b border-white/[0.08] z-50 flex items-center justify-between px-3.5 select-none backdrop-blur-2xl">
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
          className="flex items-center text-white/60 hover:text-white transition-colors py-1 font-medium text-xs tracking-wide"
        >
          <span className="status-dot mr-1.5 inline-block" />
          Community
        </Link>

        {/* API dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("api")}
            className="flex items-center gap-1 text-white/60 hover:text-white transition-colors py-1 font-medium text-xs tracking-wide"
          >
            API
            <ChevronDown className="w-3.5 h-3.5 text-white/40" />
          </button>
          {activeDropdown === "api" && (
            <div className="absolute top-full left-0 mt-2 w-44 bg-[#050508]/95 border border-white/[0.08] rounded-xl shadow-2xl py-1 z-50 text-xs backdrop-blur-2xl">
              <Link
                href="#api-docs"
                className="block px-3 py-1.5 text-white/70 hover:text-[#00ffa3] hover:bg-white/[0.04]"
              >
                API Documentation
              </Link>
              <Link
                href="#api-keys"
                className="block px-3 py-1.5 text-white/70 hover:text-[#00ffa3] hover:bg-white/[0.04]"
              >
                API Keys
              </Link>
              <Link
                href="#webhooks"
                className="block px-3 py-1.5 text-white/70 hover:text-[#00ffa3] hover:bg-white/[0.04]"
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
            className="flex items-center gap-1 text-white/60 hover:text-white transition-colors py-1 font-medium text-xs tracking-wide"
          >
            Resources
            <ChevronDown className="w-3.5 h-3.5 text-white/40" />
          </button>
          {activeDropdown === "resources" && (
            <div className="absolute top-full left-0 mt-2 w-44 bg-[#050508]/95 border border-white/[0.08] rounded-xl shadow-2xl py-1 z-50 text-xs backdrop-blur-2xl">
              <Link
                href="#tutorials"
                className="block px-3 py-1.5 text-white/70 hover:text-[#00ffa3] hover:bg-white/[0.04]"
              >
                Tutorials & Guides
              </Link>
              <Link
                href="#showcase"
                className="block px-3 py-1.5 text-white/70 hover:text-[#00ffa3] hover:bg-white/[0.04]"
              >
                Community Showcase
              </Link>
              <Link
                href="#blender"
                className="block px-3 py-1.5 text-white/70 hover:text-[#00ffa3] hover:bg-white/[0.04]"
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
            className="flex items-center gap-1 text-white/60 hover:text-white transition-colors py-1 font-medium text-xs tracking-wide"
          >
            Creative Lab
            <ChevronDown className="w-3.5 h-3.5 text-white/40" />
          </button>
          {activeDropdown === "lab" && (
            <div className="absolute top-full left-0 mt-2 w-44 bg-[#050508]/95 border border-white/[0.08] rounded-xl shadow-2xl py-1 z-50 text-xs backdrop-blur-2xl">
              <Link
                href="#experimental"
                className="block px-3 py-1.5 text-white/70 hover:text-[#00ffa3] hover:bg-white/[0.04]"
              >
                Experimental AI
              </Link>
              <Link
                href="#rigging"
                className="block px-3 py-1.5 text-white/70 hover:text-[#00ffa3] hover:bg-white/[0.04]"
              >
                Auto-Rigging Lab
              </Link>
            </div>
          )}
        </div>

        {/* Shop with Cyan Badge */}
        <Link
          href="#shop"
          className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors py-1 font-medium text-xs tracking-wide"
        >
          Shop
          <span className="badge-cyan text-[9px] py-0 px-1.5 leading-tight">
            NEW
          </span>
        </Link>
      </nav>

      {/* Right Section: Neon accents */}
      <div className="flex items-center gap-2.5">
        {/* Agent button */}
        <button className="flex items-center gap-1.5 text-xs text-white/80 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] px-2.5 py-1 rounded-lg transition-colors">
          <div className="w-[18px] h-[18px] rounded-full bg-[rgba(0,195,255,0.15)] border border-[rgba(0,195,255,0.3)] flex items-center justify-center">
            <Bot className="w-3 h-3 text-[#00c3ff]" />
          </div>
          <span className="font-medium">Agent</span>
        </button>

        {/* Workspace button: Subtle glass secondary */}
        <button className="bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-all shadow-sm active:scale-[0.98]">
          <span>Workspace</span>
          <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>

        {/* Coin display: Crisp glass pill */}
        <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] rounded-full px-3 py-1">
          <span className="text-sm select-none" role="img" aria-label="coin">
            🪙
          </span>
          <span className="text-xs font-semibold text-white tracking-wide">
            {coins}
          </span>
        </div>

        {/* Upgrade button: Primary Neon CTA */}
        <button
          onClick={onUpgradeClick}
          className="btn-primary text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,255,163,0.3)] active:scale-[0.98]"
        >
          <Crown className="w-3.5 h-3.5 stroke-[2.5] text-[#050508]" />
          <span>Upgrade</span>
        </button>

        {/* Action icons */}
        <button
          className="text-white/40 hover:text-white transition-colors p-1"
          title="Rewards & Gifts"
        >
          <Gift className="w-4 h-4" />
        </button>

        <button
          className="text-white/40 hover:text-white transition-colors p-1"
          title="Help & Support"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Bell with neon green dot */}
        <button
          className="relative text-white/40 hover:text-white transition-colors p-1"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="status-dot absolute top-1 right-1 ring-2 ring-[#050508]" />
        </button>

        {/* Clerk UserButton */}
        <div className="w-[32px] h-[32px] flex items-center justify-center">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "w-7 h-7 ring-1 ring-white/20",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
