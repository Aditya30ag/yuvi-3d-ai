"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Check,
  Crown,
  LayoutGrid,
  Image as ImageIcon,
  Box,
  Settings as SettingsIcon,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useTheme } from "@/components/theme/ThemeProvider";
import { FeatureType } from "@/hooks/useWorkspace";

interface WorkspaceMenuProps {
  coins: number;
  activeFeature?: FeatureType;
  onSelectFeature?: (feature: FeatureType) => void;
  onUpgradeClick?: () => void;
}

const SHORTCUTS: { feature: FeatureType; label: string; icon: React.ElementType }[] = [
  { feature: "assets", label: "Assets", icon: LayoutGrid },
  { feature: "image", label: "Image to 3D", icon: ImageIcon },
  { feature: "model", label: "Model", icon: Box },
];

/** Top-bar workspace switcher: account summary, tool shortcuts and account actions. */
export function WorkspaceMenu({
  coins,
  activeFeature,
  onSelectFeature,
  onUpgradeClick,
}: WorkspaceMenuProps) {
  const { email, signOut } = useAuth();
  const { openSettings } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const run = (action?: () => void) => () => {
    setOpen(false);
    action?.();
  };

  const initial = (email?.[0] || "U").toUpperCase();

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="bg-bg-surface-secondary hover:bg-bg-surface-hover border border-border-subtle text-text-primary text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
      >
        <span>Workspace</span>
        <ChevronDown
          className={`w-3.5 h-3.5 stroke-[2.5] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-64 bg-bg-surface border border-border-subtle rounded-xl shadow-2xl py-1 z-[60] text-xs backdrop-blur-2xl"
        >
          {/* Current workspace */}
          <div className="px-3 py-2.5 border-b border-border-subtle">
            <p className="text-[10px] uppercase tracking-wide text-text-muted mb-1.5">Workspace</p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00ffa3] to-[#00c3ff] text-[#050508] font-bold flex items-center justify-center shrink-0">
                {initial}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-text-primary font-semibold">Personal</p>
                <p className="text-text-muted truncate">{email}</p>
              </div>
              <Check className="w-3.5 h-3.5 text-neon-green stroke-[3] shrink-0" />
            </div>
          </div>

          {/* Plan + coins */}
          <div className="px-3 py-2.5 border-b border-border-subtle flex items-center justify-between">
            <div>
              <p className="text-text-primary font-medium">Free plan</p>
              <p className="text-text-muted">
                <span role="img" aria-label="coin">🪙</span> {coins} coins left
              </p>
            </div>
            <button
              onClick={run(onUpgradeClick)}
              className="btn-primary text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 cursor-pointer"
            >
              <Crown className="w-3 h-3 stroke-[2.5] text-[#050508]" />
              Upgrade
            </button>
          </div>

          {/* Tool shortcuts */}
          {onSelectFeature && (
            <div className="py-1 border-b border-border-subtle">
              {SHORTCUTS.map(({ feature, label, icon: Icon }) => (
                <button
                  key={feature}
                  role="menuitem"
                  onClick={run(() => onSelectFeature(feature))}
                  className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-bg-surface-hover cursor-pointer ${
                    activeFeature === feature
                      ? "text-text-primary font-semibold"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                  {activeFeature === feature && (
                    <Check className="w-3.5 h-3.5 ml-auto text-neon-green stroke-[3]" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Account actions */}
          <button
            role="menuitem"
            onClick={run(openSettings)}
            className="w-full flex items-center gap-2 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover cursor-pointer"
          >
            <SettingsIcon className="w-3.5 h-3.5" />
            Theme & Settings
          </button>
          <button
            role="menuitem"
            onClick={run(() => signOut("/"))}
            className="w-full flex items-center gap-2 px-3 py-2 text-text-secondary hover:text-red-500 hover:bg-bg-surface-hover cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
