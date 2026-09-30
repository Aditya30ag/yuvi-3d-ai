"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/nextjs";

export type ThemeMode = "light" | "dark" | "system";
export type SidebarBackground = "solid" | "translucent";

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: ThemeMode) => void;
  sidebarBackground: SidebarBackground;
  setSidebarBackground: (bg: SidebarBackground) => void;
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "studio3d_theme";
const SIDEBAR_STORAGE_KEY = "studio3d_sidebar";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();

  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [sidebarBackground, setSidebarBackgroundState] = useState<SidebarBackground>("solid");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Helper to determine system preference
  const getSystemTheme = useCallback((): "light" | "dark" => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }, []);

  // Apply theme to DOM
  const applyTheme = useCallback(
    (currentTheme: ThemeMode) => {
      if (typeof document === "undefined") return;
      const root = document.documentElement;
      const active = currentTheme === "system" ? getSystemTheme() : currentTheme;

      setResolvedTheme(active);

      if (active === "dark") {
        root.classList.add("dark");
        root.setAttribute("data-theme", "dark");
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        root.setAttribute("data-theme", "light");
        root.style.colorScheme = "light";
      }
    },
    [getSystemTheme]
  );

  // Apply sidebar background to DOM
  const applySidebarBackground = useCallback((bg: SidebarBackground) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.setAttribute("data-sidebar", bg);
  }, []);

  // Initial read on mount
  useEffect(() => {
    setMounted(true);
    let initialTheme: ThemeMode = "light";
    let initialSidebar: SidebarBackground = "solid";

    try {
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
      if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system") {
        initialTheme = storedTheme;
      }

      const storedSidebar = localStorage.getItem(SIDEBAR_STORAGE_KEY) as SidebarBackground | null;
      if (storedSidebar === "solid" || storedSidebar === "translucent") {
        initialSidebar = storedSidebar;
      }
    } catch {
      // LocalStorage access might fail in restricted iframe environments
    }

    setThemeState(initialTheme);
    setSidebarBackgroundState(initialSidebar);
    applyTheme(initialTheme);
    applySidebarBackground(initialSidebar);

    // Watch for system preference changes if in "system" mode
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      const currentStored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
      if (currentStored === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [applyTheme, applySidebarBackground]);

  // Sync from Clerk metadata once user is loaded if present
  useEffect(() => {
    if (isLoaded && user) {
      const metadata = user.unsafeMetadata as { theme?: ThemeMode; sidebarBackground?: SidebarBackground } | undefined;
      if (metadata?.theme && (metadata.theme === "light" || metadata.theme === "dark" || metadata.theme === "system")) {
        setThemeState(metadata.theme);
        applyTheme(metadata.theme);
        try {
          localStorage.setItem(THEME_STORAGE_KEY, metadata.theme);
        } catch {}
      }
      if (metadata?.sidebarBackground && (metadata.sidebarBackground === "solid" || metadata.sidebarBackground === "translucent")) {
        setSidebarBackgroundState(metadata.sidebarBackground);
        applySidebarBackground(metadata.sidebarBackground);
        try {
          localStorage.setItem(SIDEBAR_STORAGE_KEY, metadata.sidebarBackground);
        } catch {}
      }
    }
  }, [isLoaded, user, applyTheme, applySidebarBackground]);

  // Update theme
  const setTheme = useCallback(
    (newTheme: ThemeMode) => {
      setThemeState(newTheme);
      applyTheme(newTheme);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      } catch {}

      if (user) {
        user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            theme: newTheme,
          },
        }).catch((err) => console.warn("Failed to sync theme preference to Clerk user metadata:", err));
      }
    },
    [applyTheme, user]
  );

  // Update sidebar background
  const setSidebarBackground = useCallback(
    (newBg: SidebarBackground) => {
      setSidebarBackgroundState(newBg);
      applySidebarBackground(newBg);
      try {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, newBg);
      } catch {}

      if (user) {
        user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            sidebarBackground: newBg,
          },
        }).catch((err) => console.warn("Failed to sync sidebar preference to Clerk user metadata:", err));
      }
    },
    [applySidebarBackground, user]
  );

  const toggleTheme = useCallback(() => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
  }, [resolvedTheme, setTheme]);

  const openSettings = useCallback(() => setIsSettingsOpen(true), []);
  const closeSettings = useCallback(() => setIsSettingsOpen(false), []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        sidebarBackground,
        setSidebarBackground,
        isSettingsOpen,
        openSettings,
        closeSettings,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
