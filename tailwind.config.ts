import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1B5E20",
          secondary: "#2E7D32",
        },
        surface: {
          base: "#F5F5F5",
          text: "#212121",
        },
      },
      boxShadow: {
        soft: "0 8px 24px -12px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
