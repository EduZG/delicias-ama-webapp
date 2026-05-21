import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./services/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1180px",
      },
    },
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        brand: {
          50: "#fff8ed",
          100: "#ffefd1",
          200: "#ffdaa3",
          300: "#ffbd6a",
          400: "#fb9631",
          500: "#f57913",
          600: "#d95809",
          700: "#b33c0b",
          800: "#913010",
          900: "#772910",
        },
        ink: {
          900: "#17130f",
          700: "#3f342b",
          500: "#76695d",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 60px rgb(23 19 15 / 0.08)",
      },
      borderRadius: {
        button: "0.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
