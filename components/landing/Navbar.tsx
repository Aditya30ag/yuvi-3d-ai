"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ChevronDown, Menu, X, ArrowRight } from "lucide-react";

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
        className={`sticky top-0 z-50 w-full border-b border-[#1a1a1a] bg-black/85 backdrop-blur-md transition-all duration-300 ${
          scrolled ? "h-12 py-1.5" : "h-[60px] py-3"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          {/* Left: Brand */}
          <Link
            href="/features/image-to-3d"
            className="flex items-center gap-2 transition-transform hover:scale-105"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm">
              <Sparkles className="h-4 w-4 text-black stroke-[2.5]" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-white">
              Studio3D
            </span>
          </Link>

          {/* Center: Desktop Nav */}
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.label;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setActiveSection(link.label)}
                  className={`group inline-flex items-center gap-1 text-sm font-medium transition-colors ${
                    isActive ? "text-white" : "text-[#888888] hover:text-white"
                  }`}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown className="h-3 w-3 text-[#555555] transition-transform duration-200 group-hover:text-white group-hover:rotate-180" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/workspace"
              className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-1.5 text-sm font-medium text-black transition-colors hover:bg-gray-100"
            >
              Sign Up Free
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#222222] bg-[#0d0d0d] text-zinc-300 transition-colors hover:text-white lg:hidden"
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
      <div className="border-b border-[#141414] bg-[#050505]/70 py-1.5 px-6 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-xs text-[#555555]">
          <Link href="/" className="hover:text-[#888888] transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-[#666666]">Features</span>
          <span>&gt;</span>
          <span className="text-white font-medium">Image to 3D</span>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[88px] z-40 border-b border-[#1f1f1f] bg-[#0d0d0d]/95 p-6 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-medium text-[#888888] hover:text-white"
              >
                <span>{link.label}</span>
                <ArrowRight className="h-4 w-4 text-[#555555]" />
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-[#1f1f1f]">
              <Link
                href="/workspace"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
              >
                Convert to 3D Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
