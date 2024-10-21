import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)"],
        mono: ["var(--font-space-mono)"],
      },
      colors: {
        neutral: {
          400: "#b2b2b2",
          500: "#787878",
          600: "#434343",
          700: "#3d3d3d",
          800: "#262626",
          900: "#141414",
          950: "#0a0a0a",
        },
        teal: {
          400: "#06d6a0",
          500: "#07a87e",
          700: "#003628",
        },
        orange: {
          700: "#ff5a00",
        },
      },
    },
  },
};
export default config;
