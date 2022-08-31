/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "usd-primary": "#fffffe",
        "usd-secondary": "#d21633",
        "sdsu-secondary": "#0100a3",
        "sdsu-primary": "#fed107",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        main: {
          "base-100": "#ffffff",
          neutral: "#ffffff",
          primary: "#ffffff",
          secondary: "#d9d9d9",
          info: "#38ADDC",
          success: "#1C975D",
          warning: "#F2C84A",
          error: "#F62909",
        },
      },
    ],
  },
};
