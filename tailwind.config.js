/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-white": "#F6F6F6",
        "brand-blue": "#295871",
        "brand-grey": "#464646",
        "brand-red": "#900E0E",
      },
    },
  },
  plugins: [],
};
