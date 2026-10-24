import Link from "next/link";
import { ArrowLeft, Box, Download, ImageIcon, Sparkles } from "lucide-react";
import { MeshVisual } from "@/components/landing/MeshVisual";

const POINTS = [
  { icon: ImageIcon, text: "Upload a single product photo" },
  { icon: Box, text: "Choose Hyperbolic, TRELLIS or Tripo" },
  { icon: Download, text: "Download an STL ready for your slicer" },
];

/** Split-screen shell for the sign-in / sign-up pages. */
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 grid min-h-screen bg-bg-base lg:grid-cols-[1fr_1.1fr]">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden border-r border-border-subtle bg-[#050508] p-12 text-white lg:flex lg:flex-col">
        <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#00ffa3]/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-[#00c3ff]/20 blur-[120px]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <Link href="/" className="relative flex w-fit items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#00ffa3] to-[#00c3ff]">
            <Sparkles className="h-4 w-4 stroke-[2.5] text-[#050508]" />
          </div>
          <span className="text-base font-bold tracking-tight">Studio3D</span>
        </Link>

        <div className="relative my-auto py-10">
          <MeshVisual className="mx-auto mb-10 h-56 w-auto drop-shadow-[0_0_30px_rgba(0,255,163,0.25)]" />
          <h2 className="max-w-md text-3xl font-bold leading-tight tracking-tight">
            Photos in.{" "}
            <span className="bg-gradient-to-r from-[#00ffa3] to-[#00c3ff] bg-clip-text text-transparent">
              Printable 3D models
            </span>{" "}
            out.
          </h2>
          <ul className="mt-8 space-y-4">
            {POINTS.map((point) => (
              <li key={point.text} className="flex items-center gap-3 text-sm text-white/75">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                  <point.icon className="h-4 w-4 text-[#00ffa3]" />
                </span>
                {point.text}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-white/40">Your designs stay private to your account.</p>
      </aside>

      {/* Form */}
      <main className="relative flex flex-col px-6 py-8 sm:px-10">
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-neon-green/10 blur-[120px] lg:hidden" />
        <Link
          href="/"
          className="relative inline-flex w-fit items-center gap-1.5 text-xs font-medium text-text-muted transition-colors hover:text-text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>
        <div className="relative flex flex-1 items-center justify-center py-10">{children}</div>
      </main>
    </div>
  );
}
