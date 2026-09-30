"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Settings as SettingsIcon } from "lucide-react";
import { useTheme, ThemeMode, SidebarBackground } from "@/components/theme/ThemeProvider";
import { SettingsRow } from "@/components/settings/SettingsRow";

export default function SettingsPage() {
  const {
    theme,
    setTheme,
    sidebarBackground,
    setSidebarBackground,
  } = useTheme();

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/workspace"
            className="inline-flex items-center gap-2 text-xs font-medium text-text-muted hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Workspace
          </Link>
        </div>

        <div className="bg-bg-surface border border-border-subtle rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-border-subtle bg-bg-surface-secondary/40 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center text-neon-green">
              <SettingsIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-text-primary">Settings</h1>
              <p className="text-xs text-text-muted">
                Manage your UI color theme and workspace presentation
              </p>
            </div>
          </div>

          <div className="px-6 py-4 divide-y divide-border-subtle">
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

          <div className="px-6 py-4 border-t border-border-subtle bg-bg-surface-secondary/20 text-xs text-text-muted">
            Preferences are saved automatically in your browser and user account.
          </div>
        </div>
      </div>
    </div>
  );
}
