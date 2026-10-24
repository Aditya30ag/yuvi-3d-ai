import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { SettingsModal } from "@/components/settings/SettingsModal";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio3D - AI Image & 3D Generator",
  description: "Next-generation AI Image Generation and Image-to-3D workspace powered by the Studio3D API",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem('studio3d_theme') || 'light';
                  var resolved = storedTheme;
                  if (storedTheme === 'system') {
                    resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  var root = document.documentElement;
                  if (resolved === 'dark') {
                    root.classList.add('dark');
                    root.setAttribute('data-theme', 'dark');
                    root.style.colorScheme = 'dark';
                  } else {
                    root.classList.remove('dark');
                    root.setAttribute('data-theme', 'light');
                    root.style.colorScheme = 'light';
                  }
                  var storedSidebar = localStorage.getItem('studio3d_sidebar') || 'solid';
                  root.setAttribute('data-sidebar', storedSidebar.toLowerCase());
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans min-h-screen bg-bg-base text-text-primary antialiased selection:bg-[#00ffa3] selection:text-[#050508] relative transition-colors duration-150`}
      >
        <AuthProvider>
          <ThemeProvider>
            {/* Ambient glow orbs — fixed container */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
              <div className="bg-orb-green" />
              <div className="bg-orb-purple" />
              <div className="bg-orb-blue" />
            </div>
            <div className="relative z-10">
              {children}
            </div>
            <SettingsModal />
            <Toaster
              position="bottom-right"
              toastOptions={{
                className: "border border-border-subtle bg-bg-surface text-text-primary shadow-lg",
              }}
            />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
