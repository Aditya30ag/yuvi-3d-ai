"use client";

import React, { useEffect } from "react";
import { X, Settings as SettingsIcon } from "lucide-react";
import { useTheme, ThemeMode, SidebarBackground } from "@/components/theme/ThemeProvider";
import { SettingsRow } from "./SettingsRow";

export function SettingsModal() {
  const {
    isSettingsOpen,
    closeSettings,
    theme,
    setTheme,
    sidebarBackground,
    setSidebarBackground,
  } = useTheme();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSettingsOpen) {
        closeSettings();
      }
    };

    if (isSettingsOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isSettingsOpen, closeSettings]);

  if (!isSettingsOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeSettings();
        }
      }}
    >
      <div className="w-full max-w-lg bg-bg-surface border border-border-subtle rounded-2xl shadow-2xl overflow-hidden transition-all duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-bg-surface-secondary/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center text-neon-green">
              <SettingsIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 id="settings-modal-title" className="text-base font-bold text-text-primary">
                Settings
              </h2>
              <p className="text-xs text-text-muted">
                Customize your workspace appearance and preferences
              </p>
            </div>
          </div>

          <button
            onClick={closeSettings}
            aria-label="Close settings"
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-surface-hover transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content with Settings Rows */}
        <div className="px-6 py-3 divide-y divide-border-subtle">
          {/* Setting 1: Sidebar background */}
          <SettingsRow
            label="Sidebar background"
            description="Choose the translucent shell look or a solid sidebar surface."
            value={sidebarBackground}
            options={[
              { label: "Solid", value: "solid" },
              { label: "Translucent", value: "translucent" },
            ]}
            onChange={(val) => setSidebarBackground(val as SidebarBackground)}
          />

          {/* Setting 2: UI color theme */}
          <SettingsRow
            label="UI color theme"
            description="Choose the app-wide color theme."
            value={theme}
            options={[
              { label: "Light", value: "light" },
              { label: "Dark", value: "dark" },
              { label: "System", value: "system" },
            ]}
            onChange={(val) => setTheme(val as ThemeMode)}
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-border-subtle bg-bg-surface-secondary/30 flex items-center justify-between text-xs text-text-muted">
          <span>Preferences are automatically saved.</span>
          <button
            onClick={closeSettings}
            className="px-4 py-1.5 rounded-lg bg-bg-surface-secondary hover:bg-bg-surface-hover border border-border-subtle text-text-primary font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
