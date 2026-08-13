import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        /* ---- Ground: dark slate rather than near-black. Lifted one step from
               the original #05070E floor so panels read as a surface with
               depth instead of a void. ---- */
        ink: {
          950: "#0B1226", // page floor
          900: "#121C3A", // default background
          800: "#1B2950", // raised surface
          700: "#243466", // card / hover
        },
        /* ---- Legacy navy kept so untouched routes still compile ---- */
        navy: {
          950: "#0B1226",
          900: "#121C3A",
          800: "#1B2950",
          700: "#243466",
          600: "#4A66B4",
        },
        /* ---- The logo: brushed platinum ---- */
        platinum: {
          50: "#FFFFFF",
          100: "#F3F3F1",
          200: "#ECECE9",
          300: "#DBDBD8",
          400: "#BEBEBA",
          500: "#929290",
        },
        /* ---- Text. Each step lifted ~1 rung: silver-500 is the site's default
               body colour (76 uses), and at the old #7C8AA5 it sat right on the
               WCAG AA floor against the ground. ---- */
        silver: {
          50: "#FFFFFF",
          100: "#F4F7FC",
          200: "#E7ECF6",
          300: "#D3DBE9",
          400: "#AEBBD1",
          500: "#9AA8C0",
        },
        /* ---- The one accent: electric blue ---- */
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
        "display-xl": ["clamp(2.9rem, 7vw, 5.4rem)", { lineHeight: "0.98", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.4rem, 5.4vw, 4.2rem)", { lineHeight: "1", letterSpacing: "-0.035em" }],
        "display-md": ["clamp(2rem, 4vw, 3.1rem)", { lineHeight: "1.06", letterSpacing: "-0.03em" }],
        "display-sm": ["clamp(1.5rem, 2.6vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        shell: "1200px",
      },
      animation: {
        marquee: "marquee 34s linear infinite",
        "marquee-reverse": "marquee 34s linear infinite reverse",
        drift: "drift 18s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        /* Opacity-only: the shaft already owns `transform: rotate(22deg)`,
           so animating transform here would flatten it. */
        drift: {
          "0%, 100%": { opacity: "0.75" },
          "50%": { opacity: "1" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 10px 0 rgba(77,139,255,0.9)" },
          "50%": { opacity: "0.55", boxShadow: "0 0 16px 2px rgba(77,139,255,0.35)" },
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
