/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        goldman: ["Goldman", "display"],
        cygnito: ["Cygnito Mono", "display"],
        tektur: ["Tektur", "display"],
      },
    },
  },
  plugins: [],
};
