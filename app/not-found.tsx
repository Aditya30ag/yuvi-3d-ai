import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 text-center select-none">
      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-xl shadow-white/10">
        <Sparkles className="w-6 h-6 text-black stroke-[2.5]" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
        404
      </h1>
      <p className="text-sm sm:text-base text-zinc-400 max-w-sm mb-8 leading-relaxed">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/workspace"
        className="bg-white hover:bg-neutral-200 text-black font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-md"
      >
        Return to Studio Workspace
      </Link>
    </div>
  );
}
