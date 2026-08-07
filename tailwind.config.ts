import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // 70% — Steel Blue
        navy: {
          950: "#152449",
          900: "#24386E",
          800: "#324A8C",
          700: "#3E58A0",
          600: "#4A66B4",
        },
        // 20% — White / Silver
        silver: {
          50: "#FFFFFF",
          100: "#F4F7FC",
          200: "#E3E9F4",
          300: "#C6D0E2",
          400: "#94A3BE",
          500: "#6B7A96",
        },
        // 10% — Electric Blue
        electric: {
          400: "#6BA0FF",
          500: "#4D8BFF",
          600: "#2E6BFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 6.5rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.5rem, 5.5vw, 4.5rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-sm": ["clamp(1.5rem, 2.6vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        shell: "1200px",
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "marquee-reverse": "marquee 32s linear infinite reverse",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
