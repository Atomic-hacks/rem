import type { Config } from "tailwindcss";

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Jura", "Arial", "Helvetica", "sans-serif"],
        mono: ["Jura", "monospace"],
      },
      colors: {
        brand: {
          primary: "#FDB824",
        },
        status: {
          verified: {
            DEFAULT: "#16A34A",
            foreground: "#F0FDF4",
            muted: "#DCFCE7",
          },
          sold: {
            DEFAULT: "#DC2626",
            foreground: "#FEF2F2",
            muted: "#FEE2E2",
          },
          pending: {
            DEFAULT: "#D97706",
            foreground: "#FFFBEB",
            muted: "#FEF3C7",
          },
        },
        property: {
          available: "#0F766E",
          featured: "#7C3AED",
          offMarket: "#64748B",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
