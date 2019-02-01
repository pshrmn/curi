const webpack = require("webpack");
const path = require("path");

const config = {
  mode: "development",
  output: {
    filename: "js/bundle.js",
    publicPath: "/static/"
  },
  resolve: {
    extensions: [".js", ".html"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: require("../babel/.babelrc.svelte.js")
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "svelte-loader",
            options: {
              store: true
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;
