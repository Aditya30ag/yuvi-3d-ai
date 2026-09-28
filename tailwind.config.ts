import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      colors: {
        background: "var(--bg-base)",
        foreground: "var(--text-primary)",
        "bg-base": "var(--bg-base)",
        "neon-green": "var(--neon-green)",
        "neon-blue": "var(--neon-blue)",
        "neon-purple": "var(--neon-purple)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "border-subtle": "var(--border-subtle)",
        "border-glow": "var(--border-glow)",
        meshy: {
          bg: "#050508",
          card: "#0d0d0d",
          elevated: "#141414",
          border: "#1f1f1f",
          muted: "#888888",
          faint: "#444444",
          violet: "#00ffa3",
          lime: "#a3e635",
          blue: "#00c3ff",
        },
        studio: {
          dark: "#050508",
          card: "#111111",
          elevated: "#17171a",
          input: "#1a1a1e",
          border: "rgba(255, 255, 255, 0.08)",
          accent: "#00ffa3",
          "accent-hover": "#00e08f",
          "accent-glow": "rgba(0, 255, 163, 0.25)",
        },
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
        pill: "9999px",
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.03)" },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        marqueeLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        "marquee-left": "marqueeLeft 35s linear infinite",
        "marquee-right": "marqueeRight 35s linear infinite",
        "marquee-testimonials": "marqueeLeft 50s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
