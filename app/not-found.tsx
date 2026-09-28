import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col items-center justify-center px-4 text-center select-none relative overflow-hidden">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00ffa3] to-[#00c3ff] flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(0,255,163,0.35)]">
        <Sparkles className="w-7 h-7 text-[#050508] stroke-[2.5]" />
      </div>
      <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight hero-title mb-3">
        <span className="accent">404</span>
      </h1>
      <p className="text-sm sm:text-base text-white/50 max-w-sm mb-8 leading-relaxed">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/workspace"
        className="btn-primary text-sm font-bold px-7 py-3 rounded-xl transition-all inline-block shadow-[0_0_20px_rgba(0,255,163,0.3)] hover:scale-105 active:scale-95"
      >
        Return to Studio Workspace
      </Link>
    </div>
  );
}
