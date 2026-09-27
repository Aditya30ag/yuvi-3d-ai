"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Box, Sparkles, Layers } from "lucide-react";

interface SidebarProps {
  onCloseMobile?: () => void;
}

export function Sidebar({ onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();

  const navItems = [
    {
      label: "AI Image Generator",
      href: "/workspace",
      icon: Sparkles,
      description: "Concept art & 2D textures",
    },
    {
      label: "Image to 3D",
      href: "/image-to-3d",
      icon: Box,
      description: "Meshes, GLB & PBR materials",
    },
  ];

  return (
    <aside className="w-72 bg-[#111111] border-r border-[#26262b] flex flex-col h-full select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#26262b]">
        <Link
          href="/workspace"
          onClick={onCloseMobile}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-white/10 group-hover:scale-105 transition-all">
            <Box className="w-5 h-5 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">
                Studio3D
              </span>
              <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-white/10 text-white border border-white/20">
                PRO
              </span>
            </div>
            <p className="text-xs text-zinc-400">Powered by Meshy AI</p>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          Workspaces
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-start gap-3.5 px-3.5 py-3 rounded-xl transition-all group relative ${
                isActive
                  ? "bg-white text-black font-semibold shadow-md shadow-white/10 border border-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/40 border border-transparent"
              }`}
            >
              <div
                className={`p-2 rounded-lg transition-colors mt-0.5 ${
                  isActive
                    ? "bg-black text-white"
                    : "bg-zinc-800/80 text-zinc-400 group-hover:text-zinc-200 group-hover:bg-zinc-800"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{item.label}</p>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                  )}
                </div>
                <p className={`text-xs mt-1 truncate ${isActive ? "text-zinc-700" : "text-zinc-400"}`}>
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}

        {/* Workflow Guide Card */}
        <div className="pt-6 px-1">
          <div className="p-4 rounded-xl bg-gradient-to-b from-zinc-900/90 to-black border border-white/10">
            <div className="flex items-center gap-2 text-white text-xs font-semibold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5" />
              Workflow Pipeline
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              1. Generate high-detail concept art
              <br />
              2. Transfer to 3D converter
              <br />
              3. Download GLB with PBR materials
            </p>
          </div>
        </div>
      </div>

      {/* User Section at bottom */}
      <div className="p-4 border-t border-[#26262b] bg-[#0f0f11]/80 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3 p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
          <div className="flex items-center gap-3 min-w-0">
            <UserButton
              afterSignOutUrl="/sign-in"
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 ring-2 ring-violet-500/30",
                },
              }}
            />
            {isLoaded && user && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-zinc-200 truncate">
                  {user.fullName || user.username || "Creator"}
                </p>
                <p className="text-[11px] text-zinc-400 truncate">
                  {user.primaryEmailAddress?.emailAddress || "Active"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
export default Sidebar;
