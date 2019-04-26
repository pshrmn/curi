const webpack = require("webpack");
const path = require("path");

const config = {
  mode: "development",
  output: {
    filename: "js/bundle.js",
    publicPath: "/static/"
  },
  resolve: {
    extensions: [".mjs", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(mjs|js)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: require("../babel/.babelrc.svelte.js")
          }
        ]
      },
      {
        test: /\.svelte$/,
        use: [
          {
            loader: "svelte-loader"
          }
        ]
      }
    ]
  }
};

module.exports = config;
