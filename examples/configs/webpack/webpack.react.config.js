const webpack = require("webpack");
const path = require("path");

const config = {
  mode: "development",
  output: {
    filename: "js/bundle.js",
    publicPath: "/static/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: require("../babel/.babelrc.react.js")
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      }
    ]
  }
};

module.exports = config;
