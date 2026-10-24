"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { UserMenu } from "@/components/auth/UserMenu";
import { useAuth } from "@/components/auth/AuthProvider";
import { useTheme } from "@/components/theme/ThemeProvider";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Engines", href: "#engines" },
  { label: "Use cases", href: "#use-cases" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen ? "glass-nav border-b border-border-subtle" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#00ffa3] to-[#00c3ff] shadow-md shadow-[#00ffa3]/25">
            <Sparkles className="h-4 w-4 stroke-[2.5] text-[#050508]" />
          </div>
          <span className="nav-logo text-base font-bold tracking-tight">Studio3D</span>
        </Link>

        <nav className="hidden items-center gap-8 border-0 bg-transparent backdrop-blur-none md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            title="Toggle color theme"
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-bg-surface-hover hover:text-text-primary"
          >
            {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Avoid flashing signed-out buttons before the session is read */}
          {isLoaded && (
            <div className="hidden items-center gap-2 sm:flex">
              {isSignedIn ? (
                <>
                  <Link
                    href="/workspace"
                    className="btn-primary inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold"
                  >
                    Open workspace
                    <ArrowRight className="h-3.5 w-3.5 text-[#050508]" />
                  </Link>
                  <UserMenu afterSignOutUrl="/" />
                </>
              ) : (
                <>
                  <Link href="/sign-in" className="px-3 py-2 text-sm font-semibold text-text-secondary hover:text-text-primary">
                    Sign in
                  </Link>
                  <Link href="/sign-up" className="btn-primary inline-flex items-center px-4 py-2 text-sm font-bold">
                    Get started
                  </Link>
                </>
              )}
            </div>
          )}

          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle bg-bg-surface-secondary text-text-primary md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border-subtle px-6 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col border-0 bg-transparent backdrop-blur-none">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-border-subtle py-3 text-sm font-medium text-text-secondary hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-2.5">
            {isSignedIn ? (
              <Link href="/workspace" className="btn-primary flex justify-center px-4 py-2.5 text-sm font-bold">
                Open workspace
              </Link>
            ) : (
              <>
                <Link href="/sign-up" className="btn-primary flex justify-center px-4 py-2.5 text-sm font-bold">
                  Get started
                </Link>
                <Link href="/sign-in" className="btn-secondary flex justify-center px-4 py-2.5 text-sm font-semibold">
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
