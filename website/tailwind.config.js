module.exports = {
  theme: {
    fontFamily: {
      serif: '"Zilla Slab", serif'
    },
    extend: {
      fontSize: {
        "small-screen": ["24px", "36px"],
        "regular-screen": ["20px", "36px"]
      },
      colors: {
        purple: "#222233",

        orange: "#ffb74d",
        "bright-orange": "#ff9800",
        "light-orange": "#ffe8bf",

        white: "#fff",

        gray: {
          100: "#efefef",
          200: "#eee",
          300: "#c7c7c7", // border
          400: "#333"
        },

        blue: "#64b5f6",
        "light-blue": "#deeffe",
        "border-blue": "#2196f3",
        "button-blue": "#b3e5fc",

        green: "#b7dab9",
        "light-green": "#e8f5e9",
        "border-green": "#4caf50",
        "button-green": "#c8e6c9",

        "button-red": "#ef9a9a"
      }
    }
  },
  variants: {},
  plugins: []
};
