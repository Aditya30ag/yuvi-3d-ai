"use client";

import { UserButton } from "@clerk/nextjs";
import { Sparkles, Sun, Moon, Circle, Compass, Sparkle, Orbit, Aperture, Disc, Settings as SettingsIcon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";

interface TopNavbarProps {
  onBgColorChange?: (color: string) => void;
}

export function TopNavbar({ onBgColorChange }: TopNavbarProps) {
  const [activeModeTab, setActiveModeTab] = useState<number>(0);
  const { resolvedTheme, toggleTheme, openSettings } = useTheme();

  const modeIcons = [
    { id: 0, icon: Circle, label: "Default View" },
    { id: 1, icon: Disc, label: "Wireframe / Shaded" },
    { id: 2, icon: Orbit, label: "Orbit Mode" },
    { id: 3, icon: Sparkle, label: "Effects" },
    { id: 4, icon: Aperture, label: "Studio Lighting" },
    { id: 5, icon: Compass, label: "Ortho / Perspective" },
  ];

  return (
    <header className="h-[40px] w-full bg-sidebar-bg border-b border-border-subtle flex items-center justify-between px-3 z-30 select-none flex-shrink-0 backdrop-blur-2xl transition-colors">
      {/* Left: app logo + "Studio3D" */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#00ffa3] to-[#00c3ff] flex items-center justify-center shadow-[0_0_10px_rgba(0,255,163,0.3)]">
          <Sparkles className="w-3 h-3 text-[#050508] stroke-[2.5]" />
        </div>
        <span className="text-sm font-semibold nav-logo tracking-tight">Studio3D</span>
      </div>

      {/* Center: mode toggle tabs: 6 small circular icon buttons */}
      <div className="hidden sm:flex items-center gap-1 bg-bg-surface-secondary px-1.5 py-0.5 rounded-full border border-border-subtle">
        {modeIcons.map((item) => {
          const Icon = item.icon;
          const isActive = activeModeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveModeTab(item.id)}
              title={item.label}
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                isActive
                  ? "text-[#059669] dark:text-[#00ffa3] bg-[rgba(5,150,105,0.12)] dark:bg-[rgba(0,255,163,0.15)] shadow-sm"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              <Icon className="w-3 h-3" />
            </button>
          );
        })}
      </div>

      {/* Right: Color swatches, sun/moon, settings, Clerk UserButton */}
      <div className="flex items-center gap-2.5">
        {/* Color swatches */}
        <div className="flex items-center gap-1 bg-bg-surface-secondary p-0.5 rounded-md border border-border-subtle">
          <button
            onClick={() => onBgColorChange?.("#ffffff")}
            title="White background"
            className="w-3.5 h-3.5 rounded-[2px] bg-white border border-gray-300 hover:scale-110 transition-transform cursor-pointer"
          />
          <button
            onClick={() => onBgColorChange?.("#050508")}
            title="Dark background"
            className="w-3.5 h-3.5 rounded-[2px] bg-[#050508] border border-gray-600 hover:scale-110 transition-transform cursor-pointer"
          />
          <button
            onClick={() => onBgColorChange?.("#1e293b")}
            title="Blue studio background"
            className="w-3.5 h-3.5 rounded-[2px] bg-[#1e293b] border border-[#334155] hover:scale-110 transition-transform cursor-pointer"
          />
        </div>

        {/* Sun / Moon toggle connected to theme */}
        <button
          onClick={toggleTheme}
          title={resolvedTheme === "dark" ? "Switch to Light theme" : "Switch to Dark theme"}
          aria-label="Toggle theme"
          className="text-text-muted hover:text-text-primary transition-colors p-1 rounded-md hover:bg-bg-surface-hover cursor-pointer"
        >
          {resolvedTheme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>

        {/* Settings Button */}
        <button
          onClick={openSettings}
          title="Open Settings"
          aria-label="Open settings"
          className="text-text-muted hover:text-text-primary transition-colors p-1 rounded-md hover:bg-bg-surface-hover cursor-pointer"
        >
          <SettingsIcon className="w-3.5 h-3.5" />
        </button>

        {/* Clerk UserButton */}
        <div className="flex items-center">
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox: "w-6 h-6 border border-border-subtle",
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Action
                label="Theme & Settings"
                labelIcon={<SettingsIcon className="w-3.5 h-3.5" />}
                onClick={openSettings}
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
  );
}
