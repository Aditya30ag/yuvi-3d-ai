import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import "./globals.css";

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
          colorPrimary: "#7c3aed",
          colorBackground: "#111111",
          colorInputBackground: "#1a1a1a",
          colorText: "#ffffff",
        },
      }}
    >
      <html lang="en" className="dark">
        <body className="min-h-screen bg-[#0d0d0d] text-zinc-100 antialiased selection:bg-violet-600/40 selection:text-white">
          {children}
          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{
              style: {
                background: "#18181b",
                border: "1px solid #27272a",
                color: "#f4f4f5",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
