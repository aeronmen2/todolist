/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/pages/**/*.{js,jsx}", "src/components/**/*.{js,jsx}"],
  theme: {
    extend: { display: ["group-hover"] },
  },
  plugins: [],
}
