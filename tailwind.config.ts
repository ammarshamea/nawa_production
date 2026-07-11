import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#050505",
          deep: "#050505",
          soft: "#0a0a0a",
        },
        studio: {
          purple: "#380638",
          "purple-black": "#1a061a",
          gold: "#d49b64",
          "gold-soft": "#e8b88a",
          white: "#f5f1ea",
          muted: "rgba(245, 241, 234, 0.65)",
        },
        plum: {
          50: "#F4ECFF",
          100: "#E3D3F8",
          200: "#C5A6F0",
          300: "#9F6FE2",
          400: "#7B45C8",
          500: "#5A2EA6",
          600: "#3F1F7A",
          700: "#2C1556",
          800: "#1C0E39",
          900: "#380638",
        },
        gold: {
          50: "#FBF3DF",
          100: "#F2E1B0",
          200: "#E8CB80",
          300: "#e8b88a",
          400: "#d49b64",
          500: "#d49b64",
          600: "#b8844f",
          700: "#5F4413",
        },
      },
      fontFamily: {
        display: ["var(--font-heading-en)", "system-ui", "sans-serif"],
        sans: ["var(--font-body-en)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading-en)", "system-ui", "sans-serif"],
        "heading-ar": ["var(--font-heading-ar)", "system-ui", "sans-serif"],
        "body-ar": ["var(--font-body-ar)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        grain: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
        "gold-sheen":
          "linear-gradient(135deg, #f5f1ea 0%, #d49b64 40%, #b8844f 70%, #f5f1ea 100%)",
        "purple-haze":
          "radial-gradient(ellipse at 30% 40%, rgba(56, 6, 56, 0.55), transparent 65%)",
      },
      boxShadow: {
        gold: "0 0 60px -10px rgba(212, 155, 100, 0.45)",
        plum: "0 0 80px -10px rgba(56, 6, 56, 0.5)",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        micro: "200ms",
        ui: "400ms",
        scene: "800ms",
        cinematic: "1400ms",
      },
    },
  },
  plugins: [],
};

export default config;
