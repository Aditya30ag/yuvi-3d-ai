import Link from "next/link";
import { Sparkles } from "lucide-react";

const LINKS = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Engines", href: "/#engines" },
  { label: "FAQ", href: "/#faq" },
  { label: "Workspace", href: "/workspace" },
];

export function Footer() {
  return (
    <footer className="border-t border-border-subtle px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-[#00ffa3] to-[#00c3ff]">
              <Sparkles className="h-4 w-4 text-[#050508]" />
            </div>
            <span className="nav-logo text-base font-bold tracking-tight">Studio3D</span>
          </Link>
          <p className="text-xs text-text-muted">Photo to printable 3D model.</p>
        </div>

        <nav className="flex flex-wrap border-0 bg-transparent backdrop-blur-none items-center justify-center gap-x-6 gap-y-2 text-sm text-text-secondary">
          {LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="transition-colors hover:text-text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-text-muted">© {new Date().getFullYear()} Studio3D</p>
      </div>
    </footer>
  );
}
