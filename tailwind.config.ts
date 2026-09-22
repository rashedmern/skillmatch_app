import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: "640px",
      md: "768px", // Tablet breakpoint (768px - 1023px, 8 cols, 1rem gutters, 1.5rem margin)
      lg: "1024px", // Desktop breakpoint (1024px+, 12 cols, 1.5rem gutters, 2rem margin)
      xl: "1280px",
      "2xl": "1440px", // Application container maximum boundary
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "2rem",
        "2xl": "2rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        // --- Oceanic Intelligence Core Palette ---
        surface: {
          DEFAULT: "#f8f9ff",
          dim: "#d2dbe9",
          bright: "#f8f9ff",
          variant: "#dae3f1",
          container: {
            lowest: "#ffffff",
            low: "#eef4ff",
            DEFAULT: "#e5effd",
            high: "#e0e9f7",
            highest: "#dae3f1",
          },
        },
        "on-surface": {
          DEFAULT: "#131c26",
          variant: "#3f484a",
        },
        "inverse-surface": {
          DEFAULT: "#28313c",
          on: "#e9f1ff",
        },
        outline: {
          DEFAULT: "#6f797b",
          variant: "#bfc8ca",
        },
        "surface-tint": "#216772",

        // Primary Teal Tier
        primary: {
          DEFAULT: "#004049",
          container: "#095964",
          hover: "#07454e",
          fixed: "#acedfa",
          "fixed-dim": "#90d1dd",
          inverse: "#90d1dd",
        },
        "on-primary": {
          DEFAULT: "#ffffff",
          container: "#8dceda",
          fixed: "#001f24",
          "fixed-variant": "#004e59",
        },

        // Secondary Cyan-Teal / Technical Mint Tier
        secondary: {
          DEFAULT: "#006a61",
          mint: "#0a887d",
          container: "#8df1e4",
          fixed: "#90f4e6",
          "fixed-dim": "#73d7ca",
        },
        "on-secondary": {
          DEFAULT: "#ffffff",
          container: "#006f66",
          fixed: "#00201d",
          "fixed-variant": "#005049",
        },

        // Tertiary Deep Alert Tier
        tertiary: {
          DEFAULT: "#7a0004",
          container: "#a60008",
          fixed: "#ffdad5",
          "fixed-dim": "#ffb4aa",
        },
        "on-tertiary": {
          DEFAULT: "#ffffff",
          container: "#ffafa5",
          fixed: "#410001",
          "fixed-variant": "#930006",
        },

        // Accent / Qualification Gap & Error Tier
        "accent-gap": {
          DEFAULT: "#e42520",
          container: "#ffdad6",
          subtle: "rgba(228, 37, 32, 0.06)",
          border: "rgba(228, 37, 32, 0.20)",
        },
        error: {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
        },
        "on-error": {
          DEFAULT: "#ffffff",
          container: "#93000a",
        },

        // Neutral Canvas & Structural Hairlines
        background: "#f8f9ff",
        "on-background": "#131c26",
        "stroke-slate": "#e2e8f0",
        "stroke-card": "#eaecf0",
        "stroke-hover": "#cbd5e1",
      },

      fontFamily: {
        sans: ["var(--font-arimo)", "Arimo", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        arimo: ["var(--font-arimo)", "Arimo", "sans-serif"],
      },

      // Strict Typography Hierarchy (Arimo)
      fontSize: {
        "headline-xl": [
          "36px",
          {
            lineHeight: "44px",
            letterSpacing: "-0.03em",
            fontWeight: "700",
          },
        ],
        "headline-xl-mobile": [
          "28px",
          {
            lineHeight: "36px",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        "headline-lg": [
          "28px",
          {
            lineHeight: "36px",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        "headline-lg-mobile": [
          "22px",
          {
            lineHeight: "30px",
            letterSpacing: "-0.01em",
            fontWeight: "700",
          },
        ],
        "headline-md": [
          "20px",
          {
            lineHeight: "28px",
            letterSpacing: "-0.015em",
            fontWeight: "600",
          },
        ],
        "headline-sm": [
          "16px",
          {
            lineHeight: "24px",
            letterSpacing: "-0.01em",
            fontWeight: "600",
          },
        ],
        "body-lg": [
          "16px",
          {
            lineHeight: "24px",
            letterSpacing: "-0.005em",
            fontWeight: "400",
          },
        ],
        "body-md": [
          "14px",
          {
            lineHeight: "20px",
            letterSpacing: "0em",
            fontWeight: "400",
          },
        ],
        "body-sm": [
          "13px",
          {
            lineHeight: "18px",
            letterSpacing: "0em",
            fontWeight: "400",
          },
        ],
        "label-lg": [
          "14px",
          {
            lineHeight: "20px",
            letterSpacing: "-0.005em",
            fontWeight: "600",
          },
        ],
        "label-md": [
          "12px",
          {
            lineHeight: "16px",
            letterSpacing: "0.01em",
            fontWeight: "600",
          },
        ],
        "label-sm": [
          "11px",
          {
            lineHeight: "14px",
            letterSpacing: "0.02em",
            fontWeight: "500",
          },
        ],
        "numeric-metric": [
          "24px",
          {
            lineHeight: "28px",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
      },

      borderRadius: {
        sm: "0.25rem", // 4px
        DEFAULT: "0.5rem", // 8px (Inputs & Buttons)
        md: "0.75rem", // 12px
        lg: "1rem", // 16px
        xl: "1.25rem", // 20px (Cards)
        "2xl": "1.5rem", // 24px (Main Hero & Simulation Container)
        full: "9999px", // Badges, Chips & Match Indicators
      },

      spacing: {
        gutter: "1.5rem",
        "gutter-mobile": "1rem",
        margin: "2rem",
        "margin-mobile": "1rem",
        "space-xs": "0.25rem", // 4px
        "space-sm": "0.5rem", // 8px
        "space-md": "1rem", // 16px
        "space-lg": "1.5rem", // 24px
        "space-xl": "2rem", // 32px
      },

      // Structural Depth Tiers (Paper-thin hairlines + Diffused ambient occlusions)
      boxShadow: {
        "level-0": "none",
        "level-1": "0px 1px 3px rgba(16, 24, 40, 0.05), 0px 1px 2px rgba(16, 24, 40, 0.02)",
        "level-2": "0px 8px 16px -4px rgba(9, 89, 100, 0.06), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
        "level-3": "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
        "focus-ring": "0 0 0 3px rgba(10, 136, 125, 0.24)",
        "focus-ring-subtle": "0 0 0 3px rgba(10, 136, 125, 0.15)",
        "focus-ring-error": "0 0 0 3px rgba(228, 37, 32, 0.15)",
      },

      keyframes: {
        "pulse-subtle": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(0.92)" },
        },
      },
      animation: {
        "pulse-subtle": "pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
