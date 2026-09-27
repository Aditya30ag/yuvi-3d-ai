import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Sparkles } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#080808] px-4 py-8">
      <div className="bg-[#111111] rounded-2xl border border-[#1f1f1f] p-8 w-full max-w-[400px] flex flex-col items-center shadow-2xl">
        {/* Top: small cube/sparkle logo (violet) + "Studio3D" text-xl font-bold text-white centered */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Studio3D</span>
        </div>

        {/* Tagline: "Create stunning 3D from images" text-sm text-#888 mb-6 */}
        <p className="text-sm text-[#888888] mb-6 text-center">
          Create stunning 3D from images
        </p>

        {/* <SignUp /> with dark Clerk theme + violet accent */}
        <div className="w-full flex justify-center">
          <SignUp
            appearance={{
              baseTheme: dark,
              variables: {
                colorPrimary: "#7c3aed",
                colorBackground: "#111111",
                colorInputBackground: "#1a1a1a",
                colorText: "#ffffff",
                colorTextSecondary: "#888888",
                borderRadius: "0.5rem",
              },
              elements: {
                card: "shadow-none border-0 bg-transparent p-0 w-full",
                rootBox: "w-full",
                formButtonPrimary: "bg-violet-600 hover:bg-violet-500 text-white font-medium",
                footerActionLink: "text-violet-400 hover:text-violet-300",
              },
            }}
          />
        </div>

        {/* Below card: subtle "Powered by Meshy AI" text-xs text-#333 */}
        <p className="mt-6 text-xs text-[#333333] text-center">
          Powered by Meshy AI
        </p>
      </div>
    </div>
  );
}
