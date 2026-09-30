"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  const columnLinks = [
    {
      title: "Features",
      links: [
        { label: "Image Generation", href: "/workspace" },
        { label: "Image to 3D", href: "/features/image-to-3d" },
        { label: "AI Texturing", href: "/workspace" },
        { label: "Animation", href: "/workspace" },
        { label: "API", href: "/workspace" },
      ],
    },
    {
      title: "Tools",
      links: [
        { label: "3D File Converter", href: "/workspace" },
        { label: "Online 3D Viewer", href: "/workspace" },
        { label: "3D Text Generator", href: "/workspace" },
        { label: "File Compressor", href: "/workspace" },
      ],
    },
    {
      title: "Learn",
      links: [
        { label: "Blog", href: "#" },
        { label: "Tutorials", href: "#" },
        { label: "3D Glossary", href: "#" },
        { label: "Documentation", href: "#" },
        { label: "Help Center", href: "#" },
      ],
    },
    {
      title: "Programs",
      links: [
        { label: "Affiliate Program", href: "#" },
        { label: "Contributor Program", href: "#" },
        { label: "Fellowship", href: "#" },
        { label: "Education", href: "#" },
      ],
    },
    {
      title: "Use Cases",
      links: [
        { label: "Free 3D Models", href: "#" },
        { label: "3D Printing", href: "#workflows" },
        { label: "Game Development", href: "#workflows" },
        { label: "Product Design", href: "#workflows" },
        { label: "VR/AR", href: "#workflows" },
      ],
    },
  ];

  return (
    <footer className="relative bg-bg-base pt-16 pb-12 overflow-hidden border-t border-border-subtle">
      {/* Very subtle gradient top border line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ffa3]/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 border-b border-border-subtle">
          <div>
            <Link
              href="/features/image-to-3d"
              className="flex items-center gap-2.5 transition-transform hover:scale-105 inline-flex"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-[#00ffa3] to-[#00c3ff] shadow-md shadow-[#00ffa3]/25">
                <Sparkles className="h-4 w-4 text-[#050508]" />
              </div>
              <span className="text-base font-bold tracking-tight nav-logo">
                Studio3D
              </span>
            </Link>
            <p className="text-sm text-text-muted mt-2">
              AI-powered 3D creation platform
            </p>
          </div>

          {/* App store badges */}
          <div className="flex items-center gap-3">
            <button className="meta-pill text-text-secondary hover:text-text-primary transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.71-.93 2.73 1.01.08 2.01-.48 2.63-1.23z" />
              </svg>
              <span>App Store</span>
            </button>

            <button className="meta-pill text-text-secondary hover:text-text-primary transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.793 12 3.61 22.186a2.02 2.02 0 0 1-.61-.954V2.768c.082-.366.307-.714.609-.954zm11.306 11.307l2.428-2.428-9.97-5.756 7.542 8.184zm0 1.758l-7.542 8.184 9.97-5.756-2.428-2.428zm1.503-1.503l3.35 1.934c.732.423.732 1.114 0 1.536l-3.35 1.934-2.122-2.122 2.122-2.122z" />
              </svg>
              <span>Google Play</span>
            </button>
          </div>
        </div>

        {/* 5-column link grid with muted links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-12">
          {columnLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-14 pt-8 border-t border-border-subtle flex flex-wrap items-center gap-3">
          <span className="text-xs text-text-muted mr-2">Certified Security:</span>
          <span className="meta-pill">
            ISO 27001:2022
          </span>
          <span className="meta-pill">
            SOC 2 Type II
          </span>
          <span className="meta-pill">
            GDPR Compliant
          </span>
        </div>

        {/* Bottom row */}
        <div className="mt-8 pt-6 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-text-muted">
            © 2026 STUDIO3D LLC. ALL RIGHTS RESERVED
          </span>

          <div className="flex items-center gap-4 text-xs text-text-muted">
            <Link href="#" className="hover:text-text-primary transition-colors">
              Terms
            </Link>
            <span>·</span>
            <Link href="#" className="hover:text-text-primary transition-colors">
              Privacy
            </Link>
            <span>·</span>
            <Link href="#" className="hover:text-text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {/* X / Twitter */}
            <a
              href="#"
              aria-label="Twitter"
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.79-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="#"
              aria-label="YouTube"
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* Discord */}
            <a
              href="#"
              aria-label="Discord"
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
