/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}", "javascript/**/*.{js,ts}"],
  theme: {
    extend: {
      fontFamily: {
        latinMonoRegular: "latin-mono-regular, ui-mono",
        latinMonoCaps: "latin-mono-caps, ui-mono",
        latinMonoCondOblique:
          "latin-mono-cond-oblique, latin-mono-regular, ui-mono",
        latinRoman: "latin-roman, ui-serif",
        latinRomanCaps: "latin-roman-caps, ui-serif",
        latinRomanDunhillOblique:
          "latin-roman-dunhill-oblique, latin-mono-caps, ui-serif",
        lion: "Times New Roman, Times, serif",
      },
      colors: {
        mustard: {
          500: "#B26500",
          400: "#DAAD30",
          100: "#FFFCF7",
        },
        purple: {
          500: "#A855F7",
          400: "#C084FC",
          100: "#F3E8FF",
        },
        burgundy: {
          500: "#B52828",
          400: "#CD1543",
        },
        navy: {
          900: "#0A0D1E",
          800: "#151620",
          500: "#4F587C",
          400: "#4977A1",
        },
        lime: {
          700: "#485521",
          400: "#9E9E38",
        },
        black: {
          900: "#202020",
          800: "#19191B",
        },
      },
    },
  },
  plugins: [],
};
