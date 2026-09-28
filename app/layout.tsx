import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio3D - AI Image & 3D Generator",
  description: "Next-generation AI Image Generation and Image-to-3D workspace powered by Meshy AI",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#00ffa3",
          colorBackground: "#050508",
          colorInputBackground: "rgba(255, 255, 255, 0.04)",
          colorText: "#ffffff",
        },
        elements: {
          formButtonPrimary: "bg-[#00ffa3] text-[#050508] hover:bg-[#00e08f] font-bold",
        },
      }}
    >
      <html lang="en" className="dark">
        <body className={`${inter.variable} font-sans min-h-screen bg-[#050508] text-white antialiased selection:bg-[#00ffa3] selection:text-[#050508] relative`}>
          {/* Ambient glow orbs — fixed container */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="bg-orb-green" />
            <div className="bg-orb-purple" />
            <div className="bg-orb-blue" />
          </div>
          <div className="relative z-10">
            {children}
          </div>
          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{
              style: {
                background: "#050508",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#ffffff",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
