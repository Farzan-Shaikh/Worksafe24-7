/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      /*
       * WorkSafe 24/7 design tokens (Phase 1).
       * Forest + ivory carry the identity, sage and charcoal support it,
       * and signal red is reserved for SOS / alert moments (brand continuity
       * with the red WorkSafe shield).
       */
      colors: {
        forest: {
          50: "#EEF3F0",
          100: "#D6E3DC",
          200: "#AFC7BA",
          300: "#84A894",
          400: "#56866F",
          // Darkened from #2D735C so small labels reach 4.5:1 on ivory
          500: "#286A55",
          600: "#1F5E4B",
          700: "#194D3E",
          800: "#133B30",
          900: "#0E2C24",
          950: "#09201A",
        },
        ivory: {
          50: "#F6F4EF",
          100: "#EFECE6",
          200: "#E7E4DD",
          300: "#DAD6CC",
          400: "#C5C0B3",
        },
        sage: {
          100: "#DFE6E0",
          200: "#C6D2C9",
          300: "#A9BBAF",
          400: "#8CA294",
          500: "#6E8778",
        },
        charcoal: {
          600: "#4A4640",
          700: "#3A3631",
          800: "#2B2824",
          900: "#211F1B",
          950: "#171613",
        },
        // Functional validation colour only (form and load errors). Never used for branding or decoration.
        alert: {
          DEFAULT: "#8C3B2A",
        },
      },
      fontFamily: {
        // One family everywhere: Manrope 400 / 500 / 600 (both keys kept so existing classes resolve)
        display: [
          "Manrope",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        body: [
          "Manrope",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      fontSize: {
        // Headline scale: roughly 25% smaller than before at desktop, calmer on phones.
        // Large sizes stay at 400 (Manrope gets heavy quickly); smaller headings use 500.
        "display-xl": [
          "clamp(2rem, 4.9vw, 5.25rem)",
          { lineHeight: "1.08", letterSpacing: "-0.03em", fontWeight: "400" },
        ],
        "display-lg": [
          "clamp(1.85rem, 3.7vw, 3.9rem)",
          { lineHeight: "1.1", letterSpacing: "-0.027em", fontWeight: "400" },
        ],
        "display-md": [
          "clamp(1.55rem, 2.8vw, 2.85rem)",
          { lineHeight: "1.16", letterSpacing: "-0.022em", fontWeight: "400" },
        ],
        "display-sm": [
          "clamp(1.3rem, 1.8vw, 1.8rem)",
          { lineHeight: "1.25", letterSpacing: "-0.015em", fontWeight: "500" },
        ],
        lead: [
          "clamp(1.0625rem, 1.15vw, 1.1875rem)",
          { lineHeight: "1.6", letterSpacing: "-0.005em" },
        ],
        eyebrow: ["0.72rem", { lineHeight: "1.3", letterSpacing: "0.09em" }],
      },
      maxWidth: {
        shell: "1440px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "ws-marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "ws-marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "ws-spin": {
          to: { transform: "rotate(360deg)" },
        },
        "ws-pulse": {
          "0%": { transform: "scale(0.6)", opacity: "0.7" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        "ws-dash": {
          to: { strokeDashoffset: "-200" },
        },
        "ws-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.15" },
        },
      },
      animation: {
        "ws-marquee": "ws-marquee 60s linear infinite",
        "ws-marquee-reverse": "ws-marquee-reverse 60s linear infinite",
        "ws-spin-slow": "ws-spin 40s linear infinite",
        "ws-spin-slower": "ws-spin 80s linear infinite",
        "ws-pulse": "ws-pulse 3.2s cubic-bezier(0.22, 1, 0.36, 1) infinite",
        "ws-dash": "ws-dash 6s linear infinite",
        "ws-blink": "ws-blink 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
