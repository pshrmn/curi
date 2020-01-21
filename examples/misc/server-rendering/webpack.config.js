let webpack = require("webpack");
let path = require("path");

let config = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    publicPath: "/static/js/",
    path: path.resolve(__dirname, "public", "js")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  }
};

module.exports = config;
