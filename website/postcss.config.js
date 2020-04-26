let prod = process.env.NODE_ENV === "production";

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    prod &&
      require("cssnano")({
        preset: "default"
      }),
    prod &&
      require("@fullhuman/postcss-purgecss")({
        content: ["./src/components/**/*.js", "./scripts/html.js"],
        defaultExtractor: content => content.match(/[A-Za-z0-0-_:/]+/g) || []
      })
  ]
};
