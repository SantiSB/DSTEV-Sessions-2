/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        goldman: ["Goldman", "display"],
        oxanium: ["Oxanium", "display"],
        kelly: ["Kelly Slab", "display"],
        offside: ["Offside", "display"],
        blackops: ["Black Ops One", "display"],
      },
    },
  },
  plugins: [],
};
