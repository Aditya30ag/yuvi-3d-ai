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
          colorPrimary: "#ffffff",
          colorBackground: "#0a0a0a",
          colorInputBackground: "#141414",
          colorText: "#ffffff",
        },
        elements: {
          formButtonPrimary: "bg-white text-black hover:bg-neutral-200 font-semibold",
        },
      }}
    >
      <html lang="en" className="dark">
        <body className={`${inter.variable} font-sans min-h-screen bg-black text-white antialiased selection:bg-white selection:text-black`}>
          {children}
          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{
              style: {
                background: "#0a0a0a",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#ffffff",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
