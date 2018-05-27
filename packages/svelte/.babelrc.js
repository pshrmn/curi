const building = process.env.BABEL_ENV === "build";

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: building ? false : "commonjs",
        targets: {
          browsers: ["> 0.25%"]
        }
      }
    ]
  ],
  plugins: ["@babel/plugin-proposal-object-rest-spread"]
};
