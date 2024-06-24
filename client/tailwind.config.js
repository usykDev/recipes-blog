/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-200": "#2AB7CA",
        "blue-300": "#00B2CA",
        "yellow-200": "#FED766",
        "yellow-400": "#FFDE59",
        "green-300": "#AED77B",
        "green-400": "#8ABB4C",
        "green-500": "#739E3D",
        "orange-300": "#FB8A51",
        "gray-light-100": "#F4F4F8",
        "gray-light-200": "#E6E6EA",
        //
        "red-200": "#FC9881",
        "red-500": "#D83D3F",
        "blue-100": "#B6EAFF",
        "blue-500": "#1C3656",
        "beige-100": "#f3ece4",
        "beige-300": "#EAD5C5",
        "beige-400": "#B19071",
      },

      dropShadow: {
        "3xl": "0px 4px 2px #a3a3a3",
        "4xl": "0px 16px 25px #E5D7BC",
      },

      gridTemplateColumns: {
        comment: "min-content 1fr min-content",
      },
    },
    screens: {
      xxs: "320px",
      xs: "481px",
      sm: "930px",
      md: "1400px",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
