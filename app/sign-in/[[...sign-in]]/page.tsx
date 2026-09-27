import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Sparkles } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#000000] px-4 py-8">
      <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-8 w-full max-w-[400px] flex flex-col items-center shadow-2xl">
        {/* Top: small cube/sparkle logo (white) + "Studio3D" */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4 text-black stroke-[2.5]" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Studio3D</span>
        </div>

        <p className="text-sm text-zinc-400 mb-6 text-center">
          Create stunning 3D from images
        </p>

        {/* <SignIn /> with dark Clerk theme + white accent */}
        <div className="w-full flex justify-center">
          <SignIn
            appearance={{
              baseTheme: dark,
              variables: {
                colorPrimary: "#ffffff",
                colorBackground: "#0a0a0a",
                colorInputBackground: "#141414",
                colorText: "#ffffff",
                colorTextSecondary: "#a1a1aa",
                borderRadius: "0.5rem",
              },
              elements: {
                card: "shadow-none border-0 bg-transparent p-0 w-full",
                rootBox: "w-full",
                formButtonPrimary: "bg-white hover:bg-neutral-200 text-black font-semibold shadow-md",
                footerActionLink: "text-white hover:underline font-medium",
              },
            }}
          />
        </div>

        <p className="mt-6 text-xs text-zinc-600 text-center">
          Powered by Meshy AI
        </p>
      </div>
    </div>
  );
}
