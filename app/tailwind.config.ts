import type { Config } from "tailwindcss";
import containerQueries from '@tailwindcss/container-queries'
export default  {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src//features/**/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "1500px",
      },
    },
    extend: {
      colors: {
        background: "var(--background)", // This manually maps your custom bg-background color class!
        // This manually maps your custom bg-background color class!
        foreground: "var(--foreground, #000)", // This manually maps your custom bg-foreground color class!
      },
    },
  },

  plugins: [require("tailwindcss-animate"), containerQueries],
} satisfies Config;

