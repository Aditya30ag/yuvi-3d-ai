"use client";

import { UserButton } from "@clerk/nextjs";
import { Sparkles, Sun, Moon, Circle, Compass, Sparkle, Orbit, Aperture, Disc } from "lucide-react";
import { useState } from "react";

interface TopNavbarProps {
  onBgColorChange?: (color: string) => void;
}

export function TopNavbar({ onBgColorChange }: TopNavbarProps) {
  const [activeModeTab, setActiveModeTab] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const modeIcons = [
    { id: 0, icon: Circle, label: "Default View" },
    { id: 1, icon: Disc, label: "Wireframe / Shaded" },
    { id: 2, icon: Orbit, label: "Orbit Mode" },
    { id: 3, icon: Sparkle, label: "Effects" },
    { id: 4, icon: Aperture, label: "Studio Lighting" },
    { id: 5, icon: Compass, label: "Ortho / Perspective" },
  ];

  return (
    <header className="h-[40px] w-full bg-[#000000] border-b border-white/10 flex items-center justify-between px-3 z-30 select-none flex-shrink-0">
      {/* Left: app logo + "Studio3D" text-sm font-semibold text-white */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-white flex items-center justify-center shadow-sm">
          <Sparkles className="w-3 h-3 text-black stroke-[2.5]" />
        </div>
        <span className="text-sm font-semibold text-white tracking-tight">Studio3D</span>
      </div>

      {/* Center: mode toggle tabs: 6 small circular icon buttons */}
      <div className="hidden sm:flex items-center gap-1 bg-[#111111] px-1.5 py-0.5 rounded-full border border-[#1f1f1f]">
        {modeIcons.map((item) => {
          const Icon = item.icon;
          const isActive = activeModeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveModeTab(item.id)}
              title={item.label}
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                isActive ? "text-white bg-[#222222]" : "text-[#555555] hover:text-[#888888]"
              }`}
            >
              <Icon className="w-3 h-3" />
            </button>
          );
        })}
      </div>

      {/* Right: Color swatches, sun/moon, Clerk UserButton */}
      <div className="flex items-center gap-2.5">
        {/* Color swatches */}
        <div className="flex items-center gap-1 bg-[#141414] p-0.5 rounded border border-[#1f1f1f]">
          <button
            onClick={() => onBgColorChange?.("#ffffff")}
            title="White background"
            className="w-3.5 h-3.5 rounded-[2px] bg-white border border-neutral-400 hover:scale-110 transition-transform"
          />
          <button
            onClick={() => onBgColorChange?.("#0d0d0d")}
            title="Dark background"
            className="w-3.5 h-3.5 rounded-[2px] bg-[#0d0d0d] border border-[#2a2a2a] hover:scale-110 transition-transform"
          />
          <button
            onClick={() => onBgColorChange?.("#1e293b")}
            title="Blue studio background"
            className="w-3.5 h-3.5 rounded-[2px] bg-[#1e293b] border border-[#334155] hover:scale-110 transition-transform"
          />
        </div>

        {/* Sun / Moon toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          title={isDarkMode ? "Light theme" : "Dark theme"}
          className="text-[#555555] hover:text-[#888888] transition-colors p-1"
        >
          {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>

        {/* Clerk UserButton */}
        <div className="flex items-center">
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox: "w-6 h-6 border border-[#2a2a2a]",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
