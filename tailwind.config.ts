import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        callout: "var(--color-callout)",
        accent: "var(--color-accent)",
        complement: "var(--color-complement)",
      },
      fontFamily: {
        primary: ["var(--font-jaldi)", "serif"],
        secondary: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "paint-palette": "url('/paint-palette.svg')",
      },
      keyframes: {
        'float-1': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-30px)' },
          '100%': { transform: 'translateY(0)' },
        },
        'float-2': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-40px)' },
          '100%': { transform: 'translateY(0)' },
        },
        'float-3': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
          '100%': { transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-out': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(20px)', opacity: '0' },
        },
      },
      animation: {
        'float-1': 'float-1 5s ease-in-out infinite 0.7s',
        'float-2': 'float-2 5s ease-in-out infinite',
        'float-3': 'float-3 6s ease-in-out infinite',
        'fade-in': 'fade-in 1s ease',
        'fade-out': 'fade-out 1s ease',
      },
    },
  },
  plugins: [],
};
export default config;
