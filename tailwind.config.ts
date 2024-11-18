import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-color': '#5CE1E6',
        'main-color': '#9B51E0',
        'page-color': '#FEFDFF',
        'text-color': '#333333',
        'loading-color': 'rgba(155, 81, 224, 0.6)'
      },
    },
  },
  plugins: [],
};
export default config;
