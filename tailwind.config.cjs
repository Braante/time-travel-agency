/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 0 1px rgba(234,179,8,0.25), 0 10px 35px rgba(0,0,0,0.55)",
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(1200px circle at 20% 10%, rgba(59,130,246,0.22), transparent 55%), radial-gradient(900px circle at 80% 30%, rgba(234,179,8,0.18), transparent 55%), radial-gradient(900px circle at 60% 100%, rgba(16,185,129,0.15), transparent 55%)",
      },
    },
  },
  plugins: [],
}
