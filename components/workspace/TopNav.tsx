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
    <header className="fixed top-0 left-0 right-0 h-[48px] bg-[#050505] border-b border-white/10 z-50 flex items-center justify-between px-3.5 select-none backdrop-blur-md">
      {/* Left Section: Minimalist White Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center group">
          <div className="w-[28px] h-[28px] rounded-full bg-white flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-full h-full text-black stroke-[2.5]" />
          </div>
          <span className="text-sm font-bold text-white ml-2 tracking-tight">
            Studio3D
          </span>
        </Link>
      </div>

      {/* Center Nav Links */}
      <nav className="hidden md:flex items-center gap-6 text-sm">
        {/* Community with clean white/emerald dot */}
        <Link
          href="#community"
          className="flex items-center text-zinc-400 hover:text-white transition-colors py-1 font-medium text-xs tracking-wide"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white inline-block mr-1.5 shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
          Community
        </Link>

        {/* API dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("api")}
            className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors py-1 font-medium text-xs tracking-wide"
          >
            API
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
          </button>
          {activeDropdown === "api" && (
            <div className="absolute top-full left-0 mt-2 w-44 bg-[#0d0d0d] border border-white/15 rounded-lg shadow-2xl py-1 z-50 text-xs backdrop-blur-xl">
              <Link
                href="#api-docs"
                className="block px-3 py-1.5 text-zinc-300 hover:text-white hover:bg-neutral-800"
              >
                API Documentation
              </Link>
              <Link
                href="#api-keys"
                className="block px-3 py-1.5 text-zinc-300 hover:text-white hover:bg-neutral-800"
              >
                API Keys
              </Link>
              <Link
                href="#webhooks"
                className="block px-3 py-1.5 text-zinc-300 hover:text-white hover:bg-neutral-800"
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
            className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors py-1 font-medium text-xs tracking-wide"
          >
            Resources
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
          </button>
          {activeDropdown === "resources" && (
            <div className="absolute top-full left-0 mt-2 w-44 bg-[#0d0d0d] border border-white/15 rounded-lg shadow-2xl py-1 z-50 text-xs backdrop-blur-xl">
              <Link
                href="#tutorials"
                className="block px-3 py-1.5 text-zinc-300 hover:text-white hover:bg-neutral-800"
              >
                Tutorials & Guides
              </Link>
              <Link
                href="#showcase"
                className="block px-3 py-1.5 text-zinc-300 hover:text-white hover:bg-neutral-800"
              >
                Community Showcase
              </Link>
              <Link
                href="#blender"
                className="block px-3 py-1.5 text-zinc-300 hover:text-white hover:bg-neutral-800"
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
            className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors py-1 font-medium text-xs tracking-wide"
          >
            Creative Lab
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
          </button>
          {activeDropdown === "lab" && (
            <div className="absolute top-full left-0 mt-2 w-44 bg-[#0d0d0d] border border-white/15 rounded-lg shadow-2xl py-1 z-50 text-xs backdrop-blur-xl">
              <Link
                href="#experimental"
                className="block px-3 py-1.5 text-zinc-300 hover:text-white hover:bg-neutral-800"
              >
                Experimental AI
              </Link>
              <Link
                href="#rigging"
                className="block px-3 py-1.5 text-zinc-300 hover:text-white hover:bg-neutral-800"
              >
                Auto-Rigging Lab
              </Link>
            </div>
          )}
        </div>

        {/* Shop with White pill */}
        <Link
          href="#shop"
          className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors py-1 font-medium text-xs tracking-wide"
        >
          Shop
          <span className="bg-white text-black text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-tight shadow-sm">
            NEW
          </span>
        </Link>
      </nav>

      {/* Right Section: White aesthetic actions */}
      <div className="flex items-center gap-2.5">
        {/* Agent button */}
        <button className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-white/10 px-2.5 py-1 rounded-lg transition-colors">
          <div className="w-[18px] h-[18px] rounded-full bg-white flex items-center justify-center">
            <Bot className="w-3 h-3 text-black" />
          </div>
          <span className="font-medium">Agent</span>
        </button>

        {/* Workspace button: Clean white theme button */}
        <button className="bg-white hover:bg-neutral-200 text-black text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-all shadow-sm active:scale-[0.98]">
          <span>Workspace</span>
          <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>

        {/* Coin display: Crisp monochrome border pill */}
        <div className="flex items-center gap-1.5 bg-neutral-900 border border-white/10 rounded-full px-3 py-1">
          <span className="text-sm select-none" role="img" aria-label="coin">
            🪙
          </span>
          <span className="text-xs font-semibold text-white tracking-wide">
            {coins}
          </span>
        </div>

        {/* Upgrade button: High-contrast white/slate */}
        <button
          onClick={onUpgradeClick}
          className="bg-zinc-800 hover:bg-zinc-700 text-white border border-white/15 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
        >
          <Crown className="w-3.5 h-3.5 stroke-[2] text-amber-400" />
          <span>Upgrade</span>
        </button>

        {/* Action icons */}
        <button
          className="text-zinc-500 hover:text-white transition-colors p-1"
          title="Rewards & Gifts"
        >
          <Gift className="w-4 h-4" />
        </button>

        <button
          className="text-zinc-500 hover:text-white transition-colors p-1"
          title="Help & Support"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Bell with clean dot */}
        <button
          className="relative text-zinc-500 hover:text-white transition-colors p-1"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full ring-2 ring-black" />
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
