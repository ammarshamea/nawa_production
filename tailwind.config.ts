import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0710",
          deep: "#05030A",
          soft: "#13101C",
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
          900: "#0F0723",
        },
        gold: {
          50: "#FBF3DF",
          100: "#F2E1B0",
          200: "#E8CB80",
          300: "#DDB55A",
          400: "#D29F3C",
          500: "#B8862A",
          600: "#8E661E",
          700: "#5F4413",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grain":
          "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
        "gold-sheen":
          "linear-gradient(135deg, #FBF3DF 0%, #DDB55A 40%, #8E661E 70%, #FBF3DF 100%)",
      },
      boxShadow: {
        gold: "0 0 60px -10px rgba(221, 181, 90, 0.45)",
        plum: "0 0 80px -10px rgba(123, 69, 200, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
