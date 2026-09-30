"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Box, Sparkles, Layers, Settings as SettingsIcon } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

interface SidebarProps {
  onCloseMobile?: () => void;
}

export function Sidebar({ onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();
  const { openSettings } = useTheme();

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
    <aside className="w-72 bg-sidebar-bg border-r border-border-subtle flex flex-col h-full select-none backdrop-blur-xl transition-colors">
      {/* Brand Header */}
      <div className="p-6 border-b border-border-subtle">
        <Link
          href="/workspace"
          onClick={onCloseMobile}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00ffa3] to-[#00c3ff] flex items-center justify-center shadow-md group-hover:scale-105 transition-all">
            <Box className="w-5 h-5 text-[#050508]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-text-primary">
                Studio3D
              </span>
              <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-bg-surface-secondary text-text-secondary border border-border-subtle">
                PRO
              </span>
            </div>
            <p className="text-xs text-text-muted">Powered by Meshy AI</p>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
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
                  ? "bg-bg-surface text-text-primary font-semibold shadow-sm border border-border-subtle"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover border border-transparent"
              }`}
            >
              <div
                className={`p-2 rounded-lg transition-colors mt-0.5 ${
                  isActive
                    ? "bg-neon-green/10 text-neon-green"
                    : "bg-bg-surface-secondary text-text-muted group-hover:text-text-primary group-hover:bg-bg-surface-hover"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{item.label}</p>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                  )}
                </div>
                <p className={`text-xs mt-1 truncate ${isActive ? "text-text-secondary" : "text-text-muted"}`}>
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}

        {/* Workflow Guide Card */}
        <div className="pt-6 px-1">
          <div className="p-4 rounded-xl bg-bg-surface border border-border-subtle shadow-sm">
            <div className="flex items-center gap-2 text-text-primary text-xs font-semibold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5 text-neon-green" />
              Workflow Pipeline
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
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
      <div className="p-4 border-t border-border-subtle bg-bg-surface-secondary/40 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3 p-2 rounded-xl bg-bg-surface border border-border-subtle shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <UserButton
              afterSignOutUrl="/sign-in"
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 ring-1 ring-border-subtle",
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
            {isLoaded && user && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-text-primary truncate">
                  {user.fullName || user.username || "Creator"}
                </p>
                <p className="text-[11px] text-text-muted truncate">
                  {user.primaryEmailAddress?.emailAddress || "Active"}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={openSettings}
            title="Settings"
            aria-label="Settings"
            className="p-1.5 text-text-muted hover:text-text-primary hover:bg-bg-surface-hover rounded-lg transition-colors cursor-pointer"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
export default Sidebar;
