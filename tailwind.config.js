/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        clip: "clip 4s ease-in-out infinite", // Define custom animation
      },
      keyframes: {
        clip: {
          "0%, 100%": {
            "clip-path":
              "polygon(0% 46%, 16% 44%, 34% 48%, 55% 57%, 75% 59%, 89% 56%, 100% 48%, 100% 100%, 0 100%)",
          },
          "50%": {
            "clip-path":
              "polygon(0 61%, 18% 65%, 35% 63%, 52% 54%, 68% 46%, 84% 42%, 100% 45%, 100% 100%, 0 100%)",
          },
        },
      },
    },
  },
  plugins: [],
};
