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
        background: "var(--background)",
        foreground: "var(--foreground)",
        meshy: {
          bg: "#000000",
          card: "#0d0d0d",
          elevated: "#141414",
          border: "#1f1f1f",
          muted: "#888888",
          faint: "#444444",
          violet: "#7c3aed",
          lime: "#a3e635",
          blue: "#3b82f6",
        },
        studio: {
          dark: "#0d0d0d",
          card: "#111111",
          elevated: "#17171a",
          input: "#1a1a1e",
          border: "#26262e",
          accent: "#7c3aed",
          "accent-hover": "#6d28d9",
          "accent-glow": "rgba(124, 58, 237, 0.25)",
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
