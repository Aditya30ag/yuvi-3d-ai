"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const NAV_LINKS = [
  { label: "Features", href: "#features", hasDropdown: true },
  { label: "Solutions", href: "#workflows", hasDropdown: true },
  { label: "Community", href: "#testimonials", hasDropdown: false },
  { label: "Resources", href: "#faq", hasDropdown: true },
  { label: "Creative Lab", href: "#sharp-edges", hasDropdown: false },
  { label: "Developers", href: "#explore-features", hasDropdown: true },
  { label: "Pricing", href: "#final-cta", hasDropdown: false },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Features");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full glass-nav transition-all duration-300 ${
          scrolled ? "h-12 py-1.5" : "h-[60px] py-3"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          {/* Left: Brand */}
          <Link
            href="/features/image-to-3d"
            className="flex items-center gap-2.5 transition-transform hover:scale-105"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-[#00ffa3] to-[#00c3ff] shadow-md shadow-[#00ffa3]/25">
              <Sparkles className="h-4 w-4 text-[#050508] stroke-[2.5]" />
            </div>
            <span className="text-sm font-bold tracking-tight nav-logo">
              Studio3D
            </span>
          </Link>

          {/* Center: Desktop Nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.label;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setActiveSection(link.label)}
                  className={`group inline-flex items-center gap-1 text-sm font-medium transition-colors ${
                    isActive ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && (
                    <ChevronDown className="h-3 w-3 text-white/50 transition-transform duration-200 group-hover:text-white group-hover:rotate-180" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <SignedOut>
              <Link
                href="/sign-in"
                className="btn-secondary hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold text-white/80 hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="btn-primary inline-flex items-center justify-center px-4 py-1.5 text-xs font-bold"
              >
                Sign Up Free
              </Link>
            </SignedOut>

            <SignedIn>
              <Link
                href="/workspace"
                className="btn-primary inline-flex items-center justify-center px-4 py-1.5 text-xs font-bold"
              >
                Go to Workspace
              </Link>
              <div className="w-[32px] h-[32px] flex items-center justify-center">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-7 h-7 ring-1 ring-white/20",
                    },
                  }}
                />
              </div>
            </SignedIn>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] backdrop-blur-md text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Breadcrumb line below navbar */}
      <div className="border-b border-white/[0.06] bg-[#050508]/70 py-1.5 px-6 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-xs text-white/50">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-white/60">Features</span>
          <span>&gt;</span>
          <span className="text-[#00ffa3] font-medium">Image to 3D</span>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[88px] z-40 border-b border-white/10 bg-[#050508]/95 p-6 backdrop-blur-2xl lg:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-medium text-white/70 hover:text-white"
              >
                <span>{link.label}</span>
                <ArrowRight className="h-4 w-4 text-white/40" />
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-white/10">
              <SignedOut>
                <div className="flex flex-col gap-2.5">
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-secondary flex w-full items-center justify-center px-4 py-2.5 text-sm font-semibold"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-primary flex w-full items-center justify-center px-4 py-2.5 text-sm font-bold"
                  >
                    Sign Up Free
                  </Link>
                </div>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center justify-between">
                  <Link
                    href="/workspace"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-primary flex-1 flex items-center justify-center px-4 py-2.5 text-sm font-bold mr-3"
                  >
                    Go to Workspace
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
