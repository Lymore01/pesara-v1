// TODO: deprecated on tailwind@4

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--font-sans)",
        heading: "var(--font-heading)",
        mono: "var(--font-mono)",
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        accent: "var(--color-accent)",
        foreground: "var(--color-foreground)",
        muted: "var(--muted)",
        error: "var(--error)",
        success: "var(--success)",
      },
      backgroundColor: {
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--color-accent)",
        accentAlt: "var(--accent-alt)",
        success: "var(--success)",
        error: "var(--error)",
        muted: "var(--muted)",
      },
      borderColor: {
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        accent: "var(--color-accent)",
        error: "var(--error)",
        success: "var(--success)",
      },
      ringColor: {
        accent: "var(--color-accent)",
        surface: "var(--color-surface)",
        success: "var(--success)",
        error: "var(--error)",
      },
      divideColor: {
        surface: "var(--color-surface)",
        accent: "var(--color-accent)",
        muted: "var(--muted)",
      },
      outlineColor: {
        accent: "var(--color-accent)",
        error: "var(--error)",
        success: "var(--success)",
      },
      placeholderColor: {
        muted: "var(--muted)",
        secondary: "var(--text-secondary)",
      },
      boxShadowColor: {
        accent: "var(--color-accent)",
        error: "var(--error)",
        success: "var(--success)",
      },
    },
  },
  plugins: [],
};
