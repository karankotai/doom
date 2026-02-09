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
      fontFamily: {
        sans: ["var(--font-nunito)", "DIN Rounded", "system-ui", "sans-serif"],
        display: ["var(--font-nunito)", "DIN Rounded", "system-ui", "sans-serif"],
      },
      fontSize: {
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
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        purple: {
          DEFAULT: "hsl(var(--purple))",
          foreground: "hsl(var(--purple-foreground))",
        },
        /* Space / Cosmos direct colors */
        cosmos: {
          nebula: "#6C63FF",
          "nebula-dark": "#5A52E0",
          "nebula-light": "#8B85FF",
          cyan: "#00E5FF",
          "cyan-dark": "#00B8D4",
          magenta: "#FF6AC1",
          gold: "#FFD700",
          red: "#FF3B5C",
          purple: "#B388FF",
          panel: "#131829",
          dust: "#1E2235",
          void: "#2A2F45",
          star: "#E8E6F0",
          "star-faded": "#8B8DA3",
          deep: "#0B0E17",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        /* Cosmos-style 3D button shadows */
        "cosmos": "0 4px 0 0 rgba(108, 99, 255, 0.15)",
        "cosmos-primary": "0 4px 0 0 #5A52E0",
        "cosmos-accent": "0 4px 0 0 #D94FA0",
        "cosmos-destructive": "0 4px 0 0 #CC2F4A",
        "cosmos-secondary": "0 4px 0 0 #2A2F45",
        /* Glow shadows */
        "glow-sm": "0 0 10px rgba(108, 99, 255, 0.2)",
        "glow-md": "0 0 20px rgba(108, 99, 255, 0.3)",
        "glow-lg": "0 0 40px rgba(108, 99, 255, 0.3), 0 0 80px rgba(108, 99, 255, 0.1)",
        "glow-cyan": "0 0 20px rgba(0, 229, 255, 0.3)",
        "glow-magenta": "0 0 20px rgba(255, 106, 193, 0.3)",
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
        "bounce-small": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "pop": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "orbit-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.15)", opacity: "0.8" },
        },
        "twinkle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "nebula-drift": {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(10px, -10px) scale(1.05)" },
          "66%": { transform: "translate(-5px, 5px) scale(0.95)" },
          "100%": { transform: "translate(0, 0) scale(1)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(108, 99, 255, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(108, 99, 255, 0.6)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bounce-small": "bounce-small 0.5s ease-in-out",
        "pop": "pop 0.3s ease-out",
        "orbit-pulse": "orbit-pulse 2s ease-in-out infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "nebula-drift": "nebula-drift 20s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
