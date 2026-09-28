import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050508] px-4 py-8 relative z-10">
      <SignIn
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: "#00ffa3",
            colorBackground: "#0b0c10",
            colorInputBackground: "rgba(255, 255, 255, 0.05)",
            colorInputText: "#ffffff",
            colorText: "#ffffff",
            colorTextSecondary: "rgba(255, 255, 255, 0.6)",
            borderRadius: "1rem",
          },
          elements: {
            card: "border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl",
            formButtonPrimary: "bg-gradient-to-r from-[#00ffa3] to-[#00c3ff] text-[#050508] font-bold hover:shadow-[0_0_20px_rgba(0,255,163,0.4)] transition-all",
            footerActionLink: "text-[#00ffa3] hover:text-[#00c3ff] hover:underline",
            headerTitle: "text-white font-bold",
            headerSubtitle: "text-white/60",
          },
        }}
      />
    </div>
  );
}
