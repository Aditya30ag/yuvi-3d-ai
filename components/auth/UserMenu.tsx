"use client";

import React, { useEffect, useRef, useState } from "react";
import { LogOut, Settings as SettingsIcon } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useTheme } from "@/components/theme/ThemeProvider";

interface UserMenuProps {
  afterSignOutUrl?: string;
  avatarClassName?: string;
  align?: "left" | "right";
  direction?: "down" | "up";
}

/** Avatar + dropdown replacing Clerk's <UserButton>. */
export function UserMenu({
  afterSignOutUrl = "/",
  avatarClassName = "w-7 h-7",
  align = "right",
  direction = "down",
}: UserMenuProps) {
  const { email, isSignedIn, signOut } = useAuth();
  const { openSettings } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  if (!isSignedIn) return null;

  const initial = (email?.[0] || "U").toUpperCase();
  const positionClass = `${align === "right" ? "right-0" : "left-0"} ${
    direction === "down" ? "top-full mt-2" : "bottom-full mb-2"
  }`;

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`${avatarClassName} rounded-full bg-gradient-to-tr from-[#00ffa3] to-[#00c3ff] text-[#050508] text-xs font-bold flex items-center justify-center ring-1 ring-border-subtle cursor-pointer`}
        title={email || "Account"}
        aria-label="Open account menu"
      >
        {initial}
      </button>

      {open && (
        <div
          className={`absolute ${positionClass} w-56 bg-bg-surface border border-border-subtle rounded-xl shadow-2xl py-1 z-[60] text-xs backdrop-blur-2xl`}
        >
          <div className="px-3 py-2 border-b border-border-subtle">
            <p className="text-[10px] uppercase tracking-wide text-text-muted">Signed in as</p>
            <p className="text-text-primary font-medium truncate">{email}</p>
          </div>
          <button
            onClick={() => {
              setOpen(false);
              openSettings();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover cursor-pointer"
          >
            <SettingsIcon className="w-3.5 h-3.5" />
            Theme & Settings
          </button>
          <button
            onClick={() => {
              setOpen(false);
              signOut(afterSignOutUrl);
            }}
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
