"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

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
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [sidebarBackground, setSidebarBackgroundState] = useState<SidebarBackground>("solid");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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

  // Update theme
  const setTheme = useCallback(
    (newTheme: ThemeMode) => {
      setThemeState(newTheme);
      applyTheme(newTheme);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      } catch {}
    },
    [applyTheme]
  );

  // Update sidebar background
  const setSidebarBackground = useCallback(
    (newBg: SidebarBackground) => {
      setSidebarBackgroundState(newBg);
      applySidebarBackground(newBg);
      try {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, newBg);
      } catch {}
    },
    [applySidebarBackground]
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
