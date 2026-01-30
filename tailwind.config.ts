import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ED1C24",
          dark: "#A30C11",
        },
        secondary: {
          DEFAULT: "#000000",
        },
        background: {
          DEFAULT: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
export default config;
