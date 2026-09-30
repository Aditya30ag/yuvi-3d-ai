import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bg-base px-4 py-8 relative z-10 transition-colors">
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#059669",
            colorBackground: "#ffffff",
            colorInputBackground: "#f9fafb",
            colorInputText: "#111827",
            colorText: "#111827",
            colorTextSecondary: "#6b7280",
            borderRadius: "1rem",
          },
          elements: {
            card: "border border-border-subtle shadow-xl bg-white",
            formButtonPrimary:
              "bg-gradient-to-r from-[#00ffa3] to-[#00c3ff] text-[#050508] font-bold hover:shadow-[0_0_20px_rgba(0,255,163,0.3)] transition-all",
            footerActionLink: "text-[#059669] hover:text-[#0284c7] hover:underline font-medium",
            headerTitle: "text-gray-900 font-bold",
            headerSubtitle: "text-gray-500",
            socialButtonsBlockButton: "border border-gray-200 hover:bg-gray-50 text-gray-700",
            formFieldInput: "border border-gray-300 focus:border-[#059669]",
          },
          captcha: {
            theme: "light",
          },
        }}
      />
    </div>
  );
}
