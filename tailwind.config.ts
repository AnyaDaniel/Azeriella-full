import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        azriella: {
          pink: '#E91E8C',
          'pink-light': '#FF6BB5',
          'pink-dark': '#C01571',
          navy: '#1E2A5E',
          'navy-light': '#2D4091',
          'navy-dark': '#0F1530',
        },
      },
    },
  },
  plugins: [],
};
export default config;
