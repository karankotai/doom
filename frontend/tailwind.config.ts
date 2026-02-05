import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      /* Duolingo-inspired typography */
      fontFamily: {
        sans: ["var(--font-nunito)", "DIN Rounded", "system-ui", "sans-serif"],
        display: ["var(--font-nunito)", "DIN Rounded", "system-ui", "sans-serif"],
      },
      fontSize: {
        /* Duolingo uses bold, clear typography */
        "hero": ["3.5rem", { lineHeight: "1.1", fontWeight: "800" }],
        "title": ["1.75rem", { lineHeight: "1.2", fontWeight: "700" }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /* Duolingo extended palette */
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        purple: {
          DEFAULT: "hsl(var(--purple))",
          foreground: "hsl(var(--purple-foreground))",
        },
        /* Direct Duolingo colors for flexibility */
        duo: {
          green: "#58CC02",
          "green-dark": "#43C000",
          "green-light": "#89E219",
          blue: "#1CB0F6",
          "blue-dark": "#1899D6",
          red: "#FF4B4B",
          yellow: "#FFC800",
          orange: "#FF9600",
          purple: "#CE82FF",
          gray: "#4B4B4B",
          "gray-light": "#6F6F6F",
          "gray-lighter": "#AFAFAF",
          "gray-lightest": "#E5E5E5",
          snow: "#FFFFFF",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        /* Duolingo uses very rounded elements */
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        /* Duolingo-style 3D button shadows */
        "duo": "0 4px 0 0 rgba(0, 0, 0, 0.1)",
        "duo-primary": "0 4px 0 0 #43C000",
        "duo-accent": "0 4px 0 0 #1899D6",
        "duo-destructive": "0 4px 0 0 #E53838",
        "duo-secondary": "0 4px 0 0 #AFAFAF",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        /* Duolingo-style bounce animation */
        "bounce-small": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        /* XP/achievement pop animation */
        "pop": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        /* Streak fire animation */
        "flame": {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(1.1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bounce-small": "bounce-small 0.5s ease-in-out",
        "pop": "pop 0.3s ease-out",
        "flame": "flame 0.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
